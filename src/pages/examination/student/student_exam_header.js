/* eslint-disable no-new-wrappers */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import schoolLogo from '../../../assets/school-logo.png';
import CountDown from 'react-countdown';

export default class StudentExamHeader extends Component {
  constructor(props) {
    super(props);
    this.setStartExam = this.setStartExam.bind(this);
    this.state = {
      duration: this.props.exam.duration,
      title: this.props.exam.title,
      createdFor: this.props.exam.createdFor,
      noOfQuestions: this.props.exam.numberOfQuestions,
      subject: this.props.exam.subject,
      startDateTime: this.props.exam.startDateTime,
      hours: new String(this.props.exam.duration).split('.')[0],
      minutes: new String(this.props.exam.duration).split('.')[1],
      remainingTime:
        this.props.exam.duration &&
        this.getRemainingTime(this.props.exam.duration),
      isExamStartButtonClick: false,
      studentName:
        this.props.student &&
        this.props.student.firstName + ' ' + this.props.student.lastName,
      studentId: this.props.student && this.props.student.userName,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps) {
      this.setState({
        duration: nextProps.exam.duration,
        title: nextProps.exam.title,
        createdFor: nextProps.exam.createdFor,
        noOfQuestions: nextProps.exam.numberOfQuestions,
        subject: nextProps.exam.subject,
        startDateTime: nextProps.exam.startDateTime,
        hours: new String(nextProps.exam.duration).split('.')[0],
        minutes: new String(nextProps.exam.duration).split('.')[1],
        remainingTime:
          nextProps.exam &&
          nextProps.exam.duration &&
          this.getRemainingTime(nextProps.exam.duration),
        studentName:
          nextProps.student &&
          nextProps.student.firstName + ' ' + nextProps.student.lastName,
        studentId: nextProps.student && nextProps.student.userName,
      });
    }
  };

  getRemainingTime(duration) {
    if (duration) {
      const minutes = new String(duration).split('.')[1];

      if (minutes && minutes === '3') {
        console.log(parseFloat(new String(duration).replace('3', '5')));
        return parseFloat(new String(duration).replace('3', '5'));
      }
    }
  }

  setStartExam = (event) => {
    if (event) {
      this.setState({ isExamStartButtonClick: true }, () => {
        this.props.getIsExamStartClick(this.state.isExamStartButtonClick);
      });
    }
  };

  render() {
    const {
      title,
      createdFor,
      noOfQuestions,
      subject,
      startDateTime,
      hours,
      minutes,
      remainingTime,
      isExamStartButtonClick,
      studentName,
      studentId,
    } = this.state;
    return (
      <div>
        <nav className="navbar sticky-top">
          <div className="student-exam-header-container">
            <div id="navbarSupportedContent">
              <a
                className="navbar-brand mt-2 mt-lg-0 d-flex justify-content-center text-dark"
                href="#"
              >
                <img
                  src={schoolLogo}
                  alt=""
                  loading="lazy"
                  width="70"
                  height="70"
                />
                <span className="exam-header-text">REACH Exam Portal</span>
              </a>
            </div>
            <div className="row exam-header-row">
              <div className="col-lg-6 col-sm-12">
                <h5>
                  {createdFor} - {title}
                </h5>
                <h6>Subject: {subject}</h6>
                <h6>Number of Questions: {noOfQuestions}</h6>
                <h6>Time: {new Date(startDateTime).toLocaleTimeString()}</h6>
                <h6>
                  Duration: {hours} Hour & {parseInt(minutes) * 10} Minutes
                </h6>
              </div>
              <div className="col-lg-6 col-sm-12 d-flex justify-content-end">
                <div className="d-block">
                  <h5>{studentName}</h5>
                  <h6>Student ID: {studentId}</h6>
                  {isExamStartButtonClick && (
                    <h6>
                      Remaining Time:{' '}
                      {remainingTime && (
                        <CountDown
                          date={Date.now() + remainingTime * 60 * 60 * 1000}
                        />
                      )}
                    </h6>
                  )}
                  <button
                    className="btn btn-no-shadow btn-rounded btn-primary"
                    onClick={(event) => this.setStartExam(event)}
                    disabled={isExamStartButtonClick}
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
