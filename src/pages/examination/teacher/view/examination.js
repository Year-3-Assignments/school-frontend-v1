import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExaminationsForTeacher } from '../../../../actions/examination_actions';
import moment from 'moment';
import CreateQuestion from '../add/create_new_question';
import Questions from './questions';

const initialState = {
  examId: '',
  selectedExam: '',
};

class Examination extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.getExaminationsForTeacher();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.exams) {
      const examId = this.props.match.params.id;
      const exams = nextProps.exams.exams;

      if (exams && exams.length > 0) {
        const selectedExam = exams.find((exam) => {
          return exam._id === examId;
        });
        this.setState({ selectedExam: selectedExam });
      }
    }
  };

  render() {
    const { selectedExam, examId } = this.state;

    return (
      <div className="pt-5 pb-5">
        <div className="card p-4 exam-page">
          <div className="d-flex">
            <h4>
              {selectedExam && selectedExam.title} :{' '}
              {selectedExam && selectedExam.createdFor}
            </h4>
            <div className="align-right">
              <button
                className="btn btn-primary btn-rounded btn-no-shadow"
                data-mdb-toggle="modal"
                data-mdb-target="#create-question"
              >
                Add new question
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="card p-3 mb-3">
                <h5>Exam Information</h5>
                <span>
                  <i className="fas fa-stream"></i> Title :{' '}
                  {selectedExam && selectedExam.title}
                </span>
                <span>
                  <i className="fas fa-graduation-cap"></i> Class Group :{' '}
                  {selectedExam && selectedExam.createdFor}
                </span>
                <span>
                  <i className="fas fa-calendar"></i> Date & Time :{' '}
                  {selectedExam &&
                    moment(selectedExam.startDateTime).format('lll')}
                </span>
                <span>
                  <i className="fas fa-flask"></i> Subject :{' '}
                  {selectedExam && selectedExam.subject}
                </span>
                <span>
                  <i className="fas fa-sort-numeric-down-alt"></i> Questions :{' '}
                  {selectedExam && selectedExam.numberOfQuestions}
                </span>
                <span>
                  <i className="fas fa-clock"></i> Duration :{' '}
                  {selectedExam &&
                    selectedExam.duration &&
                    selectedExam.duration.toString().split('.')[0]}{' '}
                  Hour
                  {selectedExam &&
                  selectedExam.duration &&
                  selectedExam.duration.toString().split('.')[1] !== undefined
                    ? ` ${
                        selectedExam.duration.toString().split('.')[1]
                      }0 Minutes`
                    : null}
                </span>
                <span>
                  <i className="fas fa-passport"></i> Exam ID :{' '}
                  {selectedExam && selectedExam.examId}
                </span>
                <span>
                  <i className="fas fa-key"></i> Access Code :{' '}
                  {selectedExam && selectedExam.accessPassword}
                </span>
                <span>
                  <i className="fas fa-flag"></i> Status :{' '}
                  {selectedExam && selectedExam.status}
                </span>
                <hr />
                <h5>Creator Details</h5>
                <div className="row">
                  <div className="col-3">
                    <img
                      src={
                        selectedExam &&
                        selectedExam.createdBy &&
                        selectedExam.createdBy.imageurl
                      }
                      className="card-img-top creator-img"
                      alt="creator"
                    />
                  </div>
                  <div className="col-6">
                    <p className="m-0">
                      <i className="far fa-user mr-2"></i>{' '}
                      {selectedExam && selectedExam.createdBy.firstName}{' '}
                      {selectedExam && selectedExam.createdBy.lastName}
                    </p>
                    <p className="m-0">
                      <i className="far fa-envelope-open mr-2"></i>{' '}
                      {selectedExam && selectedExam.createdBy.email}
                    </p>
                    <p className="m-0">
                      <i className="fas fa-phone-alt"></i>{' '}
                      {selectedExam && selectedExam.createdBy.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7">
              <Questions examId={this.props.match.params.id} />
            </div>
          </div>
        </div>
        <CreateQuestion examId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  createquestion: state.examinationReducer.createquestion,
  exams: state.examinationReducer.getexaminationsforteacher,
});

const mapDispatchToProps = (dispatch) => ({
  getExaminationsForTeacher: () => {
    dispatch(getExaminationsForTeacher());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Examination);
