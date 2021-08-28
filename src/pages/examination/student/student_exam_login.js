import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginBackground from '../../../assets/login-background.png';
import Loader from '../../../components/loader';

const $ = window.$;
let formData = {};

const Constants = {
  ROLE_TEACHER: 'TEACHER',
};

const initialState = {
  examDatabaseId: '',
  examId: '',
  passCode: '',
  isLoading: false,
  isStartButtonDisabled: true,
  studentId: '',
  password: '',
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm() {
    const { studentId, password, examDatabaseId } = this.state;

    const data = {
      studentId: studentId && studentId.trim().length > 0 ? studentId : null,
      password: password && password.trim().length > 0 ? password : null,
      id:
        examDatabaseId && examDatabaseId.trim().length > 0
          ? examDatabaseId
          : null,
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

  render() {
    const { examId, passCode, isLoading, isStartButtonDisabled } = this.state;
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
              <div className="px-5 ">
                <div className="row m-0 mb-1 mt-3">
                  <label htmlFor="title" className="form-label p-0 m-0">
                    Exam ID
                  </label>
                  <input
                    type="text"
                    id="userName"
                    className="form-control"
                    name="userName"
                    value={examId}
                    disabled
                  />
                </div>
              </div>
              <div className="px-5 mt-3">
                <div className="row m-0">
                  <label htmlFor="title" className="form-label p-0 m-0">
                    Pass Code
                  </label>
                  <input
                    type="text"
                    id="password"
                    className="form-control"
                    name="password"
                    value={passCode}
                    disabled
                  />
                </div>
              </div>
              <div className="px-5 mt-3">
                <div className="row m-0">
                  <label htmlFor="title" className="form-label p-0 m-0">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChange}
                  />
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
                </div>
              </div>
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
                    onClick={this.onLoginFormSubmit}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StudentExamLogin);
