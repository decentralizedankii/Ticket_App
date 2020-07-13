import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { apiUrl, baseUrl } from '../../helpers/helper.js';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state ={
      email: localStorage.getItem('email'),
      login: ''
    }

    this.handleLogout = this.handleLogout.bind(this);
  };

  componentWillMount(){
  if(localStorage.getItem('token')){
      this.setState({login: true});  
    }
  }

  handleLogout(){
 var data = {
 
 }
    console.log("==== logout is working ========")
    axios.post(apiUrl() + "user-logout", data).then((res) => {

      console.log("==== use log out ====>>>====>>",res.data);
      if(res.data.status == 200){
        localStorage.setItem('token',res.data.token);
        this.setState({login: false});
      }

    })
  }

  render() 
  {
  
    return (

    <div>
     {/*- Start Header -*/} 
<header className="siteHeader navbar-fixed-top">
          <div className="container">
            <div className="row">
              <nav className="navbar navbar-expand-lg navbar-light siteNavBar">
                <Link className="navbar-brand" to={'/'}>
                  <img src="/images/logo_white.png" alt="Logo" />  
                </Link>
                <ul className="loginMember mobileLogin">
                  {/* <li><span className="logUSer"><a href="#">Iniciar Sesión</a></span></li> */}
                  {
                       !this.state.login ?
                      <li><span className="logUSer"><Link to={"/login"} onClick={this.handleLogout}>Iniciar Sesión</Link></span></li> :
                      <li><span className="logUSer"><Link to={"/login"} onClick={this.handleLogout}> logout Sesión</Link></span></li>
                    }
                </ul>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                  <span className="crossSign">
                    <span className="bar-1" />    
                    <span className="bar-2" />      
                  </span>
                </button>
                <div className="collapse navbar-collapse topNavigation" id="navbarCollapse">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <Link className="" to={"/event-list"}>Eventos</Link>
                    </li>
                    <li className="dropdown">
                    {/* <Link className to={"/howitworks"}>Cómo Funciona?</Link> */}
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Cómo Funciona? <i className="fa fa-caret-down" /></a>
                      {/* <ul className="dropdown-menu">
                        <li><a href="#">Funciona Event</a></li>
                        <li><a href="#">Funciona Event</a></li>
                        <li><a href="#">Funciona Event</a></li>
                        <li><a href="#">Funciona Event</a></li>
                        <li><a href="#">Funciona Event</a></li>
                      </ul> */}
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Crear Evento <i className="fa fa-caret-down" /></a>
                      {/* <ul className="dropdown-menu">
                        <li><a href="#">Evento</a></li>
                        <li><a href="#">Evento</a></li>
                        <li><a href="#">Evento</a></li>
                        <li><a href="#">Evento</a></li>
                        <li><a href="#">Evento</a></li>
                      </ul> */}
                    </li>
                  </ul>
                  <ul className="loginMember desktopLogin">
                    {
                       !this.state.login ?
                      <li><span className="logUSer"><Link to={"/login"} onClick={this.handleLogout}>Iniciar Sesión</Link></span></li> :
                      <li><span className="logUSer"><Link to={"/login"} onClick={this.handleLogout}> logout Sesión</Link></span></li>
                    }
                   
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
        {/*- End Header -*/} 
        
      </div>
    
      );
   }
}
Header.defaultProps = {
   headerProp: true,
   activeProp: false
}

export default Header;