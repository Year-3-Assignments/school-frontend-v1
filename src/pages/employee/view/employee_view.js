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
  getEmployeeList,
  setEmployee,
  deleteEmployee,
  getEmployeeById,
} from '../../../actions/employeeAction';
import CreateEmployee from '../add/create_new_employee';
import UpdateEmployee from '../update/update_employee';
import Loader from '../../../components/loader';
import { NotificationManager } from 'react-notifications';

const { SearchBar } = Search;
const initialState = {
  employees: [],
  isLoading: false,
  removeemployeeId: '',

};

const { ExportCSVButton } = CSVExport;
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

const options = {
  paginationSize: 4,
  pageStartIndex: 1,
  sizePerPage: 12,
};

class EmployeePage extends Component {
  constructor(props) {
    super(props);
    this.OnSelectEmployeeToUpdate = this.OnSelectEmployeeToUpdate.bind(this);
    this.state = initialState;
    this.setRemoveEmployeeId = this.setRemoveEmployeeId.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.getEmployeeList();
    const employeeId = this.props.employeeId;
    if(employeeId){
      this.props.getEmployeeById(employeeId)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.employees !== nextProps.employees) {
      this.setState({ employees: nextProps.employees }, () => {
        console.log('employee list', this.state.employees);
      });
    }
    if (this.props.addEmployee !== nextProps.addEmployee) {
      this.props.getEmployeeList();
    }
    if (this.props.updateEmp !== nextProps.updateEmp) {
      this.props.getEmployeeList();
    }

    if (this.props.deleteEmp !== nextProps.deleteEmp) {
      this.props.getEmployeeList();
    }

    if (this.props.deleteempError !== nextProps.deleteempError) {
      if(nextProps.deleteempError && nextProps.deleteempError.message) {
        this.setState({isLoading: false}, () => {
          NotificationManager.error(nextProps.deleteempError.message);
        });
      } else {
        this.setState({ isLoading: false}, () => {
          NotificationManager.error('Employee delete failed!');
        });
      }
    }
  };

  closeModal() {
    const { removeemployeeId } = this.state;

    if(removeemployeeId) {
      $(`#q${removeemployeeId}`).modal('toggle');
      this.setState(initialState);
    }
  }

  setRemoveEmployeeId = (event, employeeId) => {
    if (event) {
      this.setState({ removeemployeeId: employeeId });
      console.log(employeeId);
      this.props.deleteEmployee(employeeId);
      this.setState({isLoading: false});
      this.closeModal();
    }
    
  };

  OnSelectEmployeeToUpdate = (event, employeeId) => {
    const { employees } = this.state;
    if (event && employees && employees.length > 0 && employeeId) {
      const selectedEmployee = employees.find(
        (employee) => employee._id === employeeId
      );
      this.props.setEmployee(selectedEmployee);
      this.setState({ selectedEmployee: selectedEmployee });
      //console.log(selectedEmployee);
    }
  };

  removeEmployee = (event) => {
    if (event) {
      event.preventDefault();
      const { removeemployeeId } = this.state;

      if(removeemployeeId) {
        console.log(removeemployeeId);
        this.props.deleteEmployee(removeemployeeId);
        this.setState({isLoading: false});
        this.closeModal();
      }
    }
  }

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
      headerStyle: () => {
        return { width: '250px' };
      },
    },
    {
      dataField: 'email',
      text: 'Email',
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: 'phoneNumber',
      text: 'Phone',
      formatter: (cell) => this.setFieldFormatter(cell),
      headerStyle: () => {
        return { width: '120px' };
      },
    },
    {
      dataField: 'createdAt',
      text: 'Joined At',
      formatter: (cell) => this.setDateFormatter(cell),
      headerStyle: () => {
        return { width: '120px' };
      },
      sort: true,
    },
    {
      dataField: 'salary',
      text: 'Salary',
      formatter: (cell) => this.setFieldFormatter(cell),
      headerStyle: () => {
        return { width: '100px' };
      },
      sort: true,
    },
    {
      dataField: 'city',
      text: 'City',
      formatter: (cell) => this.setFieldFormatter(cell),
      headerStyle: () => {
        return { width: '140px' };
      },
    },
    {
      dataField: 'role',
      text: 'Role',
      formatter: (cell) => this.setFieldFormatter(cell),
      headerStyle: () => {
        return { width: '100px' };
      },
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
      <span className="d-flex">
        <img src={row.imageurl} className="user-img" alt="employee" />
        &nbsp;&nbsp;
        <p className="m-0 student-data text-dark">
          {row.firstName}&nbsp;{row.lastName}
        </p>
      </span>
    );
  }

  setFieldFormatter(cell) {
    return <p className="student-data text-dark">{cell}</p>;
  }

  setDateFormatter(cell) {
    return (
      <p className="student-data text-dark">{moment(cell).format('ll')}</p>
    );
  }

  actionButtonFormatter = (row) => {
    const {removeemployeeId} = this.state;
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
              data-mdb-target="#update-employee"
              onClick={(e) => this.OnSelectEmployeeToUpdate(e, row._id)}
            >
              <i class="far fa-edit" /> Edit
            </a>

            <a 
              className="dropdown-item" 
              data-mdb-toggle="modal"
              data-mdb-target={`#q${this.removeemployeeId}`}
              onClick={(event) => this.setRemoveEmployeeId(event, row._id)}
            >
              <i class="far fa-trash-alt" /> Delete
            </a>
          </div>
        </span>
      </span>
    );
  };

  expandRow = {
    showExpandColumn: true,
    renderer: (row) => (
      <div>
        <div>
          {row ? (
            <div className="row">
              <div className="mb-1 col-md-2">
                <img
                  src={row.imageurl}
                  className="employee-img"
                  alt="employee"
                />
              </div>
              <div className="mb-1 col-md-8">
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
                <p>
                  <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;
                  {row.addressLine1},&nbsp;{row.addressLine2}
                </p>
                <p>
                  <i className="fas fa-city"></i>&nbsp;&nbsp;
                  {row.city}
                </p>
                <p>
                  <i class="fas fa-money-bill-wave"></i>&nbsp;&nbsp; Rs.
                  {parseFloat(row.salary).toFixed(2)}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    expandByColumnOnly: true,
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
    const { employees,isLoading,removeemployeeId } = this.state;
    return (
      <div className="pt-5 pb-5 admin-container-color">
        <div className="card p-4 exam-table container">
          <div className="d-flex mb-3">
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
                    DOWNLOAD EMPLOYEE DATA
                  </ExportCSVButton>
                </div>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory(options)}
                  bordered={true}
                  striped={false}
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                  rowClasses="custom-row-class"
                  className="custom-table"
                  hover
                  rowStyle={rowStyle}
                  expandRow={this.expandRow}
                />
              </div>
            )}
          </ToolkitProvider>
          <CreateEmployee />
          <UpdateEmployee />
          <div>
            <div
              className="modal fade"
              id={'q' + this.removeemployeeId}
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
                      Remove Employee
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-mdb-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Do you want to remove this employee?</p>
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
                          onClick={this.removeEmployee}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employeeReducer.employeeList,
  employeeListError: state.employeeReducer.employeeListError,
  addEmployee: state.employeeReducer.createemployee,
  updateEmp: state.employeeReducer.updateEmployee,
  updateEmployeeError: state.employeeReducer.updateEmployeeError,
  deleteEmp: state.employeeReducer.deleteEmployee,
  deleteempError: state.employeeReducer.deleteemployeeError,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeList: () => {
    dispatch(getEmployeeList());
  },
  setEmployee: (employeeData) => {
    dispatch(setEmployee(employeeData));
  },
  deleteEmployee: (employeeId) => {
    dispatch(deleteEmployee(employeeId));
  },
  getEmployeeById: (employeeId) => {
    dispatch(getEmployeeById(employeeId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);
