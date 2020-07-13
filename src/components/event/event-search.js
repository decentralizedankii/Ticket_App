import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import Header from '../common/header.js';
import Footer from '../common/footer.js';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      upcomings: [],
      total: '',
      activePage: 0,
      showPagination: true
    }
    this.getEvents(1);
    this.handlePageChange = this.handlePageChange.bind(this);
  };


  componentWillMount() {


    this.getEvents(1);
  }

  getEvents(pageNumber) {
    var data = {
      page: pageNumber
    }
    axios.post(apiUrl() + "event-list", data).then((res) => {
      this.setState({ activePage: 1 });
      this.setState({ total: res.data.total_event[0].total_event });
      if(this.state.total == 0){
       this.setState({showPagination: false});
      }
      this.setState({ events: res.data.events, upcomings: res.data.upcoming, limit: res.data.limit });
    }).catch(err => {
      console.log(err);
    });

  }

  getEvent(event_slug) {
    this.props.history.push(`/single-event/${event_slug}`);
  }

  handlePageChange(pageNumber) {
    this.getEvents(pageNumber.selected + 1);
  }


  render() {
    return (
      <div>
        <Header />
        {/*- Start Slider -*/}
        <div className="siteSlider">
          <div id="demo" className="carousel slide" data-ride="carousel">
            {/* Indicators */}
            <ul className="carousel-indicators">
              {this.state.upcomings.map((upcoming, index) => (
                <li data-target="#demo" data-slide-to={index} className={(index == 0) ? "active" : ""} />
              ))}
            </ul>
            {/* The slideshow */}
            <div className="carousel-inner sliderContent" >
              {this.state.upcomings.map((upcoming, index) => (
                <div className={(index == 0) ? "carousel-item active" : "carousel-item"}>
                  <img src={baseUrl() + 'uploads/' + upcoming.banner_image} alt="" />
                  <div className="sliderTextContent">
                    <div className="container">
                      <h3>{upcoming.event_name}</h3>
                      <p>Próximos Eventos</p>
                    </div>
                  </div>

                </div>
              ))}

            </div>
            {/* Left and right controls */}
          </div>
        </div>
        {/*- End Slider -*/}
        {/*- Event Search Option -*/}
        <div className="searchFormContent">
          <div className="container">
            <div className="bannerSearchBar">
              <div className="row">
                <div className="col-md-12">
                  <div className="eventSearchBar">
                    <form className="searchForm">
                      <div className="siteEventForm eventName">
                        <div className="form-group">
                          <input type="text" className="filterTextBox form-control" placeholder="Blank Space" id />
                        </div>
                      </div>
                      <div className="siteEventForm eventState">
                        <select className="selectpicker filterBtn">
                          <option>Fecha</option>
                          <option>Cualquier fecha</option>
                          <option>Hoy</option>
                          <option>Manana</option>
                          <option>Este fin de semana</option>
                          <option>Esta semana</option>
                          <option>La próxima semana</option>
                          <option>Este mes</option>
                          <option>El proximo mes</option>
                          <option>Selecciona una fecha</option>
                        </select>
                      </div>
                      <div className="siteEventForm eventCity">
                        <select className="selectpicker filterBtn">
                          <option>Dónde</option>
                          <option>Utilizar mi ubicación actual</option>
                          <option>Punta Cana</option>
                          <option>La Romana</option>
                          <option>Santiago</option>
                          <option>Puerto Plata</option>
                          <option>Samaná</option>
                        </select>
                      </div>
                      <div className="siteEventForm eventVenue">
                        <select className="selectpicker filterBtn">
                          <option>Categoría</option>
                          <option>Concierto</option>
                          <option>Conferencia</option>
                          <option>Festival</option>
                          <option>Deportes</option>
                          <option>Comida y Bebida</option>
                          <option>Familia</option>
                          <option>Artes y Teatro</option>
                          <option>Negocios</option>
                        </select>
                      </div>
                      <div className="siteEventForm eventSubmitBtn">
                        <button type="button" className="btn btn-primary hmSearchBtn">Search</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End Event Search Option -*/}
        {/*- Start display Events -*/}
        <div className="displayEvents eventPageRow">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="siteTitle">
                  <h2 className="titleText">Event Page</h2>
              
                </div>
              </div>
            </div>
            { this.state.showPagination 
                    ?  
            <div className="row">
              {this.state.events.map((event, index) => (
                <div className="col-lg-4 col-md-4">
                  <div className="eventDisplaySec">
                    <div className="displayImage">
                      <a href="JavaScript:Void(0);" onClick={this.getEvent.bind(this, event.event_slug)}>
                        <img src={baseUrl() + 'uploads/' + event.event_image} alt="" />
                      </a>
                    </div>
                    <div className="DispalyEventDate">
                      <div className="innerDate">
                        <a href="JavaScript:Void(0);" onClick={this.getEvent.bind(this, event.event_slug)}>
                          <h3 className="eventDate">{('"' + moment(event.start_date).toDate().toDateString() + '"').split(" ")[1]}<span>
                            {moment(event.start_date).format("DD-YYYY")}
                          </span></h3>
                        </a>
                      </div>
                      <div className="DisplayEventTitle">
                        <h2 className="eventTitle"><a href="JavaScript:Void(0);" onClick={this.getEvent.bind(this, event.event_slug)}>{event.event_title.charAt(0).toUpperCase() + event.event_title.slice(1)}</a></h2>
                        <p>Location {event.city}</p>
                      </div>
                      <div className="EventComprar">
                        <span className="eventComprarInner">
                          {/* <a href="JavaScript:Void(0);" onClick={this.getEvent.bind(this,event.event_slug)}>Comprar</a> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                : <div>No event found</div>
              }
            {/*- Start Events Pagination -*/}
            <div className="row">
              <div className="col-lg-12">
                <div className="eventPagination">
                { this.state.showPagination 
                    ?          <ReactPaginate
                    initialPage={this.state.activePage}
                    pageCount={Math.ceil(this.state.total / this.state.limit)}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                    marginPagesDisplayed={5}
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    // pageRangeDisplayed={3}
                    onPageChange={this.handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                    : null
                }
         
                </div>
              </div>
            </div>
            {/*- End Events Pagination -*/}
          </div>
        </div>
        {/*- End display Events -*/}

        <Footer />
      </div>
    );
  }
}
export default (Register)


