import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExaminationsForStudent } from '../../../actions/examination_actions';
import StudentExamHeader from './student_exam_header';

const initialState = {
  examinationData: [],
  studentData: '',
  questions: [],
  isExamStart: false,
};

const Role = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
};

class StudentExamPage extends Component {
  constructor(props) {
    super(props);
    this.setStartExamClick = this.setStartExamClick.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    const authToken = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (
      (localStorage.length > 0 && authToken && role === Role.STUDENT) ||
      role === Role.TEACHER
    ) {
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
      this.setState({
        examinationData: nextProps.examinationQuestions.exam,
        studentData: nextProps.examinationQuestions.student,
        questions: nextProps.examinationQuestions.questions,
      });
    }
  };

  setStartExamClick = (isExamStartClick) => {
    console.log(this.state.isExamStart);
    this.setState({ isExamStart: isExamStartClick }, () =>
      console.log(this.state.isExamStart)
    );
  };

  render() {
    const { studentData, examinationData, questions, isExamStart } = this.state;
    return (
      <div>
        {localStorage.getItem('role') === Role.STUDENT ? (
          <div className="d-block row">
            <StudentExamHeader
              student={studentData}
              exam={examinationData}
              questions={questions}
              getIsExamStartClick={this.setStartExamClick}
            />
          </div>
        ) : null}
        <div className="row">
          {isExamStart ? <h1>Exam start</h1> : <h1>Not start</h1>}
        </div>
      </div>
    );
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
