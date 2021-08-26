import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Select from 'react-select';
// import Progress from '../../../components/progress';
import DatePicker from 'react-datepicker';
import { createStudent } from '../../../actions/student_actions';
import { connect } from 'react-redux';
import 'react-rangeslider/lib/index.css';
import Loader from '../../../components/loader';
import ImagePreviewer from '../../../components/image_previewer';

let formData = {};

const $ = window.$;

const provinces = [
  { value: 'Central', label: 'Central' },
  { value: 'Eastern', label: 'Eastern' },
  { value: 'North Central', label: 'North Central' },
  { value: 'Northern', label: 'Northern' },
  { value: 'North Western', label: 'North Western' },
  { value: 'Sabaragamuwa', label: 'Sabaragamuwa' },
  { value: 'Southern', label: 'Southern' },
  { value: 'Uva', label: 'Uva' },
  { value: 'Western', label: 'Western' },
];

const gradeoptions = [
  { value: 'GRADE 1', label: 'GRADE 1' },
  { value: 'GRADE 2', label: 'GRADE 2' },
  { value: 'GRADE 3', label: 'GRADE 3' },
  { value: 'GRADE 4', label: 'GRADE 4' },
  { value: 'GRADE 5', label: 'GRADE 5' },
  { value: 'GRADE 6', label: 'GRADE 6' },
  { value: 'GRADE 7', label: 'GRADE 7' },
  { value: 'GRADE 8', label: 'GRADE 8' },
  { value: 'GRADE 9', label: 'GRADE 9' },
  { value: 'GRADE 10', label: 'GRADE 10' },
  { value: 'GRADE 11', label: 'GRADE 11' },
  { value: 'GRADE 12', label: 'GRADE 12' },
  { value: 'GRADE 13', label: 'GRADE 13' },
];
class Student extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onEditImageChange = this.onEditImageChange.bind(this);
    this.onSelectProvince = this.onSelectProvince.bind(this);
    this.state = {
      fname: '',
      lname: '',
      dob: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      grade: 0,
      profileImage: '',
      achievements: '',
      parentName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      isLoading: false,
      formNotValid: false,
      role: 'ROLE_ADMIN',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createstudent !== nextProps.createstudent) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.success('Student created successfull!');
      });
    }

    if (this.props.createstudenterror !== nextProps.createstudenterror) {
      if (
        nextProps.createstudenterror &&
        nextProps.createstudenterror.message
      ) {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error(nextProps.createstudenterror.message);
        });
      } else {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error('CREATE STUDENT FAILED');
        });
      }
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSelectProvince = (event) => {
    if (event) {
      this.setState({ province: event.value });
    }
  };

  onGradeSelect = (event) => {
    if (event) {
      this.setState({ grade: event.value });
    }
  };

  onTimeChange(date) {
    this.setState({ dob: date });
  }

  onEditImageChange(imageData) {
    this.setState({ profileImage: imageData });
  }

  closeModal() {
    $('#create-student').modal('toggle');
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map((key) => {
        return key != null;
      });

      if (!data.includes(false)) {
        let studentData = {
          firstname: this.state.fname,
          lastname: this.state.lname,
          dateofbirth: this.state.dob,
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          province: this.state.province,
          grade: this.state.grade,
          imageurl: this.state.profileImage,
          achievements: this.state.achievements,
          parent: this.state.parentName,
          phone: this.state.phone,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        };

        console.log('DATA TO SEND', studentData);
        this.props.createStudent(studentData);
        this.setState({ isLoading: true });
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning('Please check the input fields');
        });
      }
    }
  };

  validateForm() {
    const {
      fname,
      lname,
      parentName,
      email,
      profileImage,
      achievements,
      phone,
      city,
      province,
      dob,
      address1,
      address2,
      grade,
      username,
      password,
    } = this.state;
    const data = {
      firstname: fname && fname.trim().length > 0 ? fname : null,
      lastname: lname && lname.trim().length > 0 ? lname : null,
      dateofbirth: dob && dob.toString().trim().length > 0 ? dob : null,
      address1: address1 && address1.trim().length > 0 ? address1 : null,
      address2: address2 && address2.trim().length > 0 ? address2 : null,
      city: city && city.trim().length > 0 ? city : null,
      province: province && province.trim().length > 0 ? province : null,
      grade: grade && grade.trim().length > 0 ? grade : null,
      achievements:
        achievements && achievements.trim().length > 0 ? achievements : null,
      imageurl:
        profileImage && profileImage.trim().length > 0 ? profileImage : null,
      parent: parentName && parentName.trim().length > 0 ? parentName : null,
      phone: phone && phone.trim().length > 0 ? phone : null,
      email: email && email.trim().length > 0 ? email : null,
      username: username && username.trim().length > 0 ? username : null,
      password: password && password.trim().length > 0 ? password : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  render() {
    const { isLoading, formNotValid } = this.state;
    return (
      <div
        className="modal fade"
        id="create-student"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Create Student Account</h3>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <ImagePreviewer getEditedImage={this.onEditImageChange} />
              {formData.imageurl === null && formNotValid ? (
                <div className="d-flex justify-content-center mt-1">
                  <span className="text-danger validation-text p-0 text-center">
                    Please select & upload profile image
                  </span>
                </div>
              ) : null}
              <div className="row m-0 mb-2">
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
                {formData.firstname === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    First name is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-2">
                <label htmlFor="lname" className="form-label p-0">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  className="form-control"
                  name="lname"
                  value={this.state.lname}
                  onChange={this.onChange}
                />
                {formData.lastname === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Last name is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-2">
                <label htmlFor="dob" className="form-label p-0 m-0">
                  Date of Birth &nbsp; <i className="far fa-calendar-alt"></i>
                </label>

                <DatePicker
                  className="form-control"
                  value={this.state.dob}
                  onChange={this.onTimeChange}
                  dateFormat="MM/dd/yyyy"
                  selected={this.state.dob}
                  showTimeInput={false}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                {formData.dateofbirth === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Date of Birth is required
                  </span>
                ) : null}
              </div>

              <div className="row mb-2">
                <div className="row m-0 mb-2 col">
                  <label htmlFor="address1" className="form-label p-0">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="address1"
                    className="form-control"
                    name="address1"
                    value={this.state.address1}
                    onChange={this.onChange}
                  />
                  {formData.address1 === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Address is required
                    </span>
                  ) : null}
                </div>

                <div className="row m-0 mb-2 col">
                  <label htmlFor="address2" className="form-label p-0">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    className="form-control"
                    name="address2"
                    value={this.state.address2}
                    onChange={this.onChange}
                  />
                  {formData.address2 === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Address is required
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="row m-0 mb-2 col">
                  <label htmlFor="city" className="form-label p-0">
                    City
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

                <div className="col m-0 mb-3">
                  <label htmlFor="province" className="form-label p-0 m-0 mb-2">
                    Province
                  </label>
                  <Select
                    options={provinces}
                    className="select basic-single"
                    id="province"
                    name="province"
                    onChange={this.onSelectProvince}
                  />
                  {formData.province === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Province is required
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="m-0 mb-2">
                <label htmlFor="grade" className="form-label p-0 m-0">
                  Grade
                </label>
                <Select
                  options={gradeoptions}
                  className="select basic-single"
                  id="grade"
                  name="grade"
                  onChange={this.onGradeSelect}
                />
                {formData.grade === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Grade is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-2 col">
                <label htmlFor="achievements" className="form-label p-0">
                  Achievements
                </label>
                <textarea
                  type="text"
                  id="achievements"
                  className="form-control"
                  name="achievements"
                  value={this.state.achievements}
                  onChange={this.onChange}
                ></textarea>
                {formData.achievements === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Achievements are required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-2 col">
                <label htmlFor="parentName" className="form-label p-0">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  id="parentName"
                  className="form-control"
                  name="parentName"
                  value={this.state.parentName}
                  onChange={this.onChange}
                />
                {formData.parent === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Parent name is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-2">
                <label htmlFor="email" className="form-label p-0">
                  Email Address
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
                  <span className="text-danger p-0 validation-text p-0">
                    Email is required
                  </span>
                ) : null}
              </div>

              <div className="row m-0 mb-2">
                <label htmlFor="phone" className="form-label p-0">
                  Contact Number
                </label>
                <input
                  type="phone"
                  id="phone"
                  className="form-control"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
                {formData.phone === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Phone number is required
                  </span>
                ) : null}
              </div>

              <div className="row mb-2">
                <div className="row m-0 mb-2 col">
                  <label htmlFor="username" className="form-label p-0">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {formData.username === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Username is required
                    </span>
                  ) : null}
                </div>

                <div className="row m-0 mb-3 col">
                  <label htmlFor="password" className="form-label p-0">
                    Password
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
              </div>
            </div>
            <div className="modal-footer d-flex">
              {isLoading ? (
                <div className="justify-content-left text-center">
                  <Loader size={40} />
                </div>
              ) : (
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary btn-no-shadow btn-rounded"
                    onClick={this.closeModal}
                  >
                    Close
                  </button>
                  &nbsp;&nbsp;
                  <button
                    href="#"
                    className="btn btn-primary btn-no-shadow btn-rounded"
                    onClick={this.onSubmit}
                  >
                    Create Student
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  createstudent: state.studentReducer.createstudent,
  createstudenterror: state.studentReducer.createstudenterror,
});

const mapDispatchToProps = (dispatch) => ({
  createStudent: (studentData) => {
    dispatch(createStudent(studentData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Student);
