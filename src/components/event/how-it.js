import React, { Component, Fragment } from 'react';

import Header from '../common/header.js';
import Footer from '../common/footer.js';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  };


  componentWillMount() {

  }

  componentDidMount(){
    const script = document.createElement("script");
     script.src = "/js/newsjs.js";
     script.async = true;
     document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <Header />
        

        <div className="howITWorkNew">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="howItWBlock">
                  <div className="howitWImg">
                    <img src="/images/howitWImg.jpg" alt="Image" />
                    <div className="workDateEvent">
                      <h3>JAN 3, 2020 / Showing</h3>
                    </div>
                    <div className="eventPriceHow">
                      <span>$10-$20</span>
                    </div>
                  </div>
                  <div className="howItWContent">
                    <div className="howItLoc">
                      <h4><img src="/images/locIcon.jpg" alt="locIcon" />225 Liberty Street...</h4>
                    </div>
                    <div className="howItDetail">
                      <h2>Course about Virual video</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <div className="getTicketBtn">
                        <a href="#">Get Ticket</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="howItWBlock">
                  <div className="howitWImg">
                    <img src="/images/howitWImg.jpg" alt="Image" />
                    <div className="workDateEvent">
                      <h3>JAN 3, 2020 / Showing</h3>
                    </div>
                    <div className="eventPriceHow">
                      <span>$10-$20</span>
                    </div>
                  </div>
                  <div className="howItWContent">
                    <div className="howItLoc">
                      <h4><img src="/images/locIcon.jpg" alt="locIcon" />225 Liberty Street...</h4>
                    </div>
                    <div className="howItDetail">
                      <h2>Course about Virual video</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <div className="getTicketBtn">
                        <a href="#">Get Ticket</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="howItWBlock">
                  <div className="howitWImg">
                    <img src="/images/howitWImg.jpg" alt="Image" />
                    <div className="workDateEvent">
                      <h3>JAN 3, 2020 / Showing</h3>
                    </div>
                    <div className="eventPriceHow">
                      <span>$10-$20</span>
                    </div>
                  </div>
                  <div className="howItWContent">
                    <div className="howItLoc">
                      <h4><img src="/images/locIcon.jpg" alt="locIcon" />225 Liberty Street...</h4>
                    </div>
                    <div className="howItDetail">
                      <h2>Course about Virual video</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <div className="getTicketBtn">
                        <a href="#">Get Ticket</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="howItWBlock">
                  <div className="howitWImg">
                    <img src="/images/howitWImg.jpg" alt="Image" />
                    <div className="workDateEvent">
                      <h3>JAN 3, 2020 / Showing</h3>
                    </div>
                    <div className="eventPriceHow">
                      <span>$10-$20</span>
                    </div>
                  </div>
                  <div className="howItWContent">
                    <div className="howItLoc">
                      <h4><img src="/images/locIcon.jpg" alt="locIcon" />225 Liberty Street...</h4>
                    </div>
                    <div className="howItDetail">
                      <h2>Course about Virual video</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <div className="getTicketBtn">
                        <a href="#">Get Ticket</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="howItWBlock">
                  <div className="howitWImg">
                    <img src="/images/howitWImg.jpg" alt="Image" />
                    <div className="workDateEvent">
                      <h3>JAN 3, 2020 / Showing</h3>
                    </div>
                    <div className="eventPriceHow">
                      <span>$10-$20</span>
                    </div>
                  </div>
                  <div className="howItWContent">
                    <div className="howItLoc">
                      <h4><img src="/images/locIcon.jpg" alt="locIcon" />225 Liberty Street...</h4>
                    </div>
                    <div className="howItDetail">
                      <h2>Course about Virual video</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <div className="getTicketBtn">
                        <a href="#">Get Ticket</a>
                      </div>
                    </div>
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
export default (Register)


