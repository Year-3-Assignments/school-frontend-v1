/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExaminationsForTeacher } from '../../../../actions/examination_actions';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import CreateExam from '../add/create_new_exam';

const { SearchBar } = Search;

const Constants = {
  STATUS_PENDING: 'PENDING',
  STATUS_COMPLETE: 'COMPLETE',
};

class ExaminationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
    };
  }

  componentDidMount() {
    this.props.getExaminationsForTeacher();
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
  };

  // react bootstrap table data & functions
  tableColumnData = [
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: () => this.actionButtonFormatter(),
      headerStyle: () => {
        return { width: '100px' };
      },
    },
    {
      dataField: 'examId',
      text: 'Exam ID',
      headerStyle: () => {
        return { width: '110px' };
      },
    },
    { dataField: 'title', text: 'Exam Title' },
    { dataField: 'createdFor', text: 'Class' },
    { dataField: 'subject', text: 'Subject' },
    {
      dataField: 'startDateTime',
      text: 'Date & Time',
      formatter: (cell) => this.examDateTimeFormatter(cell),
    },
    { dataField: 'accessPassword', text: 'Access Code' },
    {
      dataField: 'status',
      text: 'Exam Status',
      formatter: (cell) => this.examStatusStyle(cell),
    },
    {
      dataField: 'createdBy',
      text: 'Created By',
      formatter: (cell) => this.examCreatedByFormatter(cell),
    },
  ];

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

  actionButtonFormatter = () => {
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
            <a className="dropdown-item" href="#">
              <i className="far fa-edit" /> Edit
            </a>

            <a className="dropdown-item" href="#">
              <i class="far fa-trash-alt" /> Delete
            </a>

            <a className="dropdown-item" href="#">
              <i className="far fa-eye" /> View
            </a>
          </div>
        </span>
      </span>
    );
  };

  examDateTimeFormatter = (cell) => {
    return moment(cell).format('llll');
  };

  examCreatedByFormatter = (cell) => {
    if (cell) {
      return `${cell.firstName} ${cell.lastName}`;
    }
  };

  render() {
    const { exams } = this.state;
    return (
      <div className="pt-5 pb-5">
        <div className="card p-4 exam-table">
          <div className="d-flex">
            <h3>Examination Page</h3>
            <div className="align-right">
              <button
                className="btn btn-primary btn-rounded btn-no-shadow"
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
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  placeholder="Search exams by Exam Title"
                  className="mb-3 search-bar"
                />
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  bordered={true}
                  striped={true}
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                  hover
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <CreateExam />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  examinations: state.examinationReducer.getexaminationsforteacher,
  createExam: state.examinationReducer.createexamination,
});

const mapDispatchToProps = (dispatch) => ({
  getExaminationsForTeacher: () => {
    dispatch(getExaminationsForTeacher());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExaminationPage);
