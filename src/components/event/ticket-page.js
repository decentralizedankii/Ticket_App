import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import Header from '../common/header.js';
import Footer from '../common/footer.js';

class Ticketing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticket: [],
            type:'',
            event: '',
            tickets: [],
            total: '',
            ticket_count: '',
            service_tax: ''
        }
        this.ticketPdf = this.ticketPdf.bind(this);
    }


      ticketPdf = () => {
        fetch( apiUrl()+`${this.state.event_name}/${this.state.booking_id}.pdf`)
          .then(response => {
            response.blob().then(blob => {
              let url = window.URL.createObjectURL(blob);
              let a = document.createElement('a');
              a.href = url;
              a.download = 'employees.json';
              a.click();
            });
            //window.location.href = response.url;
        });
      }
    

    componentDidMount() {
     this.state.ticket_count = 0;
      console.log("aman");
      var tickets_quantity = JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('tickets'))));
      this.setState({tickets: tickets_quantity});
      for(let i=0; i< tickets_quantity.length; i++){

        this.state.ticket_count = this.state.ticket_count + parseInt(tickets_quantity[i].count);
      }
    
      
      console.log("==== tikcet count =========",this.state.ticket_count, this.state.ticket_count);
      var total = localStorage.getItem('total');
      this.setState({total: total});
      this.setState({service_tax: localStorage.getItem('service_tax')});
      this.setState({tickets_quantity: localStorage.getItem('quantity')});
      console.log("=============== lglogoglgog=",total);
       
        var data = {
            event_id: this.props.match.params.event,
            booking_id: this.props.match.params.booking_id,
            type: "booking_id"
          } 
          this.setState({event_id:this.props.match.params.event})
          this.setState({booking_id: this.props.match.params.booking_id})
          
        axios.post(apiUrl() + "get-ticket", data).then((res) => {
          if(res.data.status == 200){
            console.log("===== >>>> <<<<<<<===== ////==== >>>>>>====----------",res);
            this.setState({event: res.data.data})
            console.log("==== pint event data data data ======", this.state.event)
          }
            
        })

    }
    
  render() {
    console.log("====== ticket page event =========>>>>============")
    return (
      <div>

        <Header />
         <div className="siteTicketPage">
           <div className="container">
             <div className="row">
               <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                 <div className="eventTicketGen">
                   <div className="eventTicketHead">
                     <div className="emailLogo">
                       <img src="/images/emailLogo.png" alt="Email Logo" />
                     </div>
                     <div className="headID">
    <p>ID - {this.state.event.booking_id}</p>
                     </div>
                   </div>
                   <div className="emailEventImg">
                     <img src="/images/email-eventImg.jpg" alt="Event Image" />
                   </div>
                   <div className="emaileventTitle">
    <h2>{this.state.event.event_name}</h2>
                   </div>
                   <div className="emailEventSchedule eventDateTime">
                     <ul>
                        <li>
                          <div class="eventSchedule">
                              <span>Date</span>
    <h3>{this.state.event.start_date}</h3>
                          </div>
                        </li>
                        <li>
                          <div class="eventSchedule">
                              <span>Time</span>
                              <h3>{this.state.event.start_time} - {this.state.event.end_time}</h3>
                          </div>
                       </li>
                     </ul>
                   </div>
                   <div className="emailEventSchedule eventVanue">
                     <ul>
                        <li>
                          <div class="eventSchedule">
                              <span>Vanue</span>
                              <h3>Hotel Orbit 34</h3>
                          </div>
                        </li>
                     </ul>
                   </div>
                   <div className="emailEventSchedule eventAddress">
                     <ul>
                        <li>
                          <div class="eventSchedule">
                              <span>Address</span>
    <h3>{this.state.event.address} {this.state.event.city} {this.state.event.state}</h3>
                          </div>
                        </li>
                     </ul>
                   </div>
                   <div className="emailEventSchedule eventBookingID">
                     <ul>
                        <li>
                          <div class="eventSchedule">
                              <span>Booking ID</span>
    <a>{this.state.event.booking_id}</a>
                          </div>
                        </li>
                     </ul>
                   </div>
                   <div className="emailEventSchedule eventScanCode">
                     <img src="/images/qrCode.png" alt="Scan Code" />
                   </div>
                   <div className="emailEventSchedule eventTicketQuantity">
                   <table className="tablePackage">
                   
                      <thead>
                          <tr>
                              <th>Package</th>
                              <th>Type</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                          </tr>
                      </thead>
                      <tbody>

            {this.state.tickets.map((ticket, index) => (
                <tr>
                <td>{ticket.package}</td>
            <td>{ticket.type}</td>
            <td>${ticket.price}</td>
            <td>{ticket.count}</td>
            <td>{ticket.total}</td>
            </tr>
              ))}
                          
                      </tbody>
                      <tfoot>
                      <tr>
                          <td>Service Tax</td>
                          <td></td>
                          <td></td>
                          <td></td>
            <td>{this.state.service_tax}</td>
                      </tr>
                      <tr>
                          <td>Total Quantity</td>
                          <td></td>
                          <td></td>
                          <td></td>
            <td>{this.state.ticket_count}</td>
                      </tr>
                      <tr>
                          <td>Total Price</td>
                          <td></td>
                          <td></td>
                          <td></td>
            <td>${this.state.total}</td>
                      </tr>
                      </tfoot>
                    </table>
                    <button onClick={this.ticketPdf.bind(this)} >Download Ticket</button>
         
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
        <Footer />
      </div>
    );
  }
}
export default (Ticketing)


