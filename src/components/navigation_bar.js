/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import schoolLogo from '../assets/school-logo.png';
import { getUserInfo } from '../actions/user_actions';

const Constant = {
  ROLE_TEACHER: 'TEACHER',
  ROLE_ADMIN: 'ADMIN',
  ROLE_STUDENT: 'STUDENT',
  LOGOUT_MESSAGE: 'You are successfully logout',
};

const initialState = {
  imageUrl: '',
  userName: '',
  userRole: '',
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getUser !== nextProps.getUser) {
      this.setState({
        imageUrl: nextProps.getUser && nextProps.getUser.imageUrl,
        userName: nextProps.getUser && nextProps.getUser.userName,
        userRole: nextProps.getUser && nextProps.getUser.role,
      });
    }
  };

  logoutUser = (event) => {
    if (event) {
      localStorage.removeItem('user_id');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');

      NotificationManager.success(Constant.LOGOUT_MESSAGE);
      window.location = '/login';
    }
  };

  render() {
    const { imageUrl, userRole } = this.state;

    return (
      <div>
        {localStorage.getItem('role') !== Constant.ROLE_STUDENT ? (
          <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fas fa-bars"></i>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <a className="navbar-brand mt-2 mt-lg-0" href="#">
                  <img
                    src={schoolLogo}
                    alt=""
                    loading="lazy"
                    width="30"
                    height="30"
                  />
                  {userRole && userRole === Constant.ROLE_TEACHER ? (
                    <span className="header-text">
                      REACH <small>teacher</small>
                    </span>
                  ) : null}
                  {userRole && userRole === Constant.ROLE_ADMIN ? (
                    <span className="header-text">
                      REACH <small>admin</small>
                    </span>
                  ) : null}
                  {userRole === '' ? <span>REACH College</span> : null}
                </a>

                {userRole === Constant.ROLE_TEACHER ? (
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/examination">
                        Examinations
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Answer Sheets
                      </a>
                    </li>
                  </ul>
                ) : null}

                {userRole === Constant.ROLE_ADMIN ? (
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/employee">
                        Employees
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/student/view">
                        Students
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/sport">
                        Sports
                      </NavLink>
                    </li>
                  </ul>
                ) : null}

                {userRole === Constant.ROLE_STUDENT ? (
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Examinations
                      </a>
                    </li>
                  </ul>
                ) : null}
              </div>

              <div className="d-flex align-items-center">
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={imageUrl}
                    className="rounded-circle"
                    height="40"
                    alt=""
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      My profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={this.logoutUser}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getUser: state.userReducer.getUserInfo,
  getUserError: state.userReducer.getUserInfoError,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => {
    dispatch(getUserInfo());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
