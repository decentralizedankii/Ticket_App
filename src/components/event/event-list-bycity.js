import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import { geolocated } from "react-geolocated";
import parser from 'html-react-parser';
import Geocode from "react-geocode";
import ReactSearchBox from 'react-search-box';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from 'react-loader-spinner';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress,getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/assets/index.css';
import ReactPaginate from 'react-paginate';
import Header from '../common/header.js';
import Footer from '../common/footer.js';

class EventListByCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_name: '',
      event_name: '',
      category: '',
      type: '',
      show_select: true,
      show_datepicker: false,
      startDate: new Date(),
      endDate: new Date(),
      loading: false,
      events: [],
      upcomings: [],
      total: '',
      activePage: 0,
      showPagination: false,
      cityToShow:'',
      lat:0,
      lng:0,
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  };

  componentWillMount() {
    
    var city = this.props.match.params.city;
    var lat =0;
    var lng =0;
    var cityToShow = '';
    if(city === 'santo-domingo')
    {
       lat = 18.48605749999999;
       lng = -69.93121169999999	;
       cityToShow = 'Santo Domingo';
    }else if(city === 'punta-cana'){
        lat = 18.5600761;
        lng = -68.372535;
        cityToShow = 'Punta Cana';
    }else if(city === 'altos-de-chavon'){
        lat = 18.4217306;
        lng = -68.89002789999999;
        cityToShow = 'Altos De Chavon';
    }else if(city === 'santiago'){
        lat = 	-33.4488897;
        lng = -70.6692655;
        cityToShow = 'Santiago';
    }


    this.setState({lat:lat,lng:lng,cityToShow:cityToShow},function() {
     
        var data = {
            page: 1,
            lat:lat,
            lng:lng,
          }
         
          this.getEvents(data);


     }); 
    
  }


  getEvents(data) {
    this.setState({ loading: true });
    
    axios.post(apiUrl() + "event-list-bycity", data).then((res) => {
  
        this.setState({ total: res.data.total_event });

        if (res.data.total_event < 9) {
          this.setState({ showPagination: false });
        } else {
          this.setState({ showPagination: true });
        }
        this.setState({ events: res.data.events, limit: res.data.limit , upcomings: res.data.upcoming , loading: false });
        
    }).catch(err => {
      console.log(err);
      this.setState({ loading: false });
    });

  }

  getEvent(event_slug) {
    this.props.history.push(`/single-event/${event_slug}`);
  }

  handlePageChange(pageNumber) {
    var data = {
      page: pageNumber.selected + 1,
      lat: this.state.lat,
      lng:this.state.lng,
    }
    this.getEvents(data);
  }

 


 

  handleChangeStartDate = date_start => {
    this.setState({
      startDate: date_start
    });
    if (!date_start) {
      this.setState({ show_select: true });
      this.setState({ show_datepicker: false });
    }
    console.log("==== print date of the start date search event--- ===>>>>", date_start);
  };

  handleChangeEndDate = date_end => {
    this.setState({ endDate: date_end });
    console.log("==== end date of the ===>>> event search ===>>>==", date_end)
    if (!date_end) {
      this.setState({ show_select: true });
      this.setState({ show_datepicker: false });
    }
  }

  render() {
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
        {/*- Start Slider -*/}
        <div className="siteSlider">
          <div id="demo" className="carousel slide" data-ride="carousel">
            {/* Indicators */}
            <ul className="carousel-indicators">
              {this.state.upcomings.map((upcoming, index) => (
                <li key={index} data-target="#demo" data-slide-to={index} className={(index === 0) ? "active" : ""} />
              ))}
            </ul>
            {/* The slideshow */}
            <div className="carousel-inner sliderContent" >
              {this.state.upcomings.map((upcoming, index) => (
                <div key={index} className={(index === 0) ? "carousel-item active" : "carousel-item"}>
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
        
        {/*- Start display Events -*/}
        <div className="displayEvents eventPageRow">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="siteTitle">
                  <h2 className="titleText">{this.state.cityToShow}</h2>

                </div>
              </div>
            </div>
            {(this.state.total > 0)
              ?
              <div className="row">
                {this.state.events &&  this.state.events.map((event, index) => (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <div className="eventDisplaySec">
                      <div className="displayImage">
                        <a  onClick={this.getEvent.bind(this, event.event_slug)}>
                          <img src={baseUrl() + 'uploads/' + event.event_image} alt="" />
                        </a>
                      </div>
                      <div className="DispalyEventDate">
                        <div className="innerDate">
                          <a onClick={this.getEvent.bind(this, event.event_slug)}>
                            <h3 className="eventDate">
                            {
                          (event.min_price == '0' && event.max_price == '0')?
                          <span className="eventPrice">$0</span> :
                               <span className="eventPrice">
                               ${event.min_price} - ${event.max_price}
                               </span>
                          }
                        <span className="pageEventDate">{('"' + moment(event.start_date).toDate().toDateString() + '"').split(" ")[1]}
                                <span className="dateYear">
                                  {moment(event.start_date).format("DD-YYYY")}
                                </span>
                              </span>
                            </h3>
                          </a>
                        </div>
                        <div className="DisplayEventTitle">
                          <h2 className="eventTitle"><a onClick={this.getEvent.bind(this, event.event_slug)}>{event.event_title.charAt(0).toUpperCase() + event.event_title.slice(1)}</a></h2>
                          <p>Location {event.city}</p>
                        </div>
                        <div className="locDisText">
                          {parser(`${event.description.substring(0, 70)}...`)}
                        </div>
                        <div className="EventComprar">
                          <span className="eventComprarInner">
                            <a  onClick={this.getEvent.bind(this, event.event_slug)}>Comprar</a>
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
                  {(this.state.showPagination)
                    ? <ReactPaginate
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
export default (EventListByCity)


