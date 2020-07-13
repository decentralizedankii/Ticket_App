import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ResponsiveMenu from 'react-responsive-navbar';

class Header extends Component {

  render() 
  {
    return (

    <div>
      {/*- Start New Header -*/}
      
      <header className="newHeaderDesign">
        <div className="container-fluid">
          <div className="row">
            
            <div className="newLogoNavBar">
              <div className="newSiteLogo">
                <div className="newLogoLeft">
                  <Link className="navbar-brand" to={'/'}>
                    <img src="/images/newHeaderLogo.png" alt="Logo" />
                  </Link>
                </div>
              </div>  
              <div className="newNavigation">
                <div className="newNavRight">
                  <div className="navBarTikt">
                    <div className="sportbgIconBg navBG">
                    <Link to={'/event-list-bycat/9'}>
                        <img src="/images/sports.png" alt="Nav" />
                        <span>Deportes</span>
                      </Link>
                    </div>
                  </div>
                  <div className="navBarTikt">
                    <div className="concertsbg navBG">
                    <Link to={'/event-list-bycat/10'}>
                        <img src="/images/Concerts.png" alt="Nav" />
                        <span>Conciertos</span>
                      </Link>
                    </div>
                  </div>
                  <div className="navBarTikt">
                    <div className="artbg navBG">
                    <Link to={'/event-list-bycat/11'}>
                        <img src="/images/art.png" alt="Nav" />
                        <span>Arte</span>
                      </Link>
                    </div>
                  </div>
                  <div className="navBarTikt">
                    <div className="culturebg navBG">
                    <Link to={'/event-list-bycat/12'}>
                        <img src="/images/culture.png" alt="Nav" />
                        <span>Cultura</span>
                      </Link>
                    </div>
                  </div>
                  <div className="navBarTikt theaterBlcok">
                    <div className="theaterBg navBG">
                        <Link to={'/event-list-bycat/13'}>
                        <img src="/images/theater.png" alt="Nav" />
                        <span>Teatro</span>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           

           <div className="mobileHeader">
              <div className="mobileLogoMenu">
                <div className="mobileLogo">
                  <Link className="navbar-brand" to={'/'}>
                    <img src="/images/logo_white.png" alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="newMobileNav">
              <ResponsiveMenu
                menuOpenButton={<div><img className="menuIcon" src="/images/menu.png" /></div>}
                menuCloseButton={<div><img className="crossIcon" src="/images/cross.png" /></div>}
                changeMenuOn="500px"
                largeMenuClassName="large-menu-classname"
                smallMenuClassName="small-menu-classname"
                menu={
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                  </ul>
                }
            />
              </div>
            </div>

          

          </div>  
        </div>  
      </header> 
      {/*- End New Header -*/} 
     {/*- Start Header -*/} 
     {/*
<header className="siteHeader navbar-fixed-top">
          <div className="container">
            <div className="row">
              <nav className="navbar navbar-expand-lg navbar-light siteNavBar">
                <Link className="navbar-brand" to={'/'}>
                  <img src="/images/logo_white.png" alt="Logo" />  
                </Link>
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
                      <Link className to={"/event-list"}>Eventos</Link>
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
                    <li><span className="logUSer"><Link to={"/login"}>Iniciar Sesión</Link></span></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>*/}
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