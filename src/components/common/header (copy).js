import React, { Component } from 'react';


class Header extends Component {




  render() 
  {
    
    
    return (

    <div>
     {/*- Start Header -*/} 
<header className="siteHeader navbar-fixed-top">
          <div className="container">
            <div className="row">
              <nav className="navbar navbar-expand-lg navbar-light siteNavBar">
                <a className="navbar-brand" href="#">
                  <img src="/images/logo_white.png" alt="Logo" />  
                </a>
                <ul className="loginMember mobileLogin">
                  <li><span className="logUSer"><a href="#">Iniciar Sesión</a></span></li>
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
                      <a className href="#">Eventos</a>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Cómo Funciona? <i className="fa fa-caret-down" /></a>
                      <ul className="dropdown-menu">
                        <li><a href="#">Funciona Event</a></li>
                        <li><a href="#">Funciona Event</a></li>
                        <li><a href="#">Funciona Event</a></li>
                        <li><a href="#">Funciona Event</a></li>
                        <li><a href="#">Funciona Event</a></li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Crear Evento <i className="fa fa-caret-down" /></a>
                      <ul className="dropdown-menu">
                        <li><a href="#">Evento</a></li>
                        <li><a href="#">Evento</a></li>
                        <li><a href="#">Evento</a></li>
                        <li><a href="#">Evento</a></li>
                        <li><a href="#">Evento</a></li>
                      </ul>
                    </li>
                  </ul>
                  <ul className="loginMember desktopLogin">
                    <li><span className="logUSer"><a href="#">Iniciar Sesión</a></span></li>
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