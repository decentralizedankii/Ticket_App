import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import Loader from 'react-loader-spinner';
import Header from '../common/header.js';
import Footer from '../common/footer.js';
import Modal from 'react-awesome-modal';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Register extends Component {
  constructor(props) {
    super(props);

    // this.state = { isLogin: false, username: '', user_id: '',banners:[], videoData: [], success: { message: '' }, loader: 'block' };
    this.state = {
      tickets: [],
      total: '',
      loading: true,
      visible: false,
      event_id: '',
      service_tax: 0,
      sub_total: 0,
      grand_total: 0,
      coupon_code: '',
      ticket_counts: [],
      banner_image: '',
      ticket_count: 0,
      quantity_count: 0,
      booking_id: '',
      error: '',
      count: false,
      dataPayment: {
        first_name: '',
        last_name: '',
        seed_donation: '',
        name: '',
        email: '',
        amount: '',
        name_on_card: '',
        card: '',
        month: '',
        year: '',
        cvc: '',
        postal_code: '',
        address: '',
        state: '',
        city: '',
      },
      activeButton: 'usaepay',
      errorDonation: {},
      default_event1: {},
      user_data1: {},
      payment_step: '',
      payment_type: '',
      errorpaypal: '',
      ticket_type: ''
    }

    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.handleUpdatePurchase = this.handleUpdatePurchase.bind(this);
    this.handleChangeCoupon = this.handleChangeCoupon.bind(this);
    this.handleUpdateApplyCoupon = this.handleUpdateApplyCoupon.bind(this);
    this.finalPayment = this.finalPayment.bind(this);
  };

  onChangeQuantity(e) {
    console.log("==== print ticket =======>>>>======= on change quantity ====", this.state.tickets);
    this.setState({ ticket_count: e.target.value });

    this.state.tickets[e.target.getAttribute('data-key')].total = e.target.value * this.state.tickets[e.target.getAttribute('data-key')].price;
    console.log("===== print total of the ticket ================",this.state.tickets[e.target.getAttribute('data-key')].total)
    localStorage.setItem('ticket_counts', this.ticket_counts);
    this.state.tickets[e.target.getAttribute('data-key')].count = e.target.value;
    this.setState({ tickets: this.state.tickets })
    localStorage.setItem('tickets',this.state.tickets);
    console.log("====== print tickets on change =======>>>>", this.state.tickets);
    this.setState({ count: true });
    this.setState({ sub_total: 0 });
    this.setState({ grand_total: 0 });
  }

  handleUpdatePurchase() {
    this.setState({ tickets: this.state.tickets ,loading:true})
    this.setState({ count: false });
    if (this.state.count) {
      for (let i = 0; i < this.state.tickets.length; i++) {
        console.log("==== print price=======>>", this.state.tickets[i].click)
        this.state.sub_total = this.state.sub_total + this.state.tickets[i].total;
        // this.state.grand_total = this.state.grand_total + (this.state.tickets[i].price * this.state.tickets[i].count);
        this.state.grand_total = this.state.grand_total + this.state.tickets[i].total;
      }
      this.setState({ error: '' });
    }

    var data = {
      ticket: this.state.tickets,
      // event_id: localStorage.getItem('event_id')
      event_id: this.props.match.params.event
    }

    console.log("===== final ticket ======>>>>======",data.ticket);

    axios.post(apiUrl() + "ticket-total-service-tax", data).then((res) => {
      if(res.data.status == 200){
        this.setState({sub_total: res.data.data[0].net_total});
        this.setState({grand_total: res.data.data[0].net_total});
        this.setState({service_tax: res.data.data[0].service_tax});
        localStorage.setItem('service_tax',res.data.data[0].service_tax);
      }
      console.log("========= get after solving service tax ========>>>", res);
      this.setState({loading: false });
    })
  }

  handleChangeCoupon(e) {
    if (e.target.value) {
      this.setState({ coupon_code: e.target.value });
    }
  }

  handleUpdateApplyCoupon() {

    if ( this.state.grand_total == 0 && !this.state.count) {
      this.setState({ error: 'First add ticket and  click Actualizar compra.' })
    }
    if (this.state.grand_total > 0) {
      this.setState({ error: '' });
      if (!this.state.coupon_code) {
        this.setState({ error: 'Please enter coupon code.' });
      } else {
        var data = {
          event_id: this.state.event_id,
          user_id: localStorage.getItem('user_id'),
          coupon_code: this.state.coupon_code,
          total: this.state.sub_total
        }
        axios.post(apiUrl() + "apply-coupon", data).then((res) => {
          console.log("==== get data from  backend after ====>>>==", res);
          if (res.data.status == 200) {
            console.log("=== =reponse=------ from apply coupon ===>>>", res);
            this.setState({ sub_total: res.data.data });
            this.setState({ grand_total: res.data.data });
          }
          if (res.data.status == 500) {
            this.setState({ error: 'Something went wrong' });
          }
          if (res.data.status == 401) {
            this.setState({ error: 'Coupon is expired' });
          }
          if (res.data.status == 402) {
            // for coupon limit finished 
            this.setState({ error: 'Coupon limit finished' })
          }
          if (res.data.status == 404) {
            this.setState({ error: 'Coupon is not valid for this event' })
          }
          if (res.data.status == 403) {
            this.setState({ error: 'Coupon is already redeem' });
          }
        }).catch(err => {
          console.log(err);
        });
      }

    }
  }

  finalPayment() {
    // this.props.history.push(`/ticket-page/ba5ef51294fea5cb4eadea5306f3ca3b/${this.state.event_id}/4ZEAGIM9`); 
    console.log("==== final payment client clicked ====")
    if (this.state.ticket_type && this.state.grand_total > 0) {
      console.log("===== 11111111111111111====11111111111111", this.state.tickets);
      localStorage.setItem('event_id', this.state.event_id);
      localStorage.setItem('tickets',JSON.stringify(this.state.tickets));
      localStorage.setItem('tickets_counts',this.state.ticket_counts);
      localStorage.setItem('ticket', this.state.tickets);
      localStorage.setItem('quantity', this.state.quantity_count);
      console.log("===== print total quantity =============>>>>>>", localStorage.getItem('quantity'))
      localStorage.setItem('total', this.state.grand_total);
      localStorage.setItem('ticket_type', this.ticket_type);
      this.props.history.push(`/check-out`);
    }
  }

  componentDidMount() {

    var data = {
      event_id: this.props.match.params.event
    }
    axios.post(apiUrl() + "avail-ticket2", data).then((res) => {
      
      if (res.data.status == 200) {
        this.setState({ tickets: JSON.parse(res.data.data[0].tickets)})
        //console.log("=========print print print ============", res.data.data[0].tickets);
        this.setState({ event_id: data.event_id });
        this.setState({ banner_image: res.data.data[0].banner_image });
        if (res.data.data[0].tickets.length  > 0) {
          this.setState({ ticket_type: true });
        }
        else{
          this.setState({ ticket_type: false });
        }
        this.setState({ loading: false });
      }
      if (res.data.status == 401) {
        this.props.history.push('/login');
        this.setState({ loading: false });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ loading: false });
    })

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

        <div className="singleEvent" style={{ backgroundImage: "url(" + baseUrl() + 'uploads/' + this.state.banner_image + ")" }}  >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="singleEventTitle">
                  <h3>Cart</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End Single Event Title -*/}
        {/*- Start Single Event Description -*/}
        {
          this.state.ticket_type ?
            <div className="singleEventRow cartPageRow">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="cartItems">
                      <div className="eventCart">
                        {
                          this.state.tickets.length > 0 ?
                            <table className="table">
                              <thead>
                                <tr>
                                  {/* <th scope="col">Eliminar</th> */}
                                  {/* <th scope="col">Nombre del Evento</th> */}
                                  <th scope="col">Package</th>
                                  <th scope="col">Type</th>
                                  <th scope="col">Precio</th>
                                  <th scope="col">Cantidad</th>
                                  <th scope="col">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                              {this.state.tickets.map((ticket,index) => (
                                  <tr key={index}>
                                    <td>{ticket.package}</td>
                                    <td>{ticket.type}</td>
                                    <td data-th="Price">${ticket.type == 'Free'? ticket.price : ticket.price}</td>
                                    <td data-th="Quantity"><input type="number" min="0" key={index} data-key={index} onChange={this.onChangeQuantity} value={this.state.value} className="form-control text-center" defaultValue={0} /></td>
                                    <td data-th="Total">${ticket.total}</td>
                                  </tr>
                                ))}

                              </tbody>
                            </table> : <div>
                              No Ticket is available
                    </div>
                        }
                        <div className="cartFooter">
                          <div className="cartNextBtn">
                            <a onClick={this.handleUpdatePurchase.bind(this)} className="btn btn-success">Actualizar compra</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="rightDiscount">
                        <div>
                        <h3 className="DiscountTitle">Código de descuento</h3>
                        <h6 style={{ color: 'red' }}>{this.state.error}</h6>
                        <div className="form-group discountField">
                          <input type="text" className="form-control" id="usr" onChange={this.handleChangeCoupon} value={this.state.value} placeholder="Coupon Code" />
                          <a onClick={this.handleUpdateApplyCoupon.bind(this)}  className="btn discountBtn">Aplicar</a>
                        </div>
                        </div>
                      <div className="cartTotleAmt">
                        <h3>Total Compra</h3>
                        <div className="cartSubTotal">
                        <div className="cartTotalAmt">
                            <label>Service Tax: </label>
                            <span>{this.state.service_tax} %</span>
                          </div>
                          <div className="cartTotalAmt">
                            <label>Subtotal: </label>
                            <span>${this.state.sub_total}</span>
                          </div>
                          <div className="cartTotalAmt">
                            <label>Total: </label>
                            <span>${this.state.grand_total}</span>
                          </div>
                          <div className="cartSubTotalBtn">

                            <a className="btn btn-success" onClick={this.finalPayment} >Finalizar Pedido</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> :
            <div className="singleEventRow cartPageRow">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="cartItems">
                      <div className="eventCart">
                        {
                          this.state.tickets.length > 0 ?
                            <div>
                              <h6 style={{ color: 'red' }}>{this.state.error}</h6>
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Tickets</th>
                                    <th scope="col">Cantidad</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.tickets.map((ticket, index) => (
                                    <tr key={index}>
                                      <td>{ticket.name}</td>
                                      <td data-th="Quantity"><input type="number" min="0" key={index} data-key={index} onChange={this.onChangeQuantity} value={this.state.value} className="form-control text-center" defaultValue={0} /></td>
                                    </tr>
                                  ))}
                                 
                                </tbody>
                              </table>
                              <div className="cartSubTotalBtn">
                                    <a className="btn btn-success" onClick={this.finalPayment} >Finalizar Pedido</a>
                                  </div>
                            </div> :
                            <div>
                              No Ticket is available
                        </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
        {/*- End Single Event Description -*/}
        <Footer />
      </div>
    );
  }
}
export default (Register)


