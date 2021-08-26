import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginImage from '../../assets/login-image.gif';
import { NotificationManager } from 'react-notifications';
import { loginUser } from '../../actions/user_actions';
import Loader from '../../components/loader';

const Constants = {
  LOGIN_SUCCESS: 'User login success',
  LOGIN_FAIL: 'Username or password is invalid',
  USER_NAME_REQUIRED: 'Username is required',
  PASSWORD_REQUIRED: 'Password is required',
  FIELDS_REQUIRED: 'Please check the input fields',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_NOT_MATCH: 'Password is not matched',
  ROLE_TEACHER: 'TEACHER',
  ROLE_ADMIN: 'ADMIN',
};

const initialState = {
  isLoading: false,
  isFormNotValid: false,
  userName: '',
  password: '',
};

const $ = window.$;
let formData = {};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = initialState;
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.loginData !== nextProps.loginData) {
      this.setState({ isLoading: false }, () => {
        if (
          nextProps.loginData &&
          nextProps.loginData.data &&
          nextProps.loginData.data === Constants.USER_NOT_FOUND
        ) {
          NotificationManager.warning(Constants.USER_NOT_FOUND);
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('role');
        } else if (nextProps.loginData.data === Constants.PASSWORD_NOT_MATCH) {
          NotificationManager.warning(Constants.PASSWORD_NOT_MATCH);
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('role');
        } else {
          if (
            nextProps.loginData &&
            nextProps.loginData.data &&
            nextProps.loginData.data.responseData
          ) {
            localStorage.setItem(
              'userName',
              nextProps.loginData.data.responseData.userName
            );
            localStorage.setItem(
              'token',
              nextProps.loginData.data.responseData.token
            );
            localStorage.setItem(
              'user_id',
              nextProps.loginData.data.responseData.user_id
            );
            localStorage.setItem(
              'role',
              nextProps.loginData.data.responseData.role
            );

            if (localStorage.getItem('role') === Constants.ROLE_TEACHER) {
              window.location = '/examination';
              NotificationManager.success(Constants.LOGIN_SUCCESS);
            }

            if (localStorage.getItem('role') === Constants.ROLE_ADMIN) {
              window.location = '/student/view';
              NotificationManager.success(Constants.LOGIN_SUCCESS);
            }
          }
        }
      });
    }

    if (this.props.loginUserError !== nextProps.loginUserError) {
      this.setState({ isLoading: false }, () => {
        if (nextProps.loginUserError && nextProps.loginUserError.message) {
          NotificationManager.error(nextProps.loginUserError.message);
        } else {
          NotificationManager.error(Constants.LOGIN_FAIL);
        }
      });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // validation
  validateForm() {
    const { userName, password } = this.state;

    const data = {
      userName: userName && userName.trim().length > 0 ? userName : null,
      password: password && password.trim().length > 0 ? password : null,
    };

    formData = Object.assign({}, data);
    return true;
  }

  // send login details
  onLoginFormSubmit = (event) => {
    event.preventDefault();
    const isFormValid = this.validateForm();
    const { userName, password } = this.state;

    if (isFormValid) {
      let data = Object.values(formData).map((key) => {
        return key !== null;
      });

      if (!data.includes(false)) {
        const loginData = {
          userName: userName,
          password: password,
        };

        this.props.loginUser(loginData);
        this.setState({ isLoading: true });
      } else {
        this.setState({ isFormNotValid: true });
        NotificationManager.warning(Constants.FIELDS_REQUIRED);
      }
    }
  };

  render() {
    const { userName, password, isLoading, isFormNotValid } = this.state;
    return (
      <div className="p-xl-5 p-2 d-flex justify-content-center login-container-color login-background">
        <div className="card login-card">
          <div className="row  g-0">
            <div className="col-md-6 col-sm-12 mb-5">
              <div className="text-center mt-xl-4">
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
                    id="userName"
                    className="form-control"
                    name="userName"
                    value={userName}
                    onChange={this.onChange}
                  />
                  {formData.userName === null && isFormNotValid ? (
                    <span className="text-danger p-0 m-0">
                      <small>{Constants.USER_NAME_REQUIRED}</small>
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="px-5 mt-4">
                <div className="row m-0">
                  <label htmlFor="title" className="form-label p-0 m-0">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />
                  {formData.password === null && isFormNotValid ? (
                    <span className="text-danger p-0 m-0">
                      <small>{Constants.PASSWORD_REQUIRED}</small>
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-end px-5 mt-2">
                <a href="#" className="reset-password">
                  Reset my password
                </a>
              </div>
              <div className="d-flex justify-content-end px-5 mt-1 mb-5">
                {isLoading ? (
                  <Loader size={35} />
                ) : (
                  <button
                    className="btn btn-primary btn-no-shadow btn-rounded"
                    onClick={this.onLoginFormSubmit}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginData: state.userReducer.loginUser,
  loginUserError: state.userReducer.loginUserError,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (loginData) => {
    dispatch(loginUser(loginData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
