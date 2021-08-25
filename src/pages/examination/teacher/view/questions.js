import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../components/loader';
import {
  getQuestionsForExamination,
  deleteQuestion,
} from '../../../../actions/examination_actions';
import { NotificationManager } from 'react-notifications';
import './examination.scss';

const initialState = {
  questions: [],
  removeQuestionId: '',
  isLoading: false,
};

const Constants = {
  LEVEL_EASY: 'Easy',
  LEVEL_MEDIUM: 'Medium',
  LEVEL_HARD: 'Hard',
  REMOVE_SUCCESS: 'Question removed successfully',
  REMOVE_FAIL: 'Question remove fail',
};
const $ = window.$;

class Questions extends Component {
  constructor(props) {
    super(props);
    this.setRemoveQuestionId = this.setRemoveQuestionId.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    const examId = this.props.examId;

    if (examId) {
      this.props.getQuestionsForExamination(examId);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (
      this.props.getquestionsforexamination !==
      nextProps.getquestionsforexamination
    ) {
      this.setState({
        questions: nextProps.getquestionsforexamination.questions,
      });
    }

    if (this.props.addquestion !== nextProps.addquestion) {
      const examId = this.props.examId;

      if (examId) {
        this.props.getQuestionsForExamination(examId);
      }
    }

    if (this.props.deletequestion !== nextProps.deletequestion) {
      const examId = this.props.examId;

      if (examId) {
        this.props.getQuestionsForExamination(examId);
        this.setState({ isLoading: false }, () => {
          NotificationManager.success(Constants.REMOVE_SUCCESS);
          this.closeModal();
        });
      }
    }

    if (this.props.deletequestionerror !== nextProps.deletequestionerror) {
      if (
        nextProps.deletequestionerror &&
        nextProps.deletequestionerror.message
      ) {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error(nextProps.deletequestionerror.message);
        });
      } else {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error(Constants.REMOVE_FAIL);
        });
      }
    }
  };

  closeModal() {
    const { removeQuestionId } = this.state;

    if (removeQuestionId) {
      $(`#q${removeQuestionId}`).modal('toggle');
      this.setState(initialState);
    }
  }

  // remove question
  setRemoveQuestionId = (event, questionId) => {
    if (event) {
      this.setState({ removeQuestionId: questionId });
    }
  };

  removeQuestion = (event) => {
    if (event) {
      event.preventDefault();
      const { removeQuestionId } = this.state;

      if (removeQuestionId) {
        this.props.deleteQuestion(removeQuestionId);
        this.setState({ isLoading: true });
      }
    }
  };

  render() {
    const { questions, removeQuestionId, isLoading } = this.state;
    return (
      <div>
        <h5 className="m-0">Question Bank</h5>
        <small className="text-muted">
          <i>Click on the card to view the question details</i>
        </small>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => (
            <div className="accordion" id="questions-list" key={index}>
              <div className="accordion-item">
                <h2 className="accordion-header" id={question._id}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target={'#collapse' + index}
                    aria-expanded="true"
                    aria-controls={'collapse' + index}
                  >
                    Question No #{index + 1}
                    &nbsp;&nbsp;
                    {question.level === Constants.LEVEL_EASY ? (
                      <span className="badge rounded-pill bg-success">
                        EASY
                      </span>
                    ) : null}
                    {question.level === Constants.LEVEL_MEDIUM ? (
                      <span className="badge rounded-pill bg-warning text-dark">
                        MEDIUM
                      </span>
                    ) : null}
                    {question.level === Constants.LEVEL_HARD ? (
                      <span className="badge rounded-pill bg-danger">HARD</span>
                    ) : null}
                    &nbsp;&nbsp;
                    {question.isMCQQuestion === true ? (
                      <span className="badge rounded-pill bg-light text-dark">
                        MCQ
                      </span>
                    ) : (
                      <span className="badge rounded-pill bg-light text-dark">
                        WRITTEN
                      </span>
                    )}
                  </button>
                </h2>
                <div
                  id={'collapse' + index}
                  className="accordion-collapse collapse"
                  aria-labelledby={question._id}
                >
                  <div className="accordion-body">
                    <strong>Question {index + 1}</strong>
                    <p>{question.question}</p>
                    {question.options &&
                      question.options.map((option, index) => (
                        <p key={option._id}>
                          {index + 1}. {option.option}
                        </p>
                      ))}

                    {question.isMCQQuestion ? (
                      <p>
                        Correct Option :{' '}
                        <span className="badge rounded-pill bg-success text-dark question-badge">
                          {question.correctOption}
                        </span>
                      </p>
                    ) : null}
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger btn-no-shadow btn-rounded btn-sm"
                        data-mdb-toggle="modal"
                        data-mdb-target={`#q${removeQuestionId}`}
                        onClick={(event) =>
                          this.setRemoveQuestionId(event, question._id)
                        }
                      >
                        <i className="far fa-trash-alt"></i>&nbsp; Remove
                        Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div
          className="modal fade"
          id={'q' + removeQuestionId}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          data-mdb-backdrop="static"
          data-mdb-keyboard="false"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Remove Question
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Do you want to remove the question from the exam?</p>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                {isLoading ? (
                  <Loader size={50} />
                ) : (
                  <div>
                    <button
                      type="button"
                      className="btn btn-light btn-no-shadow btn-rounded"
                      data-mdb-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-no-shadow btn-rounded"
                      onClick={this.removeQuestion}
                    >
                      Remove
                    </button>
                  </div>
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
  getquestionsforexamination:
    state.examinationReducer.getquestionsforexamination,
  getquestionsforexaminationerror:
    state.examinationReducer.getquestionsforexaminationerror,
  addquestion: state.examinationReducer.createquestion,
  deletequestion: state.examinationReducer.deletequestion,
  deletequestionerror: state.examinationReducer.deletequestionerror,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsForExamination: (examId) => {
    dispatch(getQuestionsForExamination(examId));
  },
  deleteQuestion: (questionID) => {
    dispatch(deleteQuestion(questionID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
