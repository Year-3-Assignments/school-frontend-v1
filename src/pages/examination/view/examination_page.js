/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getExaminationsForTeacher,
  setExam,
} from '../../../actions/examination_actions';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import CreateExam from '../add/create_new_exam';
import UpdateExam from '../update/update_exam';
import axios from 'axios';
import download from 'downloadjs';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const rowStyle = (row, rowIndex) => {
  const style = {};
  style.fontSize = 12.3;
  style.height = 2;
  style.padding = '0px';
  style.margin = '0px';
  return style;
};

const options = {
  paginationSize: 4,
  pageStartIndex: 1,
  sizePerPage: 12,
};

const Constants = {
  STATUS_PENDING: 'PENDING',
  STATUS_COMPLETE: 'COMPLETE',
};

class ExaminationPage extends Component {
  constructor(props) {
    super(props);
    this.onSelectExamToUpdate = this.onSelectExamToUpdate.bind(this);
    this.state = {
      exams: [],
      selectedExam: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.getExaminationsForTeacher();
    } else {
      window.location = '/login';
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.examinations !== nextProps.examinations) {
      this.setState({
        exams: nextProps.examinations && nextProps.examinations.exams,
      });
    }

    if (this.props.createExam !== nextProps.createExam) {
      this.props.getExaminationsForTeacher();
    }

    if (this.props.updateExam !== nextProps.updateExam) {
      this.props.getExaminationsForTeacher();
    }
  };

  // react bootstrap table data & functions
  tableColumnData = [
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: (cell, row) => this.actionButtonFormatter(row),
      headerClasses: (column, colIndex) => {
        return 'action-column';
      },
      csvExport: false,
    },
    {
      dataField: 'examId',
      text: 'Exam ID',
      headerStyle: () => {
        return { width: '110px' };
      },
    },
    {
      dataField: 'title',
      text: 'Exam Title',
      headerStyle: () => {
        return { width: '170px' };
      },
    },
    {
      dataField: 'createdFor',
      text: 'Class',
      headerStyle: () => {
        return { width: '110px' };
      },
    },
    {
      dataField: 'subject',
      text: 'Subject',
      headerStyle: () => {
        return { width: '110px' };
      },
    },
    {
      dataField: 'startDateTime',
      text: 'Date & Time',
      formatter: (cell) => this.examDateTimeFormatter(cell),
      headerStyle: () => {
        return { width: '180px' };
      },
    },
    {
      dataField: 'accessPassword',
      text: 'Code',
      headerStyle: () => {
        return { width: '110px' };
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: (cell) => this.examStatusStyle(cell),
      headerStyle: () => {
        return { width: '110px' };
      },
    },
    {
      dataField: 'numberOfQuestions',
      text: 'Questions',
      headerStyle: () => {
        return { width: '120px' };
      },
    },
    {
      dataField: 'download',
      text: 'Download',
      formatter: (cell, row) => this.examPaperDownLoadFormatter(cell, row),
      csvExport: false,
    },
  ];

  examPaperDownLoadFormatter = (cell, row) => {
    return (
      <button
        className="btn btn-rounded btn-no-shadow btn-info btn-sm"
        onClick={(event) => this.sendGeneratePDFData(event, row)}
      >
        <span>
          <i class="fas fa-cloud-download-alt"></i> Download
        </span>
      </button>
    );
  };

  sendGeneratePDFData = (event, row) => {
    if (event && row) {
      const paperName = row.title + '-' + row.createdFor + '.pdf';
      const examinationData = {
        examId: row._id,
      };
      axios
        .post(`${process.env.REACT_APP_API_DEV_URL}/get-pdf`, examinationData, {
          responseType: 'blob',
        })
        .then((response) => {
          const content = response.headers['content-type'];
          download(response.data, paperName, content);
        })
        .catch((error) => console.log(error));
    }
  };

  examStatusStyle = (cell) => {
    if (cell && cell === Constants.STATUS_PENDING) {
      return (
        <span className="badge rounded-pill bg-warning text-dark">
          {Constants.STATUS_PENDING}
        </span>
      );
    } else if (cell === Constants.STATUS_COMPLETE) {
      return (
        <span className="badge rounded-pill bg-success">
          {Constants.STATUS_COMPLETE}
        </span>
      );
    }
  };

  onSelectExamToUpdate = (event, examId) => {
    const { exams } = this.state;
    if (event && exams && exams.length > 0 && examId) {
      const selectedExam = exams.find((exam) => exam._id === examId);
      this.props.setExam(selectedExam);
      this.setState({ selectedExam: selectedExam });
    }
  };

  actionButtonFormatter = (row) => {
    return (
      <span className="dropdown show">
        <span className="dropdown">
          <a
            href="#"
            className="btn btn-no-shadow m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill btn-sm btn-rounded"
            data-mdb-toggle="dropdown"
          >
            <i className="fas fa-ellipsis-h"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to={`/examination/${row._id}`}>
              <i className="far fa-eye" /> View
            </Link>
            <a
              className="dropdown-item"
              href="#"
              data-mdb-toggle="modal"
              data-mdb-target="#update-exam"
              onClick={(e) => this.onSelectExamToUpdate(e, row._id)}
            >
              <i className="far fa-edit" /> Edit
            </a>
            <a className="dropdown-item" href="#">
              <i className="far fa-trash-alt" /> Delete
            </a>
          </div>
        </span>
      </span>
    );
  };

  examDateTimeFormatter = (cell) => {
    return moment(cell).format('lll');
  };

  render() {
    const { exams, selectedExam } = this.state;
    return (
      <div className="pt-5 pb-5 admin-container-color">
        <div className="card p-4 exam-table container">
          <div className="d-flex mb-4">
            <h4 className="teacher-exam-header">Teacher Exam Portal</h4>
            <div className="align-right">
              <button
                className="btn btn-primary btn-rounded"
                data-mdb-toggle="modal"
                data-mdb-target="#create-exam"
              >
                Create new exam
              </button>
            </div>
          </div>
          <ToolkitProvider
            keyField="_id"
            data={exams}
            columns={this.tableColumnData}
            search
            exportCSV
          >
            {(props) => (
              <div>
                <div className="d-flex">
                  <SearchBar
                    {...props.searchProps}
                    placeholder="Search exams by Exam Title"
                    className="mb-3 search-bar"
                  />
                  <ExportCSVButton
                    {...props.csvProps}
                    className="btn-secondary btn-rounded btn-no-shadow mx-3 mb-3"
                  >
                    DOWNLOAD EXAM DATA
                  </ExportCSVButton>
                </div>
                <BootstrapTable
                  keyField="id"
                  {...props.baseProps}
                  pagination={paginationFactory(options)}
                  bordered={true}
                  striped={true}
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                  rowStyle={rowStyle}
                  hover
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <CreateExam />
        <UpdateExam selectedExam={selectedExam} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  examinations: state.examinationReducer.getexaminationsforteacher,
  createExam: state.examinationReducer.createexamination,
  updateExam: state.examinationReducer.updateexamination,
  updateExamError: state.examinationReducer.updateexaminationerror,
});

const mapDispatchToProps = (dispatch) => ({
  getExaminationsForTeacher: () => {
    dispatch(getExaminationsForTeacher());
  },
  setExam: (examData) => {
    dispatch(setExam(examData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExaminationPage);
