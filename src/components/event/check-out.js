import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import Loader from 'react-loader-spinner';
import Header from '../common/header.js';
import Footer from '../common/footer.js';
import Modal from 'react-awesome-modal';
import { Link } from 'react-router-dom';
import PaypalExpressBtn from 'react-paypal-express-checkout';


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: '',
            ticket: '',
            payment_status: true,
            payment_success: false,
            loading:false,
            data: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                zipcode: '',
                address1: '',
                address2: '',
                loading: false,
                count: false,

            },
            error: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                zipcode: '',
                address1: '',
                address2: ''
            },
           user_id:'',
           event_id:'',
           booking_id: '',
           quantity:0,
           total:0,
           grand_total:0,
           ticket_type:'',
           ticket:'',
           ticket_counts:0, 


        }

        this.dismissError = this.dismissError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
    };

    componentDidMount() {

        this.setState({ user_id: localStorage.getItem('user_id') });
        this.setState({ event_id: localStorage.getItem('event_id') });
        console.log("========== quantity ======>>>>=======", localStorage.getItem('quantity'));
        this.setState({ quantity: 0 });
        this.setState({ total: localStorage.getItem('total') });
        this.setState({ grand_total: localStorage.getItem('total') });
        this.setState({ ticket_type: "Paid" });
        this.setState({ ticket: JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('tickets')))) });
        var tickets_quantity = JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('tickets'))));
        var count = 0
        for (let i = 0; i < tickets_quantity.length; i++) {
            count = count + parseInt(tickets_quantity[i].count);
        }
        console.log("====--------------- print tickets count of th tickets-------======================", count);
        this.setState({ ticket_counts: count });
    }
    onChange(el) {
        let inputName = el.target.name;
        let inputValue = el.target.value;
        let statusCopy = Object.assign({}, this.state);
        statusCopy.data[inputName] = inputValue;
        this.setState(statusCopy);
        this.setState({ error: {}, message: '', errorMessage: '' });
        //console.log(this.state.error.inputName);
    }
    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        console.log("===== print handle submit clicked ======");
        if (!this.state.data.first_name) {
            this.setState({ error: { first_name: 'First name field is required!' } });
        }
        else if (!this.state.data.last_name) {
            this.setState({ error: { last_name: 'Last name field is required!' } });
        }
        else if (!this.state.data.email) {
            this.setState({ error: { email: 'Email field is required!' } });
        }
        else if (!this.state.data.phone) {
            this.setState({ error: { phone: 'Phone field is required!' } });
        }
        else if (!this.state.data.zipcode) {
            this.setState({ error: { zipcode: ' Zipcode is required!' } })
        }
        else if (!this.state.data.address1) {
            this.setState({ error: { address1: 'Address1 is required!' } })
        }
        else if (!this.state.data.address2) {
            this.setState({ error: { address2: 'Address2 is required!' } })
        } else {
            var data = {
                first_name: this.state.data.first_name,
                last_name: this.state.data.last_name,
                email: this.state.data.email,
                phone: this.state.data.phone,
                zipcode: this.state.data.zipcode,
                address1: this.state.data.address1,
                address2: this.state.data.address2
            }
            axios.post(apiUrl() + "user-signup", data).then((res) => {
                if (res.data.status == 200) {
                    localStorage.setItem('user_id', res.data.data[0].id);
                    localStorage.setItem('email', res.data.data[0].email);
                    localStorage.getItem('total');
                    this.openModal()
                }
            })
        }

    }

    handlePayment() {
        this.setState({ loading: true });
        this.setState({ quantity_count: 0 })
        for (let i = 0; i < this.state.ticket_counts.length; i++) {
            this.state.quantity_count = this.state.quantity_count + parseInt(this.state.ticket_counts[i])
        }
        console.log("=========== total of quantity =========>>>============", this.state.quantity_count);
        if (this.state.grand_total > 0) {
            var data = {
                user_id: localStorage.getItem('user_id'),
                event_id: localStorage.getItem('event_id'),
                event_name: localStorage.getItem('event_name'),
                tickets: localStorage.getItem('tickets'),
                quantity: this.state.ticket_counts,
                total: localStorage.getItem('total')
            }
            console.log("===== print  ticket  ===========>>>>", data.tickets);
            this.closeModal();
            axios.post(apiUrl() + "user-ticket", data).then((res) => {
                console.log("==========>>>>>>=========>>>>==========>>>>>==== inside data ticket =======", res);
                // this.setState({ loading: true });
                if (res.data.status == 200) {
                
                     this.props.history.push(`/ticket-page/ba5ef51294fea5cb4eadea5306f3ca3b/ ${this.state.booking_id}/${this.state.event_id}`);
                    this.setState({ booking_id: res.data.data.booking_id })
                    this.setState({ payment_status: false });
                    this.setState({loading: true});
                    this.openModal();
                    console.log("==== check response from bacend after insert data in datbase", res, res.data);
                }
            })
        }
    }

    onSuccess = (payment) => {
        console.log("===== data of the paypal payment =====>>>>==", payment);
        if (payment.paid == true && payment.cancelled == false) {
            this.handlePayment();
        }
    }

    onCancel = (data) => {
        console.log('The payment was cancelled!', data);
        this.setState({ errorpaypal: 'Payment cancelled!' });
        this.props.history.push("/payment-error");
    }

    onError = (err) => {
        console.log("Error!", err);
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }


    render() {

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = this.state.grand_total;
        const client = {
            sandbox: 'AVVkdLJiyQZ8aD2f24IMUSxeW73KadQIWQyE1WEFKDgUXgJB1D0Ovvi1NoLU6HgMw5FKvqajQra-Jy9x',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        const style = {
            size: 'large',
            color: 'gold',
            shape: 'pill',
            label: 'checkout'
        }

        return (
            <div>
                <Loader
                    type="Rings"
                    color="#e6302d"
                    height={100}
                    width={100}
                    className="loader"
                    visible={this.state.loading} 
                    />
                <Header />
                {/*- Start Single Event Title -*/}
                <div className="singleEvent eventFilterTitle checkOutBg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="singleEventTitle">
                                    <h3>Checkout</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkOutSec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="leftCheckOut checkOutForm">
                                    <h2>Customer Information</h2>
                                    <form >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div class="form-group styled-input">
                                                    <input type="text" name="first_name" className="textFiled" onChange={this.onChange.bind(this)} />
                                                    <label>First Name</label>
                                                    <span className="boxBorder"></span>
                                                    <span className="error_span">{this.state.error.first_name}</span>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div class="form-group styled-input">
                                                    <input type="text" name="last_name" className="textFiled" onChange={this.onChange.bind(this)} />
                                                    <label>Last Name</label>
                                                    <span className="boxBorder"></span>
                                                    <span className="error_span">{this.state.error.last_name}</span>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div class="form-group styled-input">
                                                    <input type="email" name="email" className="textFiled" onChange={this.onChange.bind(this)} />
                                                    <label>Email Addrerss</label>
                                                    <span className="boxBorder"></span>
                                                    <span className="error_span">{this.state.error.email}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group styled-input">
                                                    <input type="number" name="phone" id="phone" className="textFiled" onChange={this.onChange.bind(this)} />
                                                    <label>Work Phone</label>
                                                    <span className="boxBorder"></span>
                                                    <span className="error_span">{this.state.error.phone}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div class="form-group styled-input">
                                                    <input type="text" id="zipcode" className="textFiled" name="zipcode" onChange={this.onChange.bind(this)} />
                                                    <label>Zipcode</label>
                                                    <span className="boxBorder"></span>
                                                    <span className="error_span">{this.state.error.zipcode}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div class="form-group styled-input">
                                                    <input type="text" className="textFiled" id="address1" name="address1" onChange={this.onChange.bind(this)} />
                                                    <label>Address-I</label>
                                                    <span className="boxBorder"></span>
                                                    <span className="error_span">{this.state.error.address1}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div class="form-group styled-input">
                                                    <input type="text" className="textFiled" id="address2" onChange={this.onChange.bind(this)} name="address2" />
                                                    <label>Address-II</label>
                                                    <span className="boxBorder"></span>
                                                    <span className="error_span">{this.state.error.address2}</span>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="checkOutSubmitBtn">
                                                    <button onClick={this.handleSubmit} type="button" data-toggle="modal" class="btn btn-primary">Pay Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="rightCheckOut">
                                    <div className="partyImg">
                                        <img src="/images/partyImg.jpeg" alt="" />
                                    </div>
                                    <div className="orderSum">
                                        <h3>Order Summary</h3>
                                        <ul>
                                            {/* <li><span className="checkText">3x  Sign-up Now for <br /> Free Entery Aus & NZ</span> <span className="checkPrice">$0.00</span></li> */}
                                            <li><span className="checkText">Delivery <br /> 3x eTicket</span> <span className="checkPrice">
                                                {(this.state.total !== 0)? '$'+this.state.total : '$0.00'}</span></li>
                                            <li className="finalPrize"><span className="textBr">Total</span> <span className="checkPrice">
                                            {(this.state.grand_total !== 0)? '$'+this.state.grand_total : '$0.00'}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal visible={this.state.visible} width="490" modalOptions={{ dismissible: false }} effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        { 
                            this.state.payment_status ?
                                <div className="paymentMethod">
                                    <h2>Select your payment</h2>
                                    <ul>
                                        <li className="paypalPayment"><PaypalExpressBtn disabled env={env} client={client} currency={currency} style={style} total={total} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} /></li>
                                        <li className="azulPayment"><a href="#"><img src="/images/azulLogo.png" alt="Azul" /></a></li>
                                    </ul>
                                    <span className="closeBtn"><a href="javascript:void(0);" onClick={() => this.closeModal()}>+</a></span>
                                </div> :

                                <div className="thankuContent">
                                    <h2>Thank You</h2>
                                    <div className="checkImg">
                                        <img src="/images/checkImg.png" alt="Thank you" />
                                    </div>
                                    <div className="thankyouContent">
                                        <p>Ticket has been sent to your email address, please check your email ID.</p>
                                        <p>Login password is also sent to your email address</p>
                                        <Link type="button" to={`/ticket-page/ba5ef51294fea5cb4eadea5306f3ca3b/${this.state.event_id}/${this.state.booking_id}`} class="btn btn-primary viewAllEvent">Ok</Link>
                                        {/* <a href="#">Ok</a> */}
                                    </div>
                                </div>

                        }

                    </Modal>

                    {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#thankyou">Thank You Popup</button> */}
                    {/* Start Thank you popup  */}
                    {/* <div className="modal fade" id="thankyou" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content thankuPopInner">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body thankuContent">
                                    <h2>Thank You</h2>
                                    <div className="checkImg">
                                        <img src="/images/checkImg.png" alt="Thank you" />
                                    </div>
                                    <div className="thankyouContent">
                                        <p>Ticket has been sent to your email address, please check your email ID.</p>
                                        <p>Login password is also sent to your email address</p>
                                        <a href="#">Ok</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* End Thank you popup  */}

                </div>
                <Footer />
            </div>
        );
    }
}
export default (Register)


