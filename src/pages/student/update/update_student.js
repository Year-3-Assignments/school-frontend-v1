import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { updateStudent, setStudent } from '../../../actions/student_actions';
import { connect } from 'react-redux';
import 'react-rangeslider/lib/index.css';
import moment from 'moment';
import Loader from '../../../components/loader';

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
class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onGradeSelect = this.onGradeSelect.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onEditImageChange = this.onEditImageChange.bind(this);
    this.onSelectProvince = this.onSelectProvince.bind(this);
    this.state = {
      id: '',
      fname: '',
      lname: '',
      dob: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      grade: '',
      achievements: '',
      parentName: '',
      email: '',
      phone: '',
      username: '',
      isLoading: false,
      formNotValid: false,
      role: 'ROLE_ADMIN',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.selectedstudent !== nextProps.selectedstudent) {
      this.setState({
        id: nextProps.selectedstudent._id,
        fname: nextProps.selectedstudent.firstname,
        lname: nextProps.selectedstudent.lastname,
        dob: moment(nextProps.selectedstudent.dateofbirth).toDate(),
        address1: nextProps.selectedstudent.address1,
        address2: nextProps.selectedstudent.address2,
        city: nextProps.selectedstudent.city,
        province: nextProps.selectedstudent.province,
        grade: nextProps.selectedstudent.grade,
        achievements: nextProps.selectedstudent.achievements,
        parentName: nextProps.selectedstudent.parent,
        email: nextProps.selectedstudent.email,
        phone: nextProps.selectedstudent.phone,
        username: nextProps.selectedstudent.username,
      });
    }
    if (this.props.updatestudent !== nextProps.updatestudent) {
      NotificationManager.success('Updated Student Details successfully!');
      this.closeModal();
    }

    if (this.props.updatestudenterror !== nextProps.updatestudenterror) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.error('Update Student Details UNSUCCESSFUL!');
      });
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
    $('#update-student').modal('toggle');
    this.props.setStudent('');
    this.setState(this.state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map((key) => {
        return key != null;
      });

      if (!data.includes(false)) {
        let studentData = {
          id: this.state.id,
          firstname: this.state.fname,
          lastname: this.state.lname,
          dateofbirth: this.state.dob,
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          province: this.state.province,
          grade: this.state.grade,
          achievements: this.state.achievements,
          parent: this.state.parentName,
          phone: this.state.phone,
          email: this.state.email,
          username: this.state.username,
        };

        console.log('DATA TO SEND', studentData);
        this.props.updateStudent(studentData);
        this.setState({ isLoading: true });
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning('Fields Required');
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
      achievements,
      phone,
      city,
      province,
      dob,
      address1,
      address2,
      grade,
      username,
    } = this.state;
    const data = {
      firstname: fname && fname.trim().length > 0 ? fname : null,
      lastname: lname && lname.trim().length > 0 ? lname : null,
      dateofbirth: dob && dob.toString().trim().length > 0 ? dob : null,
      address1: address1 && address1.trim().length > 0 ? address1 : null,
      address2: address2 && address2.trim().length > 0 ? address2 : null,
      city: city && city.trim().length > 0 ? city : null,
      province:
        province && province.toString().trim().length > 0 ? province : null,
      grade: grade && grade.toString().trim().length > 0 ? grade : null,
      achievements:
        achievements && achievements.toString().trim().length > 0
          ? achievements
          : null,
      parent: parentName && parentName.trim().length > 0 ? parentName : null,
      phone: phone && phone.trim().length > 0 ? phone : null,
      email: email && email.trim().length > 0 ? email : null,
      username: username && username.trim().length > 0 ? username : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  render() {
    const { isLoading, formNotValid } = this.state;
    return (
      <div
        className="modal fade"
        id="update-student"
        tabIndex="-1"
        aria-labelledby="update-student"
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
                    Update
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
  students: state.studentReducer.getstudent,
  selectedstudent: state.studentReducer.setstudent,
  updatestudent: state.studentReducer.updatestudent,
  updatestudenterror: state.studentReducer.updatestudenterror,
});

const mapDispatchToProps = (dispatch) => ({
  setStudent: (studentData) => {
    dispatch(setStudent(studentData));
  },
  updateStudent: (studentData) => {
    dispatch(updateStudent(studentData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
