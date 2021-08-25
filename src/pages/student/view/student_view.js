/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import { getAllStudents } from '../../../actions/student_actions';
import Student from '../add/student';

const { SearchBar } = Search;
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
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.getAllStudents();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getallstudents !== nextProps.getallstudents) {
      this.setState({ students: nextProps.getallstudents });
    }

    if (this.props.createstudent !== nextProps.createstudent) {
      this.props.getAllStudents();
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
            <a className="dropdown-item" href="#">
              <i class="far fa-edit" /> Edit
            </a>

            <a className="dropdown-item" href="#">
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
            data={this.state.students}
            columns={this.tableColumData}
            search
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  placeholder="Search students by name"
                  className="mb-3"
                />
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
        </div>
        <Student />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getallstudents: state.studentReducer.getallstudents,
  createstudent: state.studentReducer.createstudent,
  createstudenterror: state.studentReducer.createstudenterror,
});

const mapDispatchToProps = (dispatch) => ({
  getAllStudents: () => {
    dispatch(getAllStudents());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(StudentView);
