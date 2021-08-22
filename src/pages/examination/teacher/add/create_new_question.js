/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { createQuestion } from '../../../../actions/examination_actions';
import Loader from '../../../../components/loader';
import './custom_form.scss';
import { NotificationManager } from 'react-notifications';

const $ = window.$;
let formData = {};
let formData2 = {};

const levelOptions = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
];

const Constants = {
  FIELDS_REQUIRED: 'Please check the input details',
  QUESTION_REQUIRED: 'Question is required',
  LEVEL_REQUIRED: 'Level is required',
  CORRECT_ANSWER_REQUIRED: 'Correct answer is required',
  OPTION_REQUIRED: 'Option is required',
  QUESTION_CREATE_SUCCESS: 'Question added successfully',
  QUESTION_CREATE_FAIL: 'Question creation fail',
};

const initialState = {
  isLoading: false,
  isFormNotValid: false,
  question: '',
  isMCQQuestion: false,
  level: '',
  optionFields: [{ label: '', value: '' }],
  options: [{ option: '' }],
  isOptionEmpty: false,
  addedOptions: [],
  correctOption: '',
  numberOfOptions: 0,
};

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.onMCQCheckChange = this.onMCQCheckChange.bind(this);
    this.onClickButtonAdder = this.onClickButtonAdder.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onLevelSelect = this.onLevelSelect.bind(this);
    this.onCorrectOptionSelect = this.onCorrectOptionSelect.bind(this);
    this.onCreateQuestionSave = this.onCreateQuestionSave.bind(this);
    this.state = initialState;
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createquestion !== nextProps.createquestion) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.success(Constants.QUESTION_CREATE_SUCCESS);
        this.closeModal();
      });
    }

    if (this.props.createquestionerror !== nextProps.createquestionerror) {
      if (
        nextProps.createquestionerror &&
        nextProps.createquestionerror.message
      ) {
        this.setState({ isLoading: false }, () => {
          NotificationManager.success(Constants.QUESTION_CREATE_SUCCESS);
        });
      } else {
        this.setState({ isLoading: false }, () => {
          NotificationManager.success(Constants.QUESTION_CREATE_SUCCESS);
        });
      }
    }
  };

  closeModal() {
    $('#create-question').modal('toggle');
    this.setState(initialState);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLevelSelect = (event) => {
    if (event) {
      this.setState({ level: event.value });
    }
  };

  onMCQCheckChange = (event) => {
    if (event && event.target) {
      if (event.target.checked) {
        this.setState({ isMCQQuestion: true });
      } else {
        this.setState({ isMCQQuestion: false });
      }
    }
  };

  onClickButtonAdder(event) {
    event.preventDefault();
    this.setState({
      options: [{ option: '' }, ...this.state.options],
      optionFields: [{ label: '', value: '' }, ...this.state.optionFields],
    });
  }

  onClickFormGroupButton(index) {
    let optionFields = [...this.state.optionFields];
    let options = [...this.state.options];
    let addedOptions = [...this.state.addedOptions];
    options.splice(index, 1);
    addedOptions.splice(index, 1);
    optionFields.splice(index, 1);

    this.setState({ options, addedOptions, optionFields });
  }

  onChangeFormGroupInput(index, event) {
    let options = [...this.state.options];
    let optionFields = [...this.state.optionFields];
    options[index].option = event.target.value;
    optionFields[index].label = event.target.value;
    optionFields[index].value = event.target.value;
    this.setState({
      options: options,
      optionFields: optionFields,
      addedOptions: options,
    });
  }

  onCorrectOptionSelect = (event) => {
    if (event) {
      this.setState({ correctOption: event.value });
    }
  };

  // validation
  defaultValidation() {
    const { question, level } = this.state;

    const data = {
      question: question && question.trim().length > 0 ? question : null,
      level: level && level.trim().length > 0 ? level : null,
    };

    formData = Object.assign({}, data);
    return true;
  }

  optionValidation() {
    const { question, level, addedOptions, correctOption } = this.state;

    const data = {
      question: question && question.trim().length > 0 ? question : null,
      level: level && level.trim().length > 0 ? level : null,
      addedOptions:
        addedOptions && addedOptions.length > 0 ? addedOptions : null,
      correctOption:
        correctOption && correctOption.trim().length > 0 ? correctOption : null,
    };

    formData2 = Object.assign({}, data);
    return true;
  }

  // save question
  onCreateQuestionSave = (event) => {
    event.preventDefault();
    const isFormValid = this.defaultValidation();
    const isOptionsValid = this.optionValidation();
    const { isMCQQuestion, addedOptions, level, question, correctOption } =
      this.state;

    if (isMCQQuestion) {
      if (isOptionsValid) {
        let data = Object.values(formData2).map((key) => {
          return key !== null;
        });

        if (!data.includes(false)) {
          const questionData = {
            examId: this.props.examId,
            question: question,
            isMCQQuestion: isMCQQuestion,
            level: level,
            options: addedOptions,
            correctOption: correctOption,
          };

          this.props.createQuestion(questionData);
          this.setState({ isLoading: true });
        } else {
          this.setState({ isFormNotValid: true });
          NotificationManager.warning(Constants.FIELDS_REQUIRED);
        }
      }
    } else {
      if (isFormValid) {
        let data = Object.values(formData).map((key) => {
          return key !== null;
        });

        if (!data.includes(false)) {
          const questionData = {
            examId: this.props.examId,
            question: question,
            isMCQQuestion: isMCQQuestion,
            level: level,
          };

          this.props.createQuestion(questionData);
          this.setState({ isLoading: true });
        } else {
          this.setState({ isFormNotValid: true });
          NotificationManager.warning(Constants.FIELDS_REQUIRED);
        }
      }
    }
  };

  render() {
    const {
      question,
      isLoading,
      isMCQQuestion,
      isFormNotValid,
      correctOption,
      options,
      level,
      optionFields,
    } = this.state;
    const isFormGroupDeletionAllowed =
      this.state.options.length > 1 ? true : false;
    return (
      <div
        className="modal fade create-question-modal"
        id="create-question"
        tabIndex="-1"
        data-mdb-backdrop="static"
        data-mdb-keyboard="false"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ overflowY: 'auto' }}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Question</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.closeModal}
              />
            </div>

            <div className="modal-body">
              <div className="row m-0 mb-3">
                <label htmlFor="title" className="form-label p-0 m-0">
                  Question
                </label>
                <textarea
                  className="form-control"
                  id="textAreaExample"
                  rows={8}
                  name="question"
                  value={question}
                  onChange={this.onChange}
                ></textarea>
                {formData.question === null && isFormNotValid ? (
                  <span className="text-danger p-0 m-0">
                    <small>{Constants.QUESTION_REQUIRED}</small>
                  </span>
                ) : null}
              </div>
              <div className="d-flex mb-3">
                <label
                  className="form-check-label mr-4"
                  htmlFor="isMCQQuestion"
                >
                  <strong>MCQ Question</strong>
                  <span>
                    <small>
                      : Turn on the switch if you want to add MCQ options for
                      the question
                    </small>
                  </span>
                </label>
                <div className="form-check form-switch align-right">
                  <input
                    className="form-check-input align-right"
                    type="checkbox"
                    id="isMCQQuestion"
                    checked={isMCQQuestion}
                    onChange={this.onMCQCheckChange}
                  />
                </div>
              </div>
              <div className="row m-0 mb-3">
                <label htmlFor="grade" className="form-label p-0 m-0">
                  Level
                </label>
                <Select
                  styles="dynamicForm__itemInput"
                  options={levelOptions}
                  defaultValue={{ label: level, value: level }}
                  value={{ label: level, value: level }}
                  className="dynamicForm__itemInput p-0 m-0"
                  classNamePrefix="select"
                  id="select-grade"
                  onChange={this.onLevelSelect}
                />
                {formData.level === null && isFormNotValid ? (
                  <span className="text-danger p-0 m-0">
                    <small>{Constants.LEVEL_REQUIRED}</small>
                  </span>
                ) : null}
              </div>
              {isMCQQuestion ? (
                <div>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary btn-rounded align-right btn-no-shadow"
                      onClick={this.onClickButtonAdder}
                    >
                      Add Option
                    </button>
                  </div>
                  {options &&
                    options.map((item, index) => (
                      <div className="mb-3" key={index}>
                        <label htmlFor="examId" className="form-label p-0 m-0">
                          Option {index + 1}
                        </label>
                        <FormGroup
                          inputChange={this.onChangeFormGroupInput.bind(
                            this,
                            index
                          )}
                          buttonClick={this.onClickFormGroupButton.bind(
                            this,
                            index
                          )}
                          buttonDisabled={
                            index === 0
                              ? !isFormGroupDeletionAllowed
                              : undefined
                          }
                          value={item.option}
                          key={index}
                        />
                        {formData2.addedOptions === null &&
                        item &&
                        item.option === '' ? (
                          <span className="text-danger p-0 m-0">
                            <small>{Constants.OPTION_REQUIRED}</small>
                          </span>
                        ) : null}
                      </div>
                    ))}

                  {optionFields && optionFields.length > 0 ? (
                    <div>
                      <div className="row m-0 mb-2">
                        <label htmlFor="grade" className="form-label p-0 m-0">
                          Correct Option
                        </label>
                        <Select
                          options={optionFields}
                          defaultValue={{
                            label: correctOption,
                            value: correctOption,
                          }}
                          value={{ label: correctOption, value: correctOption }}
                          className="dynamicForm__itemInput p-0 m-0"
                          classNamePrefix="select"
                          id="select-grade"
                          onChange={this.onCorrectOptionSelect}
                        />
                        {formData2.correctOption === null && isFormNotValid ? (
                          <span className="text-danger p-0 m-0">
                            <small>{Constants.CORRECT_ANSWER_REQUIRED}</small>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
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
                    onClick={this.onCreateQuestionSave}
                  >
                    Add
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
  createquestion: state.examinationReducer.createquestion,
  createquestionerror: state.examinationReducer.createquestionerror,
});

const mapDispatchToProps = (dispatch) => ({
  createQuestion: (questionData) => {
    dispatch(createQuestion(questionData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);

function FormGroup(props) {
  return (
    <div className="dynamicForm__item">
      <input
        className="dynamicForm__itemInput form-control"
        type="text"
        value={props.value}
        onChange={props.inputChange}
      />
      <button
        className="dynamicForm__itemButton"
        type="button"
        onClick={props.buttonClick}
        disabled={props.buttonDisabled}
        tabIndex="-1"
      />
    </div>
  );
}
