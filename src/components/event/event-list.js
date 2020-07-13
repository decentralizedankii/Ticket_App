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

class Register extends Component {
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
      showPagination: true,
      categories: []
    }

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  };

  componentWillMount() {
    var params = new URLSearchParams(this.props.location.search)
    if (params.get('city')) {
      this.setState({ city_name: params.get('city') })
    }
    if (params.get('event_name')) {
      this.setState({ event_name: params.get('event_name') })
    }
    if (params.get('category')) {
      this.setState({ category: params.get('category') })
    }
    if (params.get('type')) {
      this.setState({ type: params.get('type') })
    }
    this.getEvents();
  }

  gooplemap() {

    if (navigator.geolocation) {
      var cityName;
      navigator.geolocation.getCurrentPosition(position => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        // Get address from latidude & longitude.

        Geocode.fromLatLng(lat, lng).then(
          response => {
            var city;
            const address = response.results[0].address_components;

            address.forEach(element => {

              element.types.forEach(data => {
                if (data === 'administrative_area_level_1') {
                  city = element.long_name;
                  localStorage.setItem('city_name', city);
                  this.setCity(city);

                }
                else if (data === 'locality') {
                  city = element.long_name;
                  localStorage.setItem('city_name', city);
                }

              });
              if (city != 'undefined' && city != '') {
                localStorage.setItem('city_name', city);
                // statusCopy.city_name = city;
                // self.setState(statusCopy);

                //return city;
              }

            });
          },
          error => {
            console.error(error);
          }
        );
      })
    } else {
      console.log("Geolocation is not supported by this browser!");
    }
  }

  setCity(data) {
    this.setState({ city_name: data });
  }

  searchEvent(data) {
    // window.location = data.key;

    console.log("==== print search data ====>>>", data);
    this.setState({ event_name: data.key });

    if (data == '') {
      this.setState({ event_name: '' });

      var appBanners = document.getElementsByClassName('react-search-box-dropdown');

      for (var i = 0; i < appBanners.length; i++) {
        appBanners[i].style.display = 'none'();
      }
    }
  }

  onchangeEvent(data) {
    // window.location = data.key;
    this.setState({ event_name: data });
    var appBanners = document.getElementsByClassName('react-search-box-dropdown');

    for (var i = 0; i < appBanners.length; i++) {
      appBanners[i].style.display = 'block';
    }

    if (data == '') {
      this.setState({ event_name: '' });
      var appBanners = document.getElementsByClassName('react-search-box-dropdown');

      for (var i = 0; i < appBanners.length; i++) {
        appBanners[i].style.display = 'none';
      }
    }
  }


  submitSearch() {
    geocodeByAddress(this.state.city_name)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) =>
    {
      this.setState({lat:lat,lng:lng},function(){
        var data;
        if(this.state.type !== "7" && this.state.type == ""){
        this.setState({startDate: ''});
        this.setState({endDate: ''});
        }
          data = {
            page: 1,
            type: this.state.type,
            start_date: this.state.startDate,
            end_date: this.state.endDate,
           // city: this.state.city_name,
            category: this.state.category,
            search_text: this.state.event_name,
            lat: this.state.lat,
            lng: this.state.lng,
          }
    
          console.log("==== print all the data after submit the ===>>>>==", data);
     
        this.eventList(data); 

      })
      console.log('Successfully got latitude and longitude', { lat, lng })
    }
    )
    .catch(error => console.error(error));
  }

  eventList(data) {

    axios.post(apiUrl() + "search-event", data).then((res) => {
      console.log("==== >>>> rint search ======>>>>===", res.data)
      this.setState({ loading: true });
      if (res.data.status == 200) {
        this.setState({ total: res.data.total_event });
        if (res.data.total_event < 6) {
          this.setState({ showPagination: false });
        } else {
          this.setState({ showPagination: true });
        }
        this.setState({ events: res.data.events, limit: res.data.limit });
        this.setState({ loading: false });
      }
    }).catch(err => {
      console.log(err);
      this.setState({ loading: false });
    });

  }

  getEvents() {
    this.setState({ loading: true });
    var data = {
      page: 1
    }
    axios.post(apiUrl() + "event-list", data).then((res) => {

      this.setState({ categories: res.data.categories, upcomings: res.data.upcoming });
      this.setState({ loading: false });
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
      type: this.state.type,
      city: this.state.city_name,
      category: this.state.category,
      search_text: this.state.event_name
    }
    this.eventList(data);
  }

  onChangeCity(el) {
    this.setState({ city_name: el.target.value });
  }

  onChangeType(el) {
    this.setState({ type: el.target.value });
    console.log("===== print on changes type =====", el.target.value);
    if (el.target.value == "7") {
      this.setState({ show_select: false });
      this.setState({ show_datepicker: true });
    }
    if (!this.state.startDate) {
      this.setState({ startDate: new Date() });
    }
    if (!this.state.endDate) {
      this.setState({ endDate: new Date() });
    }
  }

  onChangeCategory(category) {
    this.setState({ category: category.target.value });
  }

  onChangeSearchText(text) {
    this.setState({ event_name: text.target.value });
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
                          <input type="text" className="filterTextBox " name="event_name" onChange={this.onChangeSearchText} value={this.state.value} placeholder="What are you looking for ?" />
                        </div>

                      </div>
                      {
                        this.state.show_select == true ?

                          <div className="siteEventForm eventState">
                            <select className="selectpicker filterBtn" name="type" onChange={(value) => this.onChangeType(value)} value={this.state.value}>
                              <option value="">Cualquier fecha</option>
                              <option value="1">Hoy</option>
                              {/* <option value="2">mañana</option> */}
                              <option value="2">Tomorrow</option>
                              {/* <option value="3">Este fin de semana</option> */}
                              <option value="3">Esta semana</option>
                              <option value="4">La próxima semana</option>
                              <option value="5">Este mes</option>
                              <option value="6">El proximo mes</option>
                              <option value="7">Selecciona una fecha</option>
                            </select>
                          </div> :
                          <div className="datepicker_cust">
                            <DatePicker
                              dateFormat="yyyy-MM-dd"
                              selected={this.state.startDate}
                              onChange={this.handleChangeStartDate}
                              selectsStart
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              isClearable
                            />
                            <DatePicker
                              dateFormat="yyyy-MM-dd"
                              selected={this.state.endDate}
                              onChange={this.handleChangeEndDate}
                              selectsEnd
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              isClearable
                            />
                          </div>
                      }
                      <div className="siteEventForm eventCity" onChange={this.onChangeCity.bind(this)} value={this.state.value} name="type">

                        <GooglePlacesAutocomplete
                          placeholder="Enter Location"
                          initialValue={this.state.city_name}
                          onSelect={({ description }) => (
                            this.setState({ city_name: description })
                          )}
                        />
                      </div>
                      <div className="siteEventForm eventVenue">
                        <select className="selectpicker filterBtn" name="category" onChange={(value) => this.onChangeCategory(value)} value={this.state.value}>
                          <option>Categoría</option>
                          {this.state.categories.map((categories, index) => (
                            <option key={index} value={categories.id} >{categories.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="siteEventForm eventSubmitBtn">
                        <button type="button" onClick={this.submitSearch.bind(this)} className="btn btn-primary hmSearchBtn">Buscar Eventos</button>
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
export default (Register)


