import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../helpers/helper.js';
import Loader from 'react-loader-spinner';
import Header from '../common/header.js';
import Footer from '../common/footer.js';


class Register extends Component {
  constructor(props) {
    super(props);

    this.state ={
      email: '',
      first_name:'',
      last_name:'',
      loading: false
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);

  };

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    console.log("====print data ===>>>===>> handle submit")
    evt.preventDefault();
    if (!this.state.email) {
      return this.setState({ error: 'Email is required' });
    }
    if (!this.state.first_name) {
      return this.setState({ error: 'First name is required' });
    }
    if (!this.state.last_name) {
      return this.setState({ error: 'Last name is required' });
    }
    if(this.state.email !== "" && this.state.first_name !== "" && this.state.last_name !== ""){
      var data = {
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name
      }
      this.setState({loading: true});
      axios.post(apiUrl() + "user-signup", data).then((res) => {
        if(res.data.status == 200){
          this.props.history.push(`/login`);
          this.setState({loading: false});
        }
        if(res.data.status == 409){
         this.setState({ error: 'Email already exist.' });
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

  handleEmailChange(evt) {
    this.setState({
      email: evt.target.value,
    });
  };

  handleFirstNameChange(evt) {
    this.setState({
      first_name: evt.target.value,
    });
  }
  handleLastNameChange(evt) {
    this.setState({
      last_name: evt.target.value,
    });
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
        <div className="singleEvent eventFilterTitle loginBg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="singleEventTitle">
                  <h3>Registration</h3>
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
                    <h2 className="loginTitleText">REGISTER USER</h2>
                  </div>
                 {/* <p>{this.state.message}</p> */}
                  <div className="loginForm">
                    <form onSubmit={this.handleSubmit} >

                    {
                      this.state.error &&
                      <h5 data-test="error" style={{color: 'red'}} onClick={this.dismissError}>
                        {this.state.error}
                      </h5>
                    }
                      <div className="form-group">
                        <label htmlFor="Email1">Email address</label>
                        <input type="email"  className="form-control inputField"  data-test="email" value={this.state.email}  onChange={this.handleEmailChange}  placeholder="Enter email" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text"  className="form-control inputField"  data-test="first_name" value={this.state.first_name} onChange={this.handleFirstNameChange}   placeholder="First Name" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text"  className="form-control inputField"  data-test="last_name" value={this.state.last_name} onChange={this.handleLastNameChange}   placeholder="Last Name" />
                      </div>
                      <div className="checkbox loginCheckBox">
                        <p><b>Note:</b> Your password will be generated automatically and sent to your email address.</p>
                      </div>
                      <div className="loginSubmitBtn">
                        <button type="submit"  className="btn btn-primary">Register</button>
                        
                      </div>
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
export default (Register)


