import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEmployee } from '../../../actions/employeeAction';
import { NotificationManager } from 'react-notifications';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import ImagePreviewer from '../../../components/image_previewer';
import Loader from '../../../components/loader';

let formData = {};
const $ = window.$;

const roleOptions = [
  { label: 'TEACHER', value: 'TEACHER' },
  { label: 'ADMIN', value: 'ADMIN' },
  { label: 'STAFF', value: 'STAFF' },
];

const initialState = {
  firstName: '',
  lastName: '',
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
  imageUrl: '',
  isLoading: false,
  salary: '',
  role: 0,
};

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditImageChange = this.onEditImageChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createemployee !== nextProps.createemployee) {
      this.setState(initialState, () => {
        NotificationManager.success('Employee added successfully');
        this.closeModal();
      });
    }

    if (this.props.createemployeeError !== nextProps.createemployeeError) {
      if (
        nextProps.createemployeeError &&
        nextProps.createemployeeError.message
      ) {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error(nextProps.createemployeeError.message);
        });
      } else {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error('Error with add new employee');
        });
      }
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  closeModal() {
    $('#create-employee').modal('toggle');
    this.setState(initialState);
  }

  onTimeChange(date) {
    this.setState({ dateofbirth: date });
  }

  onSelectRole = (event) => {
    if (event) {
      this.setState({ role: event.value });
    }
  };

  onEditImageChange(imageData) {
    this.setState({ imageUrl: imageData });
  }

  validateForm() {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      province,
      role,
      description,
      dateofbirth,
      userName,
      password,
      imageUrl,
      salary,
    } = this.state;
    const data = {
      firstName: firstName && firstName.trim().length > 0 ? firstName : null,
      lastName: lastName && lastName.trim().length > 0 ? lastName : null,
      email: email && email.trim().length > 0 ? email : null,
      phoneNumber:
        phoneNumber && phoneNumber.trim().length > 0 ? phoneNumber : null,
      addressLine1:
        addressLine1 && addressLine1.trim().length > 0 ? addressLine1 : null,
      addressLine2:
        addressLine2 && addressLine2.trim().length > 0 ? addressLine2 : null,
      city: city && city.trim().length > 0 ? city : null,
      province: province && province.trim().length > 0 ? province : null,
      role: role && role.trim().length > 0 ? role : null,
      imageurl: imageUrl && imageUrl.trim().length > 0 ? imageUrl : null,
      description:
        description && description.trim().length > 0 ? description : null,
      dateofbirth:
        dateofbirth && dateofbirth.toString().trim().length > 0
          ? dateofbirth
          : null,
      userName: userName && userName.trim().length > 0 ? userName : null,
      password: password && password.trim().length > 0 ? password : null,
      salary: salary && salary.trim().length > 0 ? salary : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map((key) => {
        console.log(key !== null);
        return key != null;
      });

      if (!data.includes(false)) {
        const employeeData = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          dateofbirth: this.state.dateofbirth,
          addressLine1: this.state.addressLine1,
          addressLine2: this.state.addressLine2,
          city: this.state.city,
          province: this.state.province,
          imageurl: this.state.imageUrl,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
          userName: this.state.userName,
          password: this.state.password,
          description: this.state.description,
          role: this.state.role,
          salary: this.state.salary,
        };

        console.log('DATA TO SEND', employeeData);
        this.props.createEmployee(employeeData);
        this.setState({ isLoading: true });
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning('Please check the input fields');
        });
      }
    }
  };

  render() {
    return (
      <div
        className="modal fade"
        id="create-employee"
        tabIndex="-1"
        aria-label="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title"> Create New User </h6>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <ImagePreviewer getEditedImage={this.onEditImageChange} />
              {formData.imageurl === null && this.state.formNotValid ? (
                <div className="d-flex justify-content-center mt-2">
                  <span className="text-danger validation-text p-0">
                    Employee image is required.
                  </span>
                </div>
              ) : null}
              <div className="row m-0 mb-3">
                <label htmlFor="firstName" className="form-label p-0">
                  First Name :
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
                {formData.firstName === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    First name is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="lastName" className="form-label p-0">
                  Last Name :
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
                {formData.lastName === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Last name is required
                  </span>
                ) : null}
              </div>

              <div className="input-group m-0 mb-2">
                <label htmlFor="dateofbirth" className="form-label p-0 m-0">
                  Date of Birth :
                </label>
                &nbsp;
                <span>
                  <i className="far fa-calendar-alt"></i>
                </span>
                <DatePicker
                  className="form-control"
                  onChange={this.onTimeChange}
                  dateFormat="MM/dd/yyyy"
                  value={this.state.dateofbirth}
                  selected={this.state.dateofbirth}
                  showTimeInput={false}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                {formData.dateofbirth === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Birth day is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="email" className="form-label p-0">
                  Email :
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {formData.email === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Email is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="phoneNumber" className="form-label p-0">
                  Phone Number :
                </label>
                <input
                  type="text"
                  id="phonenumber"
                  className="form-control"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                />
                {formData.phoneNumber === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Phone number is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="addressLine1" className="form-label p-0">
                  Address Line 1 :
                </label>
                <input
                  type="text"
                  id="addressline1"
                  className="form-control"
                  name="addressLine1"
                  value={this.state.addressLine1}
                  onChange={this.onChange}
                />
                {formData.addressLine1 === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Address is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="addressLine2" className="form-label p-0">
                  Address Line 2 :
                </label>
                <input
                  type="text"
                  id="addressline2"
                  className="form-control"
                  name="addressLine2"
                  value={this.state.addressLine2}
                  onChange={this.onChange}
                />
                {formData.addressLine2 === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Address is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="city" className="form-label p-0">
                  City :
                </label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                />
                {formData.city === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    City is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="province" className="form-label p-0">
                  Province :
                </label>
                <input
                  type="text"
                  id="province"
                  className="form-control"
                  name="province"
                  value={this.state.province}
                  onChange={this.onChange}
                />
                {formData.province === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Province is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="description" className="form-label p-0">
                  Description :
                </label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                {formData.description === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Description is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="userName" className="form-label p-0">
                  User Name :
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                />
                {formData.userName === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    User name is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-3">
                <label htmlFor="password" className="form-label p-0">
                  Password :
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {formData.password === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Password is required
                  </span>
                ) : null}
              </div>

              <div className="m-0 mb-2">
                <div className="col m-0 mb-3">
                  <label htmlFor="role" className="form-label p-0 m-0">
                    Role :
                  </label>
                  <Select
                    options={roleOptions}
                    className="select"
                    id="role"
                    name="role"
                    onChange={this.onSelectRole}
                    value={this.roleOptions}
                  />
                  {formData.role === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Role is required
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="m-0 mb-2">
                <div className="col m-0 mb-3">
                  <label htmlFor="role" className="form-label p-0 m-0">
                    Monthly Salary (Rs.) :
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    name="salary"
                    value={this.state.salary}
                    onChange={this.onChange}
                  />
                  {formData.salary === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Salary is required
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div>
                {this.state.isLoading ? (
                  <div>
                    <Loader size={50} />
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-secondary btn-no-shadow btn-rounded"
                      onClick={this.closeModal}
                    >
                      Close
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-primary btn-no-shadow btn-rounded"
                      onClick={this.onSubmit}
                    >
                      Create New User
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  createemployee: state.employeeReducer.createemployee,
  createemployeeError: state.employeeReducer.createemployeeError,
});

const mapDispatchToProps = (dispatch) => ({
  createEmployee: (employeeData) => {
    dispatch(createEmployee(employeeData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);
