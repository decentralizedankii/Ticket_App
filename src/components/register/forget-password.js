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
      loading: false
    }
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

    if(this.state.email !== ""){
      var data = {
        email: this.state.email
      }

      axios.post(apiUrl() + "user-forgot-password", data).then((res) => {
        this.setState({loading: true});
        if(res.data.status == 200){
          this.props.history.push(`/login`);
          this.setState({loading: false});
        }
        if(res.data.status == 404){
          this.setState({ error: 'Email is wrong.' });
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
        <div className="singleEvent eventFilterTitle">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="singleEventTitle">
                  <h3>Forgot Password</h3>
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
                <div className="loginInnerDetail forgotPassBox">
                  <div className="loginForm">
                  <form onSubmit={this.handleSubmit}>
                    {
                      this.state.error &&
                      <h5 data-test="error"  style={{color: 'red'}} onClick={this.dismissError}>
                        {this.state.error}
                      </h5>
                    }
                      <div className="form-group">
                        <label htmlFor="Email">Email address</label>
                        <input type="email" className="form-control inputField" data-test="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter email" />
                      </div>
                      <div className="checkbox loginCheckBox">
                        <p><b>Note:</b> Your password will be generated automatically and sent to your email address.</p>
                      </div>
                      <div className="loginSubmitBtn">
                        <button type="submit" className="btn btn-primary">Submit</button>
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


