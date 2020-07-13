import React, { Component } from 'react';
class Footer extends Component {
   render() {
      return (
         <div>
       <footer className="siteFooetr">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 ">
                <div className="footerColum footerSocial">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook" /></a></li>
                    <li><a href="#"><i className="fa fa-twitter" /></a></li>
                    <li><a href="#"><i className="fa fa-pinterest-p" /></a></li>
                    <li><a href="#"><i className="fa fa-tumblr" /></a></li>
                    <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 ">
                <div className="footerColum footerLogo">
                  <a href="#"><img src="/images/logo_white.png" alt="" /></a>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 ">
                <div className="footerColum footercopyright">
                  <p>Copyright by ovatheme on themeforest</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
         </div>
      );
   }
}
export default Footer;