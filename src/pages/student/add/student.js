import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import firebase from '../../../firebase.config';
import Select from 'react-select';
import Progress from '../../../components/progress';
import DatePicker from 'react-datepicker';
import { createStudent } from '../../../actions/student_actions';
import { connect } from 'react-redux';

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
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.setImageUrl = this.setImageUrl.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.setImage = this.setImage.bind(this);
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
      profileImage: null,
      uploadPercentage: 0,
      achievements: '',
      pname: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      role: 'ROLE_ADMIN',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createStudent !== nextProps.createStudent) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.success('Student created successfull!');
      });
    }

    if (this.props.createstudenterror !== nextProps.createstudenterror) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.error(nextProps.createstudenterror.message);
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

  setImage = (e) => {
    this.setState({ profileImage: e.target.files[0] });
  };

  setUploadPercentage = (progress) => {
    this.setState({ uploadPercentage: progress });
  };

  setImageUrl = ({ imageurl }) => {
    this.setState({ imageurl: imageurl }, () => {
      console.log('image url', this.state.imageurl);
    });
  };

  uploadImage = (e) => {
    e.preventDefault();
    if (this.state.profileImage !== null) {
      let folderName = 'Profile-Pictures';
      let file = this.state.profileImage;
      let upload = firebase
        .storage()
        .ref(`${folderName}/${this.state.username}`)
        .put(file);

      upload.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setUploadPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then((url) => {
            this.setImageUrl({ imageurl: url });
            NotificationManager.success('Image upload success');
          });
        }
      );
    }
  };

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
          imageurl: this.state.imageurl,
          achievements: this.state.achievements,
          parent: this.state.parent,
          phone: this.state.phone,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        };

        console.log('DATA TO SEND', studentData);
        this.props.createStudent(studentData);
        NotificationManager.success('Student Profile is Successfully created!');
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning('Please check the input fields');
        });
      }
    }
  };

  validateForm() {
    const { fname, lname, email, phone, city, dob, address1, address2, grade } =
      this.state;
    const data = {
      firstname: fname && fname.trim().length > 0 ? fname : null,
      lastname: lname && lname.trim().length > 0 ? lname : null,
      dateofbirth: dob && dob.toString().trim().length > 0 ? dob : null,
      address1: address1 && address1.trim().length > 0 ? address1 : null,
      address2: address2 && address2.trim().length > 0 ? address2 : null,
      city: city && city.trim().length > 0 ? city : null,
      province: provinces && provinces.trim().length > 0 ? provinces : null,
      grade: grade && grade.trim().length > 0 ? grade : null,
      achievements:
        this.state.achievements && this.state.achievements.trim().length > 0
          ? this.state.achievements
          : null,
      imageurl:
        this.state.imageurl && this.state.imageurl.trim().length > 0
          ? this.state.imageurl
          : null,
      parent:
        this.state.pname && this.state.pname.trim().length > 0
          ? this.state.pname
          : null,
      phone:
        this.state.phone && this.state.phone.trim().length > 0
          ? this.state.phone
          : null,
      email:
        this.state.email && this.state.email.trim().length > 0
          ? this.state.email
          : null,
      username:
        this.state.username && this.state.username.trim().length > 0
          ? this.state.username
          : null,
      password:
        this.state.password && this.state.password.trim().length > 0
          ? this.state.password
          : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  render() {
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

              <div className="m-0 mb-3">
                <label htmlFor="profile-image" className="form-label">
                  Profile Image
                </label>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="profile-image"
                    name="imageUrl"
                    onChange={(e) => this.setImage(e)}
                  />
                  <button
                    className="btn btn-outline-primary btn-sm btn-no-shadow"
                    type="button"
                    onClick={this.uploadImage}
                  >
                    UPLOAD
                  </button>
                </div>
                {formData.imageurl === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Profile image is required
                  </span>
                ) : null}
              </div>
              <div className="mb-3">
                <Progress percentage={this.state.uploadPercentage} />
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
                <label htmlFor="pname" className="form-label p-0">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  id="pname"
                  className="form-control"
                  name="pname"
                  value={this.state.pname}
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
              <div className="d-flex justify-content-end mb-3">
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
