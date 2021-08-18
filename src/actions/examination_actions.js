import axios from 'axios';
import {
  CREATE_EXAMINATION,
  GET_EXAMINAITONS_FOR_TEACHER,
  UPDATE_EXAMINATION,
  DELETE_EXAMINATION,
  CREATE_QUESTION,
  GET_QUESTIONS_FOR_EXAMINATION,
  GET_QUESTIONS_FOR_TEACHER,
  GET_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from './index';

export function createExamination(examinationData) {
  return {
    type: CREATE_EXAMINATION,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/exam/add/`,
      examinationData,
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    ),
  };
}

export function getExaminationsForTeacher() {
  return {
    type: GET_EXAMINAITONS_FOR_TEACHER,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/exam/teacher/`, {
      headers: { Authorization: localStorage.getItem('token') },
    }),
  };
}

export function updateExamination(examinationData) {
  return {
    type: UPDATE_EXAMINATION,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/exam/update/${examinationData.id}`,
      examinationData,
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    ),
  };
}

export function deleteExamination(examinationData) {
  return {
    type: DELETE_EXAMINATION,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/exam/delete/${examinationData.id}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}

export function createQuestion(questionData) {
  return {
    type: CREATE_QUESTION,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/question/add/`,
      questionData,
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    ),
  };
}

export function getQuestionsForExamination(examinationId) {
  return {
    type: GET_QUESTIONS_FOR_EXAMINATION,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/question/exam/${examinationId}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}

export function getQuestionsForTeacher(examinationId) {
  return {
    type: GET_QUESTIONS_FOR_TEACHER,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/question/exam/teacher/${examinationId}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}

export function getQuestion(questionId) {
  return {
    type: GET_QUESTION,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/question/${questionId}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}

export function updateQuestion(questionId) {
  return {
    type: UPDATE_QUESTION,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/question/update/${questionId}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}

export function deleteQuestion(questionId) {
  return {
    type: DELETE_QUESTION,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/question/delete/${questionId}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}
