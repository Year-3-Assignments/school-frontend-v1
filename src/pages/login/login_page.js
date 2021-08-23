import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginImage from '../../assets/login-image.gif';
import './login_page.scss';

class LoginPage extends Component {
  render() {
    return (
      <div className="p-xl-5 p-2 my--3 d-flex justify-content-center">
        <div className="card login-card">
          <div className="row  g-0">
            <div className="col-md-6 col-sm-12">
              <div className="text-center mt-xl-5">
                <h1 className="title-text">REACH College</h1>
                <img src={loginImage} alt="login" className="login-img" />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="d-flex justify-content-left px-5 login-form">
                <h3 className="m-0">Login</h3>
              </div>
              <small className="px-5 text-muted">
                <i>We won't share your details to anyone in the system</i>
              </small>
              <div className="px-5 ">
                <div className="row m-0 mb-2 mt-3">
                  <label htmlFor="title" className="form-label p-0 m-0">
                    Username/ Email Address
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    name="title"
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="px-5 mt-4">
                <div className="row m-0">
                  <label htmlFor="title" className="form-label p-0 m-0">
                    Password
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    name="title"
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end px-5 mt-2">
                <a href="#">Reset my password</a>
              </div>
              <div className="d-flex justify-content-end px-5 mt-1">
                <button className="btn btn-primary btn-no-shadow btn-rounded">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
