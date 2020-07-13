import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import Loader from 'react-loader-spinner';
import Header from '../common/header.js';
import Footer from '../common/footer.js';
import { Link } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      email: '',
      password: '',
      remember: true,
      loading:false,
      disable: false,
      chkbox: false
    }

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  };

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (!this.state.email) {
      return this.setState({ error: 'Email is required' });
    }
    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
    if(this.state.email !== "" && this.state.password !== ""){
      var data = {
        email: this.state.email,
        password: this.state.password
      }
      axios.post(apiUrl() + "user-login", data).then((res) => {
        this.setState({loading: true});
        if(res.data.status == 200){
          localStorage.setItem('user_id',res.data.data[0].id);
          localStorage.setItem('email',res.data.data[0].email);
          localStorage.setItem('isLogin','true');
          console.log("==== print data after login =====>>>>", res.data);
          localStorage.setItem('token',res.data.token);
          this.props.history.push(`/event-list`);
          this.setState({loading: false});
        }
        if(res.data.status == 404){
          localStorage.setItem('isLogin','false');
          localStorage.setItem('token','');
          this.setState({ error: 'Incorrect credentials.' });
          this.setState({loading: false});
        }
      }).catch(err => {
      console.log(err);
      this.setState({loading: false});
        });

    }else{
       return this.setState({ error: '' });
    }

  }
  
  componentWillMount() {
  
    if(this.state.remember){
      this.setState({email: localStorage.getItem('email')});
      // this.setState({password: localStorage.getItem('password')});
    }
    if(localStorage.getItem('email') !== ""){
      this.setState({chkbox: true});
      this.setState({remember: false });
    }
  }

  handleEmailChange(evt) {
    this.setState({
      email: evt.target.value,
    });
    localStorage.setItem('email',this.state.email);    
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
    // localStorage.setItem('password',this.state.password);
  }

  rememberMe(){

      this.state.remember == false ? this.setState({remember: true}) : this.setState({remember: false});
    if(this.state.email == " "){
      this.setState({disable: true});
    }else{
      console.log("===== print click of remeber me ====>>>==",this.state.remember)
      if(this.state.remember){
        console.log("=== print rember this state remember in true true true ====>>>", this.state.remember)
        this.setState({email: localStorage.getItem('email')});
        // this.setState({password: localStorage.getItem('password')});
      }else{
        console.log("=== print rember this state remember in false false false false ====>>>", this.state.remember)
        localStorage.setItem('email','');
        // localStorage.setItem('password',''); 
        this.setState({chkbox: false});
      }
    }
  }
  
  render() {
    
    return (
      <div>
        <Header />
        {/*- Start Single Event Title -*/} 
        <div className="singleEvent eventFilterTitle loginBg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="singleEventTitle">
                  <h3>SIGN IN</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End Single Event Title -*/} 
        {/*- Start Login Signup Structure -*/} 
        <div className="loginSignUpPage">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="loginInnerDetail">
                  <div className="loginPageTitle">
                    <h2 className="loginTitleText">SIGN IN</h2>
                  </div>
                  <div className="loginForm">
                    <form onSubmit={this.handleSubmit}>
                    {
                      this.state.error &&
                      <h5 data-test="error"  style={{color: 'red'}} onClick={this.dismissError}>
                        {this.state.error}
                      </h5>
                    }
                      <div className="form-group">
                        <label htmlFor="Email1">Email address</label>
                        <input type="email" className="form-control inputField" data-test="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter email" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Email1">Password</label>
                        <input type="password" className="form-control inputField" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} placeholder="Password" />
                      </div>
                      <div className="checkbox loginCheckBox">
                        <label><input type="checkbox" defaultChecked={this.state.chkbox}  disabled = {this.state.disable} onClick={this.rememberMe.bind(this)}/>Remember Me</label>
                        <label className="forgotPass"><Link to={"/forget-password"}>Forgot Password</Link></label>
                      </div>
                      <div className="loginSubmitBtn">
                        <button type="submit" className="btn btn-primary">Login</button>
                      </div>
                    {/* <div class="signUp">
                    <p>Don't have and account <Link to={"/register"}>Sign up Now</Link></p>
                    </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*- End Login Signup Structure -*/}

        <Footer />
      </div>
    );
  }
}
export default (Login)


