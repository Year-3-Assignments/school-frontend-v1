import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import { getEmployeeList } from '../../../actions/employeeAction';

const { SearchBar } = Search;
const initialState = {
  employees: []
}

class EmployeePage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    console.log('data')
    this.props.getEmployeeList();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.employeeList !== nextProps.employeeList) {
      this.setState({ employees: nextProps.employeeList }, () => {
        console.log('employee list', this.state.employees)
      });
    }
  }

  tableColumData = [
    {
      dataField: "_id",
      text: "Employee ID",
      formatter: (cell) => this.setIdFormatter(cell),
      headerStyle: () => {
        return { width: "150px" };
      },
    },
    {
      dataField: "firstname",
      text: "First Name",
      formatter: (cell, row) => this.setNameFormatter(cell, row),
    },
    {
      dataField: "lastname",
      text: "LastName",
      formatter: (cell, row) => this.setNameFormatter(cell, row),
    },
    {
      dataField: "email",
      text: "Email",
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: "username",
      text: "Username",
      formatter: (cell) => this.setFieldFormatter(cell),
    },
  ];

  render() {
    const { employees } = this.state;
    return (
      <div className="pt-5 pb-5">
        <div className="card p-4 exam-table">
        <div className="d-flex">
            <h3>Registed Employee List</h3>
            <div className="align-right">
              <button
                className="btn btn-primary btn-rounded btn-no-shadow"
                data-mdb-toggle="modal"
                data-mdb-target="#create-exam"
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
                  placeholder="Search exams by Exam Title"
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
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  employeeList: state.employeeReducer.employeeList,
  employeeListError: state.employeeReducer.employeeListError,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeList: () => {
    dispatch(getEmployeeList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);