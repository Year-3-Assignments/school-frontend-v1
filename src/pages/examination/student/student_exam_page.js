import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExaminationsForStudent } from '../../../actions/examination_actions';

const initialState = {
  examinationData: [],
};

class StudentExamPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const authToken = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (localStorage.length > 0 && authToken && role) {
      this.props.getExaminationsForStudent(this.props.match.params.id);
    } else {
      const examId = this.props.match.params.examId;
      const accessPassword = this.props.match.params.accessPassword;
      const examDatabaseId = this.props.match.params.id;
      window.location =
        '/student/examination/' +
        examId +
        '/' +
        accessPassword +
        '/' +
        examDatabaseId +
        '/login';
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.examinationQuestions !== nextProps.examinationQuestions) {
      console.log('data', nextProps.examinationQuestions);
    }
  };

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  examinationQuestions: state.examinationReducer.getExaminationQuestions,
  examinationQuestionsError:
    state.examinationReducer.getExaminationQuestionsError,
});

const mapDispatchToProps = (dispatch) => ({
  getExaminationsForStudent: (examId) => {
    dispatch(getExaminationsForStudent(examId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentExamPage);
