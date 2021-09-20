/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import {
  getAllStudents,
  getStudentById,
  setStudent,
  deleteStudent,
} from '../../../actions/student_actions';
import Student from '../add/student';
//import ImagePreviewer from '../../../components/image_previewer';
import UpdateStudent from '../update/update_student';
import Loader from '../../../components/loader';
import { NotificationManager } from 'react-notifications';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;
const initialState = {
  students: [],
  removeStudentId: '',
  isLoading: false,
};

const $ = window.$;

const rowStyle = (row, rowIndex) => {
  const style = {};
  style.fontSize = 16;
  style.fontWeight = 'normal';
  style.height = 2;
  style.padding = '10px';
  style.margin = '10px';
  return style;
};

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.setRemoveStudentId = this.setRemoveStudentId.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.getAllStudents();
    } else {
      window.location = '/login';
    }

    const studentId = this.props.studentId;
    if (studentId) {
      this.props.getStudentById(studentId);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getallstudents !== nextProps.getallstudents) {
      this.setState({ students: nextProps.getallstudents });
    }

    if (this.props.createstudent !== nextProps.createstudent) {
      this.props.getAllStudents();
    }
    if (this.props.updatestudent !== nextProps.updatestudent) {
      this.props.getStudentById();
    }

    if (this.props.getstudent !== nextProps.getstudent) {
      this.setState({ students: nextProps.getstudent.students });
    }

    if (this.props.deletestudent !== nextProps.deletestudent) {
      this.props.getAllStudents();
    }

    if (this.props.deletestudenterror !== nextProps.deletestudenterror) {
      if (
        nextProps.deletestudenterror &&
        nextProps.deletestudenterror.message
      ) {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error(nextProps.deletestudenterror.message);
        });
      } else {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error('Student Record Delete Fail');
        });
      }
    }
  };

  closeModal() {
    const { removeStudentId } = this.state;

    if (removeStudentId) {
      $(`#q${removeStudentId}`).modal('toggle');
      this.setState(initialState);
    }
  }

  setRemoveStudentId = (event, studentId) => {
    if (event) {
      this.setState({ removeStudentId: studentId });
      // console.log(studentId);
      // this.props.deleteStudent(studentId);
      // this.setState({ isLoading: false });
      // this.closeModal();
    }
  };

  removeStudent = (event) => {
    if (event) {
      event.preventDefault();
      const { removeStudentId } = this.state;

      if (removeStudentId) {
        console.log(removeStudentId);
        this.props.deleteStudent(removeStudentId);
        this.setState({ isLoading: false });
        this.closeModal();
      }
    }
  };

  tableColumData = [
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: (cell, row) => this.actionButtonFormatter(row),
      headerStyle: () => {
        return { width: '80px', fontSize: '9px' };
      },
      csvExport: false,
    },
    {
      dataField: 'username',
      text: 'ID',
      formatter: (cell) => this.setIdFormatter(cell),
      headerStyle: () => {
        return { width: '100px' };
      },
    },
    {
      dataField: 'firstname',
      text: 'Name',
      formatter: (cell, row) => this.setNameFormatter(cell, row),
      headerStyle: () => {
        return { width: '250px' };
      },
    },
    {
      dataField: 'grade',
      text: 'Grade',
      formatter: (cell) => this.setGradeFormatter(cell),
      headerStyle: () => {
        return { width: '110px' };
      },
    },
    {
      dataField: 'parent',
      text: 'Parent Name',
      formatter: (cell) => this.setParentFormatter(cell),
    },
    {
      dataField: 'email',
      text: 'Email',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: 'phone',
      text: 'Phone number',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: 'city',
      text: 'City',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
  ];

  setIdFormatter(cell) {
    return <p className="student-data text-dark">{cell}</p>;
  }

  setNameFormatter(cell, row) {
    return (
      <div className="d-flex">
        <img src={row.imageurl} className="user-img" alt="student" />
        &nbsp;
        <p className="m-0 student-data text-dark">
          {row.firstname}&nbsp;{row.lastname}
        </p>
      </div>
    );
  }

  onSelectStudentToUpdate = (event, username) => {
    const { students } = this.state;
    if (event && students && students.length > 0 && username) {
      const selectedstudent = students.find(
        (student) => student._id === username
      );
      this.props.setStudent(selectedstudent);
      this.setState({ selectedstudent: selectedstudent });
    }
  };

  actionButtonFormatter = (row) => {
    const { removeStudentId } = this.state;
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
            <a
              className="dropdown-item"
              href="#"
              data-mdb-toggle="modal"
              data-mdb-target="#update-student"
              onClick={(e) => this.onSelectStudentToUpdate(e, row._id)}
            >
              <i class="far fa-edit" /> Edit
            </a>

            <a
              className="dropdown-item"
              data-mdb-toggle="modal"
              data-mdb-target={`#q${removeStudentId}`}
              onClick={(event) => this.setRemoveStudentId(event, row._id)}
            >
              <i class="far fa-trash-alt" /> Delete
            </a>
          </div>
        </span>
      </span>
    );
  };

  setGradeFormatter = (cell) => {
    return <p className="student-data">GRADE {cell}</p>;
  };

  setParentFormatter = (cell) => {
    return <p className="student-data">{cell}</p>;
  };

  setFieldFormatter(cell) {
    return <p className="student-data text-dark">{cell}</p>;
  }

  setDateFormatter(cell) {
    return (
      <p className="student-data text-dark">{moment(cell).format('lll')}</p>
    );
  }

  expandRow = {
    showExpandColumn: true,
    renderer: (row) => (
      <div>
        <h6>Student Information</h6>
        {row ? (
          <div className="row">
            <div className="col-md-2 d-flex ">
              <div className="justify-content-center">
                <img src={row.imageurl} className="student-img" alt="student" />
              </div>
            </div>

            <div className="col-md-10 p-3">
              <h6 className="person-info m-0">
                {row.firstname}&nbsp;{row.lastname}
              </h6>
              <div className="mb-1">
                <p>
                  <i className="fas fa-at"></i>&nbsp;&nbsp;
                  Username:&nbsp;&nbsp;
                  {row.username}
                </p>
                <p>
                  <i className="fas fa-envelope"></i>&nbsp;&nbsp;
                  Acheievements:&nbsp;&nbsp;
                  {row.achievements}
                </p>
                <p>
                  <i className="fas fa-users"></i>&nbsp;&nbsp; Parent/Guardian
                  name:&nbsp;&nbsp;
                  {row.parent}
                </p>
                <p>
                  <i className="fas fa-envelope"></i>&nbsp;&nbsp; Email
                  Address:&nbsp;&nbsp;
                  {row.email}
                </p>
                <p>
                  <i className="fas fa-phone"></i>&nbsp;&nbsp;Telephone
                  Number:&nbsp;&nbsp;
                  {row.phone}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    ),
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <b style={{ cursor: 'pointer' }}></b>;
      }
      return <b style={{ cursor: 'pointer' }}></b>;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return (
          <div
            className="d-flex justify-content-center"
            style={{ cursor: 'pointer' }}
          >
            <i className="fas fa-chevron-circle-up fa-xs"></i>
          </div>
        );
      }
      return (
        <div
          className="d-flex justify-content-center"
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-chevron-circle-down fa-xs"></i>
        </div>
      );
    },
  };

  render() {
    const { students, selectedstudent, isLoading, removeStudentId } =
      this.state;
    return (
      <div className="p-4 admin-container-color">
        <div className="card p-3 container ">
          <div className="d-flex">
            <h3 className="users-title">Students Page</h3>
            <div className="align-right">
              <button
                className="btn btn-primary btn-rounded btn-no-shadow"
                data-mdb-toggle="modal"
                data-mdb-target="#create-student"
              >
                Create a new Student
              </button>
            </div>
          </div>
          <ToolkitProvider
            keyField="_id"
            data={students}
            columns={this.tableColumData}
            search
            exportCSV
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  placeholder="Search students by name"
                  className="mb-3"
                />
                <ExportCSVButton
                  {...props.csvProps}
                  className="btn-secondary btn-rounded btn-no-shadow mx-3 mb-3"
                >
                  DOWNLOAD STUDENT DATA
                </ExportCSVButton>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  bordered={true}
                  striped
                  hover
                  className="custom-table"
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                  expandRow={this.expandRow}
                  rowStyle={rowStyle}
                />
              </div>
            )}
          </ToolkitProvider>
          <Student />
          <UpdateStudent selectedstudent={selectedstudent} />
          <div
            className="modal fade"
            id={'q' + removeStudentId}
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
                    Remove Student
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Do you want to remove this student?</p>
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
                        onClick={this.removeStudent}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getstudent: state.studentReducer.getstudent,
  getstudenterror: state.studentReducer.getstudenterror,
  getallstudents: state.studentReducer.getallstudents,
  createstudent: state.studentReducer.createstudent,
  createstudenterror: state.studentReducer.createstudenterror,
  updatestudent: state.studentReducer.updatestudent,
  updatestudenterror: state.studentReducer.updatestudenterror,
  deletestudent: state.studentReducer.deletestudent,
  deletestudenterror: state.studentReducer.deletestudenterror,
});

const mapDispatchToProps = (dispatch) => ({
  getAllStudents: () => {
    dispatch(getAllStudents());
  },
  getStudentById: (studentId) => {
    dispatch(getStudentById(studentId));
  },
  setStudent: (studentData) => {
    dispatch(setStudent(studentData));
  },
  deleteStudent: (studentId) => {
    dispatch(deleteStudent(studentId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(StudentView);
