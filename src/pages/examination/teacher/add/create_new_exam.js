import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../components/loader';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
import { createExamination } from '../../../../actions/examination_actions';

const $ = window.$;
let formData = {};
const gradeOptions = [
  { value: 'GRADE 1', label: 'GRADE 1' },
  { value: 'GRADE 2', label: 'GRADE 2' },
  { value: 'GRADE 3', label: 'GRADE 3' },
  { value: 'GRADE 4', label: 'GRADE 4' },
  { value: 'GRADE 5', label: 'GRADE 5' },
  { value: 'GRADE 6', label: 'GRADE 6' },
  { value: 'GRADE 7', label: 'GRADE 7' },
  { value: 'GRADE 8', label: 'GRADE 8' },
  { value: 'GRADE 9', label: 'GRADE 9' },
  { value: 'GRADE 10', label: 'GRADE 10' },
  { value: 'GRADE 11', label: 'GRADE 11' },
  { value: 'GRADE 12', label: 'GRADE 12' },
  { value: 'GRADE 13', label: 'GRADE 13' },
];

const durationOptions = [
  { value: '30 Minutes', label: '30 Minutes' },
  { value: '1 Hours', label: '1 Hours' },
  { value: '1 Hour & 30 Minutes', label: '1 Hour & 30 Minutes' },
  { value: '2 Hours', label: '2 Hours' },
  { value: '2 Hours & 30 Minutes', label: '2 Hours & 30 Minutes' },
  { value: '3 Hours', label: '3 Hours' },
  { value: '3 Hours & 30 Minutes', label: '3 Hours & 30 Minutes' },
  { value: '4 Hours', label: '4 Hours' },
];

const questionOptions = [
  { value: '10 Questions', label: '10 Questions' },
  { value: '20 Questions', label: '20 Questions' },
  { value: '30 Questions', label: '30 Questions' },
  { value: '40 Questions', label: '40 Questions' },
  { value: '50 Questions', label: '50 Questions' },
];

const subjectOptions = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Science', label: 'Science' },
  { value: 'History', label: 'History' },
  { value: 'Music', label: 'Music' },
  { value: 'Art', label: 'Art' },
  { value: 'Sinhala', label: 'Sinhala' },
  { value: 'P.T.S', label: 'P.T.S' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Combine Mathematics', label: 'Combine Mathematics' },
  { value: 'Applied Mathematics', label: 'Applied Mathematics' },
];

const Constants = {
  FIELDS_REQUIRED: 'Please check the input details',
  TITLE_REQUIRED: 'Exam title is required',
  GRADE_REQUIRED: 'Grade is required',
  DURATION_REQUIRED: 'Exam duration is required',
  NUMBER_OF_QUESTIONS_REQUIRED: 'Number of questions are required',
  EXAM_ID_REQUIRED: 'Exam id is required',
  ACCESS_PASSWORD_REQUIRED: 'Access password is required',
  START_DATE_TIME_REQUIRED: 'Start date & time is required',
  SUBJECT_REQUIRED: 'Subject is required',
  CREATE_EXAM_SUCCESS: 'Exam created successfully',
  CREATE_EXAM_FAIL: 'Exam creation unsuccessful',
  STATUS_PENDING: 'PENDING',
};

const initialState = {
  isLoading: false,
  isFormNotValid: false,
  examId: '',
  subject: '',
  title: '',
  duration: '',
  grade: '',
  numberOfQuestions: '',
  accessPassword: '',
  startDateTime: '',
};

class CreateExam extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onGradeSelect = this.onGradeSelect.bind(this);
    this.generateExamCredentials = this.generateExamCredentials.bind(this);
    this.onDurationSelect = this.onDurationSelect.bind(this);
    this.onNumberOfQuestionsSelect = this.onNumberOfQuestionsSelect.bind(this);
    this.onSubjectSelect = this.onSubjectSelect.bind(this);
    this.state = initialState;
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createexamination !== nextProps.createexamination) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.success(Constants.CREATE_EXAM_SUCCESS);
        this.closeModal();
      });
    }

    if (
      this.props.createexaminationerror !== nextProps.createexaminationerror
    ) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.error(nextProps.createexaminationerror.message);
      });
    }
  };

  // functions for get form data to state variables
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onGradeSelect = (event) => {
    if (event) {
      this.setState({ grade: event.value });
    }
  };

  onDurationSelect = (event) => {
    if (event) {
      this.setState({ duration: event.value });
    }
  };

  onNumberOfQuestionsSelect = (event) => {
    if (event) {
      this.setState({ numberOfQuestions: event.value });
    }
  };

  onSubjectSelect = (event) => {
    this.setState({ subject: event.value });
  };

  onTimeChange(time) {
    this.setState({ startDateTime: time });
  }

  // validation
  validateForm() {
    const {
      title,
      grade,
      duration,
      numberOfQuestions,
      startDateTime,
      examId,
      accessPassword,
      subject,
    } = this.state;

    const data = {
      title: title && title.trim().length > 0 ? title : null,
      grade: grade && grade.trim().length > 0 ? grade : null,
      duration: duration && duration.trim().length > 0 ? duration : null,
      numberOfQuestions:
        numberOfQuestions && numberOfQuestions.trim().length > 0
          ? numberOfQuestions
          : null,
      startDateTime:
        startDateTime && startDateTime.toString().trim().length > 0
          ? startDateTime
          : null,
      examId: examId && examId.trim().length > 0 ? examId : null,
      accessPassword:
        accessPassword && accessPassword.trim().length > 0
          ? accessPassword
          : null,
      subject: subject && subject.trim().length > 0 ? subject : null,
    };

    formData = Object.assign({}, data);
    return true;
  }

  // submit examination details
  onCreateExamSubmit = (event) => {
    event.preventDefault();
    const isFormValid = this.validateForm();
    const {
      title,
      grade,
      duration,
      numberOfQuestions,
      startDateTime,
      examId,
      subject,
      accessPassword,
    } = this.state;

    if (isFormValid) {
      let data = Object.values(formData).map((key) => {
        return key !== null;
      });

      if (!data.includes(false)) {
        const numOfQuestions = parseInt(numberOfQuestions.split(' ')[0]);
        const examDuration = duration.split(' ');
        let newDuration;

        if (examDuration && examDuration.length <= 2) {
          newDuration = parseFloat(examDuration[0]);
        } else {
          const hours = examDuration[0];
          const minutes = examDuration[3];
          newDuration = parseFloat(hours + '.' + minutes);
        }

        const examData = {
          examId: examId,
          title: title,
          createdFor: grade,
          duration: newDuration,
          subject: subject,
          numberOfQuestions: numOfQuestions,
          accessPassword: accessPassword,
          startDateTime: startDateTime,
          status: Constants.STATUS_PENDING,
        };

        console.log('DATA TO SEND', examData);
        this.props.createExamination(examData);
        this.setState({ isLoading: true });
      } else {
        this.setState({ isFormNotValid: true });
        NotificationManager.warning(Constants.FIELDS_REQUIRED);
      }
    }
  };

  // close create exam modal
  closeModal() {
    $('#create-exam').modal('toggle');
    $('#select-grade').val('');
    this.setState(initialState);
  }

  // generate examination credentials
  generateExamCredentials = (event) => {
    if (event) {
      const { grade } = this.state;

      if (grade) {
        const uniqueId = uuidv4().substring(0, 4);
        const classId = 'G' + grade.split(' ')[1];
        const accessPassword = uuidv4().substring(0, 8);
        console.log('adfaf', uniqueId + classId);
        if (uniqueId && classId) {
          const examId = uniqueId + classId;
          this.setState({ examId: examId, accessPassword: accessPassword });
        }
      }
    }
  };

  render() {
    const {
      isLoading,
      isFormNotValid,
      title,
      grade,
      examId,
      accessPassword,
      startDateTime,
    } = this.state;
    return (
      <div
        className="modal fade"
        id="create-exam"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New Examination</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.closeModal}
              />
            </div>

            <div className="modal-body">
              <div className="row m-0 mb-2">
                <label htmlFor="title" className="form-label p-0 m-0">
                  Examination Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                />
                {formData.title === null && isFormNotValid ? (
                  <span className="text-danger p-0 m-0">
                    <small>{Constants.TITLE_REQUIRED}</small>
                  </span>
                ) : null}
              </div>
              <div className="row m-0 mb-2">
                <label htmlFor="grade" className="form-label p-0 m-0">
                  Grade
                </label>
                <Select
                  options={gradeOptions}
                  className="basic-single p-0 m-0"
                  classNamePrefix="select"
                  id="select-grade"
                  onChange={this.onGradeSelect}
                />
                {formData.grade === null && isFormNotValid ? (
                  <span className="text-danger p-0 m-0">
                    <small>{Constants.GRADE_REQUIRED}</small>
                  </span>
                ) : null}
              </div>
              <div className="row m-0 mb-2">
                <label htmlFor="grade" className="form-label p-0 m-0">
                  Subject
                </label>
                <Select
                  options={subjectOptions}
                  className="basic-single p-0 m-0"
                  classNamePrefix="select"
                  id="select-grade"
                  onChange={this.onSubjectSelect}
                />
                {formData.subject === null && isFormNotValid ? (
                  <span className="text-danger p-0 m-0">
                    <small>{Constants.SUBJECT_REQUIRED}</small>
                  </span>
                ) : null}
              </div>
              <div className="row">
                <div className="col">
                  <div className="row m-0 mb-2">
                    <label htmlFor="duration" className="form-label p-0 m-0">
                      Exam Duration
                    </label>
                    <Select
                      options={durationOptions}
                      className="basic-single p-0 m-0"
                      classNamePrefix="select"
                      onChange={this.onDurationSelect}
                    />
                    {formData.duration === null && isFormNotValid ? (
                      <span className="text-danger p-0 m-0">
                        <small>{Constants.DURATION_REQUIRED}</small>
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <div className="row m-0 mb-2">
                    <label
                      htmlFor="numberOfQuestions"
                      className="form-label p-0 m-0"
                    >
                      Number of Questions
                    </label>
                    <Select
                      options={questionOptions}
                      className="basic-single p-0 m-0"
                      classNamePrefix="select"
                      onChange={this.onNumberOfQuestionsSelect}
                    />
                    {formData.numberOfQuestions === null && isFormNotValid ? (
                      <span className="text-danger p-0 m-0">
                        <small>{Constants.NUMBER_OF_QUESTIONS_REQUIRED}</small>
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="input-group m-0 mb-2">
                <label
                  htmlFor="numberOfQuestions"
                  className="form-label p-0 m-0"
                >
                  Exam Date & Time
                </label>
                &nbsp;
                <span>
                  <i className="far fa-calendar-alt"></i>
                </span>
                <DatePicker
                  className="form-control"
                  value={startDateTime}
                  onChange={this.onTimeChange}
                  dateFormat="MM/dd/yyyy h:mm aa"
                  selected={startDateTime}
                  showTimeInput
                />
                {formData.startDateTime === null && isFormNotValid ? (
                  <span className="text-danger p-0 m-0">
                    <small>{Constants.START_DATE_TIME_REQUIRED}</small>
                  </span>
                ) : null}
              </div>
              <i className="fas fa-info-circle" />
              <small className="exam-message">
                After filling Examination Title, Grade, Exam Duration, Number of
                Questions and Exam Date & Time click on the{' '}
                <b>Generate Exam Credentials</b> button below
              </small>
              <hr />
              <div className="d-flex">
                <h6 className="pt-1">Exam Credentials</h6>
                <button
                  className="btn btn-primary btn-rounded btn-no-shadow btn-custom-sm align-right"
                  data-mdb-toggle="tooltip"
                  data-mdb-placement="top"
                  title="Click here to generate Exam ID and Access Password"
                  disabled={grade === '' || startDateTime === ''}
                  onClick={this.generateExamCredentials}
                >
                  Generate exam Credentials
                </button>
              </div>

              <div className="row">
                <div className="col">
                  <div className="row m-0 mb-2">
                    <label htmlFor="examId" className="form-label p-0 m-0">
                      Exam ID
                    </label>
                    <input
                      type="text"
                      id="examId"
                      className="form-control"
                      name="examId"
                      value={examId}
                      disabled
                    />
                    {formData.examId === null && isFormNotValid ? (
                      <span className="text-danger p-0 m-0">
                        <small>{Constants.EXAM_ID_REQUIRED}</small>
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <div className="row m-0 mb-2">
                    <label
                      htmlFor="accessPassword"
                      className="form-label p-0 m-0"
                    >
                      Access Password
                    </label>
                    <input
                      type="text"
                      id="accessPassword"
                      className="form-control"
                      name="accessPassword"
                      value={accessPassword}
                      disabled
                    />
                    {formData.accessPassword === null && isFormNotValid ? (
                      <span className="text-danger p-0 m-0">
                        <small>{Constants.ACCESS_PASSWORD_REQUIRED}</small>
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-center">
              {isLoading ? (
                <Loader size={50} />
              ) : (
                <div>
                  <button
                    className="btn btn-secondary btn-no-shadow btn-rounded"
                    onClick={this.closeModal}
                  >
                    Close
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-primary btn-no-shadow btn-rounded"
                    onClick={this.onCreateExamSubmit}
                  >
                    Create
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  createexamination: state.examinationReducer.createexamination,
  createexaminationerror: state.examinationReducer.createexaminationerror,
});

const mapDispatchToProps = (dispatch) => ({
  createExamination: (examData) => {
    dispatch(createExamination(examData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateExam);
