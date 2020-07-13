import React, { Component, Fragment } from 'react';
import Header from '../common/header.js';
import Footer from '../common/footer.js';


class Register extends Component {
  constructor(props) {
    super(props);

		// this.state = { isLogin: false, username: '', user_id: '',banners:[], videoData: [], success: { message: '' }, loader: 'block' };
	
    this.state =
    {
    }
  };


  
  render() {
    

    return (
      <div>
        <Header />
        {/*- Start Single Event Title -*/} 
        <div className="singleEvent eventFilterTitle">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="singleEventTitle">
                  <h3>Page Title</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End Single Event Title -*/} 
        {/*- Start Single Event Description -*/} 
        <div className="singleEventRow filterEventRow">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="filterEventTitle">
                  <h2>Get your ticket detail</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="tab filterTab" role="tabpanel">
                  {/* Nav tabs */}
                  <ul className="nav nav-tabs filterTabUl" role="tablist">
                    <li role="presentation" className><a href="#Section1" className="active" aria-controls="home" role="tab" data-toggle="tab">Upcoming Events</a></li>
                    <li role="presentation"><a href="#Section2" aria-controls="profile" role="tab" data-toggle="tab">Previous Events</a></li>
                  </ul>
                  {/* Tab panes */}
                  <div className="tab-content tabs filterTabData">
                    <div role="tabpanel" className="tab-pane in active" id="Section1">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-1.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-2.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-1.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-1.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-1.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*- Start Events Pagination -*/}
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="eventPagination">
                            <ul className="pagination">
                              <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                              </li>
                              <li className="page-item"><a className="page-link" href="#">1</a></li>
                              <li className="page-item active">
                                <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                              </li>
                              <li className="page-item"><a className="page-link" href="#">3</a></li>
                              <li className="page-item"><a className="page-link" href="#">4</a></li>
                              <li className="page-item"><a className="page-link" href="#">5</a></li>
                              <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/*- End Events Pagination -*/}
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="Section2">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-2.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-1.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-1.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="eventDisplaySec filterEventInner">
                            <div className="displayImage">
                              <img src="images/eventImg-1.jpg" alt="" />
                            </div>
                            <div className="DispalyEventDate">
                              <div className="DisplayEventTitle">
                                <h2 className="eventTitle"><a href="#">Happy Wedding</a></h2>
                              </div>
                              <div className="eventDetailFilter">
                                <ul>
                                  <li><label>Ticket ID:</label> <span>#123456</span></li>
                                  <li><label>Date:</label> <span>25-Jan-2020</span></li>
                                  <li><label>Venue:</label> <span>KLG Hotel</span></li>
                                  <li><label>City:</label> <span>Chandigarh</span></li>
                                  <li><label>Address:</label> <span>SCO 121-22-23-24, 43B, Sector 43, Chandigarh, 160034</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*- Start Events Pagination -*/}
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="eventPagination">
                            <ul className="pagination">
                              <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                              </li>
                              <li className="page-item"><a className="page-link" href="#">1</a></li>
                              <li className="page-item active">
                                <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                              </li>
                              <li className="page-item"><a className="page-link" href="#">3</a></li>
                              <li className="page-item"><a className="page-link" href="#">4</a></li>
                              <li className="page-item"><a className="page-link" href="#">5</a></li>
                              <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/*- End Events Pagination -*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End Single Event Description -*/}
        <Footer />
      </div>
    );
  }
}
export default (Register)


