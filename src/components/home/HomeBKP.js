import React, { Component, useState } from 'react';
import Header from '../common/header.js';
import Footer from '../common/footer.js';
import parser from 'html-react-parser';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import { geolocated } from "react-geolocated";
import { CircleSpinner } from "react-spinners-kit";
import moment from 'moment'
import Geocode from "react-geocode";
import ReactSearchBox from 'react-search-box';
import Loader from 'react-loader-spinner';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress,getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/assets/index.css';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
// /console.log(this.props.coords);
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyCpP_GqrDrJlC3zSKGb7SsCtQDRUb-kfRw");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

class Home extends Component {
  constructor(props) {
    super(props);

    // this.state = { isLogin: false, username: '', user_id: '',banners:[], videoData: [], success: { message: '' }, loader: 'block' };

    this.state =
    {
      city_name: '',
      event_name: '',
      category: '',
      lat: 0,
      lng: 0,
      start_date: '',
      end_date: '',
      search_error:'',
      type: '',
      baseUrl: '',
      event_id:'',
      events: [],
      upcomings: [],
      loading:false,
      isactive:false,
      show_select: true,
     show_datepicker: false,
      startDate: new Date(),
      endDate: new Date(),
      state: [],
      city_1_name:'',
      city_1_event: '',
      city_2_name:'',
      city_2_event: '',
      city_3_name:'',
      city_3_event: '',
      city_4_name:'',
      city_4_event: '',
      cities_events:[],
      city: [],
      categories: [],
    }

    this.onChangeType = this.onChangeType.bind(this); 
    this.onChangeCity = this.onChangeCity.bind(this); 
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this); 
  };

  componentDidMount() {
  
    this.setState({ baseUrl: baseUrl() });

    localStorage.setItem('city_name', '');
    axios.get(apiUrl() + "events").then((res) => {
      this.setState({loading: true});
      console.log(res.data);
      if(res.data.status == 200){
        this.setState({
           upcomings: res.data.upcoming, categories: res.data.categories, city: res.data.city, event_names: res.data.event_names,
          start_date: moment(new Date(res.data.start_date)).format("MM/DD/YYYY"),
          end_date: moment(new Date(res.data.end_date)).format("MM/DD/YYYY")
        });
      
        this.setState({city_1_event: res.data.santoData });
        this.setState({city_2_event: res.data.puntaData});
        this.setState({city_3_event: res.data.altosData});
        this.setState({city_4_event: res.data.santiagoData});

        this.setState({loading: false});
      }
   
    }).catch(err => {
       console.log(err);
       this.setState({loading: false});
      });

    this.gooplemap();
    var data = {
      page: 1,
      type: this.state.type,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      city: this.state.city_name,
      category: this.state.category,
      search_text: this.state.event_name
    }
    this.eventList(data);
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

    console.log("==== print search data ====>>>",data);
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
        if (this.state.total == 0) {
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

  onChangeCity(el) {
    this.setState({ city_name: el.target.value });
  }

  onChangeType(el) {
    this.setState({ type: el.target.value });
    console.log("===== print on changes type =====", el.target.value);
    if(el.target.value == "7"){
      this.setState({show_select: false});
      this.setState({show_datepicker: true});
    }
    if(!this.state.startDate){
      this.setState({startDate: new Date()});
    }
    if(!this.state.endDate){
      this.setState({endDate: new Date()});
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
    if(!date_start){
      this.setState({show_select: true});
      this.setState({show_datepicker: false});
    }
    console.log("==== print date of the start date search event--- ===>>>>", date_start);
  };

  handleChangeEndDate = date_end => {
    this.setState({ endDate: date_end });
    console.log("==== end date of the ===>>> event search ===>>>==", date_end)
    if(!date_end){
      this.setState({show_select: true});
      this.setState({show_datepicker: false});
    }
  }

  getEvent(event_slug) {
   this.props.history.push(`/single-event/${event_slug}`);
  }

  render() {
    const cityy = localStorage.getItem('city_name');
    localStorage.setItem('city_name','');
    console.log(this.state.city_name);
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
        <div className="siteSlider">
          <div id="demo" className="carousel slide" data-ride="carousel">
            {/* Indicators */}
            <ul className="carousel-indicators">
              {this.state.upcomings.map((upcomings, index) => (
                <li key={index} data-target="#demo" data-slide-to={index} className={(index == 0) ? "active" : ""} />
              ))}
            </ul>
            {/* The slideshow */}
            <div className="carousel-inner sliderContent">
              { this.state.upcomings.map((upcomings, index) => (
                <div key={index} className={(index == 0) ? "carousel-item active" : "carousel-item"}>
                  <img src={baseUrl()+ 'uploads/' + upcomings.banner_image} alt="" />
                  <div className="sliderTextContent">
                    <div className="container">
                      <h3>{upcomings.event_name}</h3>
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
                        </div>:
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
                      <div className="siteEventForm eventCity" onChange={this.onChangeCity.bind(this)} value = {this.state.value} name="type">

                        <GooglePlacesAutocomplete
                          placeholder="Enter Location"
                          initialValue={this.state.city_name}
                          onSelect={({ description }) => (
                            this.setState({ city_name: description })
                          )}
                          

                        />
                      </div>
                      <div className="siteEventForm eventVenue">
                        <select className="selectpicker filterBtn" name="category"  onChange={(value)=>this.onChangeCategory(value)} value={this.state.value}>
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
        <div className="displayEvents"> {/** */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="siteTitle">
                  <h2 className="titleText">Eventos Populares</h2>
                </div>
              </div>
            </div>
            {this.state.showPagination
              ?
            <div className="row" >
              {
              this.state.events.map((event, index) => (
                <div key={index} className="col-lg-4 col-md-4">
                  <div className="eventDisplaySec">
                    <div className="displayImage">
                      <img src={baseUrl() + 'uploads/' + event.event_image} alt="" />
                    </div>
                    <div className="DispalyEventDate">
                      <div className="innerDate">
                      <div onClick={this.getEvent.bind(this, event.event_slug)}>
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
                        {/* <h3 className="eventDate">{('"' + moment(event.start_date).toDate().toDateString() + '"').split(" ")[1]}<span>
                          {moment(event.start_date).format("DD-YYYY")}
                        </span>
                        </h3> */}
                        </div>
                      </div>
                      <div className="DisplayEventTitle">
                        <h2 className="eventTitle"><span onClick={this.getEvent.bind(this,event.event_slug)}>{event.event_name.charAt(0).toUpperCase() + event.event_name.slice(1)}</span></h2>
                        <p>Location {event.city}</p>
                      </div>
                      <div className="locDisText">
                        {parser(`${event.description.substring(0,70)}...`)}
                      </div>
                      <div className="EventComprar">
                        <span className="eventComprarInner">
                          <a onClick={this.getEvent.bind(this,event.event_slug)}>Comprar</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> : <div>No event found</div>
            }
            <div className="row">
              <div className="col-md-12">
                <div className="homeViewEventBtn">
                <Link type="button" to={"/event-list"} className="btn btn-primary viewAllEvent">View All Event</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="viewCitySec">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="siteTitle">
                  <h2 className="titleText">View of a City</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="citiesSec citySec-1">
                <Link to={'/event-list-bycity/santo-domingo'}>
                    <div className="cityImage">
                      <img src="/images/desktopCity-1.jpg" alt="" className="mobileHide" />
                      <img src="/images/mobileCity-1.jpg" alt="" className="disktopHide" />
                    </div>
                    <div className="cityTitle">
                      {/* <h2>Santo Domingo</h2> */}
                      <h2>Santo Domingo</h2>
                      <label className="eventQuantity">{this.state.city_1_event} Events</label>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="citiesSec citySec-2">
                <Link to={'/event-list-bycity/punta-cana'}>
                    <div className="cityImage">
                      <img src="/images/desktopCity-2.jpg" alt="" className="mobileHide" />
                      <img src="/images/mobileCity-2.jpg" alt="" className="disktopHide" />
                    </div>
                    <div className="cityTitle">
                      {/* <h2>Punta Cana</h2> */}
                      <h2>Punta Cana</h2>
                      <label className="eventQuantity">{this.state.city_2_event} Events</label> 
                    </div>
                  </Link>
                </div>
                <div className="cities-3-4">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="citiesSec citySec-3">
                      <Link to={'/event-list-bycity/altos-de-chavon'}>
                          <div className="cityImage">
                            <img src="/images/desktopCity-3.jpg" alt="" className="mobileHide" />
                            <img src="/images/mobileCity-3.jpg" alt="" className="disktopHide" />
                          </div>
                          <div className="cityTitle">
                            {/* <h2>La Romana</h2> */}
                            <h2>Altos de Chavon</h2>
                           <label className="eventQuantity">{this.state.city_3_event} Events</label>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="citiesSec citySec-4">
                        <Link to={'/event-list-bycity/santiago'}>
                          <div className="cityImage">
                            <img src="/images/desktopCity-4.jpg" alt="" className="mobileHide" />
                            <img src="/images/mobileCity-4.jpg" alt="" className="disktopHide" />
                          </div>
                          <div className="cityTitle">
                            {/* <h2>Santiago</h2> */}
                            <h2>Santiago</h2>
                           <label className="eventQuantity">{this.state.city_4_event} Events</label> 
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End View of a City -*/}
        {/*- Start Why Choose Us -*/}
        <div className="whyChooseUsSec">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="siteTitle">
                  <h2 className="titleText">Por qué elegirnos?</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="chooseSecInner">
                  <div className="chooseNo">
                    <span>01</span>
                  </div>
                  <div className="chooseText">
                    <h3><a href="#">Boletas Digitales:</a></h3>
                    <p>Nuestro sistema QR Code te permite de una manera fácil y sencilla, tener acceso a tus boletas en cualquier lugar, en cualquier momento.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="chooseSecInner">
                  <div className="chooseNo">
                    <span>02</span>
                  </div>
                  <div className="chooseText">
                    <h3><a href="#">Procesos de Pagos Seguros:</a></h3>
                    <p>Las transacciones en línea son totalmente seguras con el sistema de Azul, de Banco Popular. Puedes comprar tus boletas con tarjetas de crédito, debito, Paypal y Botón Popular.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End Why Choose Us -*/}

        <Footer />
      </div>
    );
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true
})(Home);


