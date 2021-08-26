import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import {
  createEmployee,
  getEmployeeList,
} from '../../../actions/employeeAction';
import CreateEmployee from '../add/create_new_employee';

const { SearchBar } = Search;
const initialState = {
  employees: [],
};

class EmployeePage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    console.log('data');
    this.props.getEmployeeList();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.employees !== nextProps.employees) {
      this.setState({ employees: nextProps.employees }, () => {
        console.log('employee list', this.state.employees);
      });
    }
  };

  tableColumData = [
    {
      dataField: 'userName',
      text: 'Username',
      formatter: (cell) => this.setFieldFormatter(cell),
      headerStyle: () => {
        return { width: '150px' };
      },
    },
    {
      dataField: 'firstName',
      text: 'Name',
      formatter: (cell, row) => this.setNameFormatter(cell, row),
    },
    {
      dataField: 'email',
      text: 'Email',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: 'phoneNumber',
      text: 'Mobile Number',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
  ];

  setIdFormatter(cell) {
    return (
      <p className="badge user-badge rounded-pill bg-warning text-dark">
        {cell}
      </p>
    );
  }

  setNameFormatter(cell, row) {
    return (
      <div>
        <img src={row.imageurl} className="user-img" alt="employee" />
        &nbsp;&nbsp;
        <p className="m-0 badge user-badge rounded-pill bg-custom-light text-dark">
          {row.firstName}&nbsp;{row.lastName}
        </p>
      </div>
    );
  }

  setFieldFormatter(cell) {
    return (
      <p className="badge user-badge rounded-pill bg-custom-light text-dark">
        {cell}
      </p>
    );
  }

  setDateFormatter(cell) {
    return (
      <p className="badge user-badge rounded-pill bg-custom-light text-dark">
        {moment(cell).format('lll')}
      </p>
    );
  }

  expandRow = {
    showExpandColumn: true,
    renderer: (row) => (
      <div className="row">
        {console.log('data', row)}
        <div className="col-md-6">
          <h6>Employee Information</h6>
          <div className="row">
            {row ? (
              <div className="mb-1 col-md-4">
                <img src={row.imageurl} className="user-img" alt="employee" />
                &nbsp;&nbsp;&nbsp;
                <h6 className="person-info m-0">
                  {row.firstName}&nbsp;{row.lastName}
                </h6>
                <p>
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                  &nbsp;&nbsp;
                  {row.userName}
                </p>
                <p>
                  <i className="fas fa-envelope"></i>&nbsp;&nbsp;
                  {row.email}
                </p>
                <p>
                  <i className="fas fa-phone"></i>&nbsp;&nbsp;
                  {row.phoneNumber}
                </p>
              </div>
            ) : null}
          </div>
        </div>
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
          <div style={{ cursor: 'pointer', marginTop: '5px' }}>
            <i className="fas fa-chevron-circle-up"></i>
          </div>
        );
      }
      return (
        <div style={{ cursor: 'pointer', marginTop: '5px' }}>
          <i className="fas fa-chevron-circle-down"></i>
        </div>
      );
    },
  };

  render() {
    const { employees } = this.state;
    return (
      <div className="pt-5 pb-5 admin-container-color">
        <div className="card p-4 exam-table container">
          <div className="d-flex">
            <h3>Registed Employee List</h3>
            <div className="align-right">
              <button
                className="btn btn-primary btn-rounded btn-no-shadow"
                data-mdb-toggle="modal"
                data-mdb-target="#create-employee"
              >
                Add new Employee
              </button>
            </div>
          </div>
          <ToolkitProvider
            keyField="_id"
            data={employees}
            columns={this.tableColumData}
            search
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  placeholder="Search Employee details"
                  className="mb-3 search-bar"
                />
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  bordered={true}
                  striped={false}
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                  rowClasses="custom-row-class"
                  hover
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                  expandRow={this.expandRow}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <CreateEmployee />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employeeReducer.employeeList,
  employeeListError: state.employeeReducer.employeeListError,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeList: () => {
    dispatch(getEmployeeList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);