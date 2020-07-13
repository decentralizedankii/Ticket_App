import React, { Component, Fragment } from 'react';
import Header from '../common/header.js';
import Footer from '../common/footer.js';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import GoogleMapReact from 'google-map-react';
import Loader from 'react-loader-spinner';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { geolocated } from "react-geolocated";

 //Marker Component
 const AnyReactComponent = ({ text }) => <div><b>{text}</b></div>; 

 const mapStyles = {
  width: '100%',
  height: '100%',
};

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: [],
      ticket: [],
      event_image: '',
      banner_image:'',
      loading:false,
      slider_images:[],
      center : {
        lat: '', 
        lng:  ''
      },
      zoom : 10,
      event_id:'',
      myMarkers : []
    };

  };

  componentWillMount() {
    var data = {
      event_id: this.props.match.params.event_slug
    }
    this.setState({loading: true});
    axios.post(apiUrl() + "single-event", data, {
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      console.log("==== get data of single image from api ===", res);
      if (res.data.status == 200) {
        // this.state.event = res.data.data[0];
        this.setState({event:res.data.data[0]})
        this.setState({event_id: res.data.id});
        this.setState({ event: this.state.event });
        this.setState({event_image: this.state.event.event_image});
        localStorage.setItem('event_name',res.data.data[0].event_name);
        this.setState({banner_image: res.data.data[0].banner_image});
        var lat_long = {
          lat: this.state.event.lat,
          lng: this.state.event.lng
        }
        this.setState({center: lat_long})

        console.log("==== print lat lng in ===>>>===>>", this.state.center)
        console.log("==== print single event detail ============>>>>>>>>", this.state.event);
        var sliders = [];
        sliders.push(this.state.event.slider_image1);
        sliders.push(this.state.event.slider_image2);
        sliders.push(this.state.event.slider_image3);
        console.log("==== print slider images of event  =====>>>>===", sliders);
        this.setState({slider_images: sliders});
        console.log("=== print slider images of the event =====", this.state.slider_images);
    
        var aMarker = {
          name : this.state.event.venue_name,
          lat : this.state.center.lat,
          lng : this.state.center.lng,
          text: 'My marker'
        }
        this.state.myMarkers[0] = aMarker;
        console.log("==== print data of marker =====>>>===", this.state.myMarkers)
        this.setState({loading: false});
    
      }
    }).catch(err => {
      console.log(err);
      this.setState({loading: false});
    });
  }


  getEventCart(id) {
    var data = {
      event_id: id
    }
    // if(localStorage.getItem('token')){
      this.props.history.push(`/cart-page/ba5ef51294fea5cb4eadea5306f3ca3b/${data.event_id}`); 
    // }else{
    //   this.props.history.push(`/login`);  
    // } 
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
        {/*- Start Single Event Title -*/}
 
        <div className="singleEvent" style={{backgroundImage: "url(" + baseUrl()+ 'uploads/'+ this.state.banner_image + ")" }} >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="singleEventTitle">
                  {/* <h3>Happy Wedding</h3> */}
                  <h3>{this.state.event.event_name}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End Single Event Title -*/}
        {/*- Start Single Event Description -*/}
        <div className="singleEventRow">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="eventDescriptionRight singleMargin-top">
                  <div className="eventExpire">
                    {/* <p>The event is expired</p> */}
                  </div>
                  <div className="singleEventImage">
                    <div id="demo" className="carousel slide" data-ride="carousel">
                      {/* Indicators */}
                      <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to={0} className="active" />
                        <li data-target="#demo" data-slide-to={1} />
                        <li data-target="#demo" data-slide-to={2} />
                      </ul>
                      {/* The slideshow */}
                      <div className="carousel-inner sliderContent">
                        <div className="carousel-item active">
                          <img src={baseUrl() + 'uploads/' + this.state.slider_images[0]} alt="" />
                        </div>
                        <div className="carousel-item">
                          <img src={baseUrl() + 'uploads/' + this.state.slider_images[1]}alt="" />
                        </div>
                        <div className="carousel-item">
                          <img src={baseUrl() + 'uploads/' + this.state.slider_images[2]} alt="" />
                        </div>
                      </div>
                      {/* Left and right controls */}
                      <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon" />
                      </a>
                      <a className="carousel-control-next" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon" />
                      </a>
                    </div>
                    {/* <div className="singleEventDesctiption">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    </div> */}
                    <div className="singleEventDesctiption">
                      {parser(`${this.state.event.description}`)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="eventDetailLeft singleMargin-top">
                  <div className="registerNowBtn">
                  <a href="JavaScript:  Void(0);" onClick={this.getEventCart.bind(this,this.state.event.id)}>Comprar</a>
                    {/* <Link type="button" to={"/cart-page"} class="btn btn-primary viewAllEvent">Comprar</Link> */}
                    {/* <Link type="button" onClick={this.getEventCart.bind(this,this.state.event.id)}  class="btn btn-primary viewAllEvent">Comprar</Link> */}
                  </div>
                  <div className="eventDetailMap">
                    <div className="eventDetail">
                      <h3 className="eventDetailTitle">{this.state.event.event_title}<span><i className="fa fa-file-text-o" /></span></h3>
                    </div>
                    <div className="eventFullDetail">
                      <div className="eventMenus">
                        <label>Start Date:</label>
                        {/* <span>Fecha / Hora</span> */}
                  <span>{this.state.event.start_date} / {this.state.event.start_time}</span>
                      </div>
                      <div className="eventMenus">
                        <label>Venue:</label>
                        {/* <span>Locación:</span> */}
                  <span>{this.state.event.venue_name}</span>
                      </div>
                      <div className="eventMenus">
                        <label>Address:</label>
                        {/* <span>Dirección</span> */}
                  <span>{this.state.event.address}</span>
                      </div>
                    </div>
                    <div className="eventMap">
                      <h3 className="eventMapTitle">Mapa</h3>
                      <div className="mapImg">

                      <div className="mapaImg" style={{ }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCpP_GqrDrJlC3zSKGb7SsCtQDRUb-kfRw' }}
                        center={this.state.center}
                        yesIWantToUseGoogleMapApiInternals
                        defaultZoom={this.state.zoom} 
                      >
                      <AnyReactComponent
                            lat = {this.state.center.lat}
                            lng = {this.state.center.lng}
                            text = {this.state.event.address}
                          />
                       </GoogleMapReact>
                      </div>

                     
                      
                        {/* <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.379184622368!2d-74.00701448509554!3d40.70966844569604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22c8d16f11%3A0xd48ff847e93b3d76!2sBeekman%20St%2C%20New%20York%2C%20NY%2010038%2C%20USA!5e0!3m2!1sen!2sin!4v1578475576306!5m2!1sen!2sin' frameBorder={0} style={{ border: 0 }} allowFullScreen /> */}
                      </div>
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

export default Index;


