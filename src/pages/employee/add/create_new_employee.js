import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEmployee } from '../../../actions/employeeAction';

const initialState = {
  firstName: '',
  flastName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: '',
  description: '',
  dateofbirth: '',
  userName: '',
  password: '',
  imageurl: '',
  profileImage: null,
  uploadPercentage: 0,
  role: ''
};

const roleOptions = [
  { labal: 'Teacher', value: 'TEACHER'},
  { labal: 'Admin', value: 'ADMIN'},
  { labal: 'Staff', value: 'STAFF'},
];

class CreateEmployee extends Component {
  constructor(props) {
  super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    return (
      <div className="modal fade" id="create-employee" tabIndex="-1" aria-label="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Create New User </h5>
              <div className="row mb-2">
                <div>
                  <label htmlFor="fname" className="form-label p-0">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    className="form-control"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  createemployee: state.employeeReducer.createemployee,
  createemployeeError: state.employeeReducer.createemployeeError,
});

const mapDispatchToProps = (dispatch) => ({
  createEmployee: (employeeData) => {
    dispatch(createEmployee(employeeData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);