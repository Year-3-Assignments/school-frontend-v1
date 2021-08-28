import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginBackground from '../../../assets/login-background.png';
import Loader from '../../../components/loader';
import { loginUser } from '../../../actions/user_actions';
import { NotificationManager } from 'react-notifications';

let formData = {};

const Constants = {
  ROLE_TEACHER: 'TEACHER',
  PASSWORD_REQUIRED: 'Password is required',
  STUDENT_ID_REQUIRED: 'Student ID is required',
  FIELDS_REQUIRED: 'Please check the input fields',
  LOGIN_SUCCESS: 'User login success',
  LOGIN_FAIL: 'Username or password is invalid',
  USER_NAME_REQUIRED: 'Username is required',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_NOT_MATCH: 'Password is not matched',
  ROLE_STUDENT: 'STUDENT',
};

const initialState = {
  examDatabaseId: '',
  examId: '',
  passCode: '',
  isLoading: false,
  isStartButtonDisabled: true,
  studentId: '',
  password: '',
  isFormNotValid: false,
  urlPrefix: '/student/examination',
};

class StudentExamLogin extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    this.setState(
      {
        examId: this.props.match.params.examId,
        passCode: this.props.match.params.accessPassword,
        examDatabaseId: this.props.match.params.id,
      },
      () => {
        if (localStorage.getItem('role') !== Constants.ROLE_TEACHER) {
          localStorage.clear();
        }
      }
    );
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.studentLoginData !== nextProps.studentLoginData) {
      this.setState({ isLoading: false }, () => {
        if (
          nextProps.studentLoginData &&
          nextProps.studentLoginData.data &&
          nextProps.studentLoginData.data === Constants.USER_NOT_FOUND
        ) {
          NotificationManager.warning(Constants.USER_NOT_FOUND);
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('role');
        } else if (
          nextProps.studentLoginData.data === Constants.PASSWORD_NOT_MATCH
        ) {
          NotificationManager.warning(Constants.PASSWORD_NOT_MATCH);
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('role');
        } else {
          if (
            nextProps.studentLoginData &&
            nextProps.studentLoginData.data &&
            nextProps.studentLoginData.data.responseData
          ) {
            localStorage.setItem(
              'userName',
              nextProps.studentLoginData.data.responseData.userName
            );
            localStorage.setItem(
              'token',
              nextProps.studentLoginData.data.responseData.token
            );
            localStorage.setItem(
              'user_id',
              nextProps.studentLoginData.data.responseData.user_id
            );
            localStorage.setItem(
              'role',
              nextProps.studentLoginData.data.responseData.role
            );

            if (localStorage.getItem('role') === Constants.ROLE_STUDENT) {
              const { urlPrefix, examDatabaseId, examId, passCode } =
                this.state;
              window.location =
                urlPrefix +
                '/' +
                examId +
                '/' +
                passCode +
                '/' +
                examDatabaseId;
              NotificationManager.success(Constants.LOGIN_SUCCESS);
            }
          }
        }
      });
    }

    if (this.props.studentLoginDataError !== nextProps.studentLoginDataError) {
      this.setState({ isLoading: false }, () => {
        if (
          nextProps.studentLoginDataError &&
          nextProps.studentLoginDataError.message
        ) {
          NotificationManager.error(nextProps.studentLoginDataError.message);
        }
      });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm() {
    const { studentId, password, examDatabaseId } = this.state;

    const data = {
      studentId: studentId && studentId.trim().length > 0 ? studentId : null,
      password: password && password.trim().length > 0 ? password : null,
    };

    formData = Object.assign({}, data);
    return true;
  }

  changeExamStartCheckBox = (event) => {
    if (event && event.target) {
      if (event.target.checked) {
        this.setState({
          isStartButtonDisabled: false,
        });
      } else {
        this.setState({
          isStartButtonDisabled: true,
        });
      }
    }
  };

  submitLoginData = (event) => {
    event.preventDefault();
    const isFormValid = this.validateForm();
    const { studentId, password } = this.state;

    if (isFormValid) {
      let data = Object.values(formData).map((key) => {
        return key !== null;
      });

      if (!data.includes(false)) {
        const loginData = {
          userName: studentId,
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
    const { isLoading, isStartButtonDisabled, isFormNotValid } = this.state;
    return (
      <div className="d-flex justify-content-center login-container-color login-background">
        <div className="card exam-login-card">
          <div className="row g-0">
            <div className="col-md-6 col-sm-12">
              <div className="text-center exam-login-container">
                <img
                  src={loginBackground}
                  alt="login"
                  className="exam-login-img"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="d-flex justify-content-left px-5 mt-5">
                {localStorage.getItem('role') === Constants.ROLE_TEACHER ? (
                  <h4 className="m-0">Exam Preview (Teacher)</h4>
                ) : (
                  <h4 className="m-0">Welcome to Exam Portal</h4>
                )}
              </div>
              {localStorage.getItem('role') === Constants.ROLE_TEACHER ? (
                <small className="px-5 text-muted">
                  As a teacher, you can preview the Examination.
                </small>
              ) : (
                <small className="px-5 text-muted">
                  Fill the necessary form fields. Exam ID and Pass Code is
                  given.
                </small>
              )}
              <div className="px-5 mt-3">
                <div className="row m-0">
                  <label htmlFor="title" className="form-label p-0 m-0">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="password"
                    className="form-control"
                    name="studentId"
                    onChange={this.onChange}
                  />
                  {formData.studentId === null && isFormNotValid ? (
                    <span className="text-danger p-0 m-0">
                      <small>{Constants.STUDENT_ID_REQUIRED}</small>
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="px-5 mt-3">
                <div className="row m-0">
                  <label htmlFor="title" className="form-label p-0 m-0">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChange}
                  />
                  {formData.password === null && isFormNotValid ? (
                    <span className="text-danger p-0 m-0">
                      <small>{Constants.PASSWORD_REQUIRED}</small>
                    </span>
                  ) : null}
                </div>
              </div>
              <ul className="mx-5 exam-rules mt-3">
                <li>
                  exams (examination methods and conduct) are full
                  responsibility of the lecturer concerned;
                </li>
                <li>
                  oral exams are considered to be the most effective and
                  efficient assessment method
                </li>
                <li>
                  online exams will take place via live streaming, and no
                  recording shall be made;
                </li>
              </ul>
              <div className="px-5 mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={this.changeExamStartCheckBox}
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    By clicking on this button I will agree to all the term and
                    conditions which provided by the examination.
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-end px-5 mt-3">
                {isLoading ? (
                  <Loader size={35} />
                ) : (
                  <button
                    className="btn btn-primary btn-no-shadow btn-rounded"
                    onClick={this.submitLoginData}
                    disabled={isStartButtonDisabled}
                  >
                    Start Exam
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
  studentLoginData: state.userReducer.loginUser,
  studentLoginDataError: state.userReducer.loginUserError,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (loginData) => {
    dispatch(loginUser(loginData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentExamLogin);
