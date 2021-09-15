import React from 'react';
import { connect } from 'react-redux';
import { getStudentById } from '../../../actions/student_actions';

let initialState = {
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
  isEditClicked: false,
  buttonText: 'request edit',
};

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.onRequestSend = this.onRequestSend.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.getStudentById();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.getstudent);
    if (this.props.getstudent !== nextProps.getstudent) {
      console.log('Student Information', nextProps.getstudent);
      this.setState({
        _id: nextProps.selectedstudent._id,
        fname: nextProps.selectedstudent.firstname,
        lname: nextProps.selectedstudent.lastname,
        dob: nextProps.selectedstudent.dateofbirth,
        address1: nextProps.selectedstudent.address1,
        address2: nextProps.selectedstudent.address2,
        city: nextProps.selectedstudent.city,
        province: nextProps.selectedstudent.province,
        grade: nextProps.selectedstudent.grade,
        profileImage: nextProps.selectedstudent.imageurl,
        achievements: nextProps.selectedstudent.achievements,
        parentName: nextProps.selectedstudent.parent,
        email: nextProps.selectedstudent.email,
        phone: nextProps.selectedstudent.phone,
        username: nextProps.selectedstudent.username,
        password: nextProps.selectedstudent.password,
      });
    }

    if (this.props.getstudent !== nextProps.getstudent) {
      this.props.getStudentById();
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRequestSend(e) {
    this.setState({ isEditClicked: !this.state.isEditClicked }, () => {
      this.setState({
        buttonText: this.state.isEditClicked ? 'cancel' : 'request edit',
      });
    });
  }

  setRequestForAdmin(e) {
    const requestData = {
      requestedby: this.state._id,
      message: 'I want request to edit my profile details',
    };
    console.log(requestData);
    //this.props.requestChangeUserRole(requestData);
  }

  render() {
    return (
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={this.state.profileImage}
                      alt="Student"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>
                        {this.state.fname}&nbsp;{this.state.lname}
                      </h4>
                      <p className="text-secondary mb-1">{this.state.grade}</p>
                      <p className="text-muted font-size-sm">
                        {this.state.username}
                      </p>
                      <button className="btn btn-primary">Request Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.fname}&nbsp;{this.state.lname}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date of birth</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.dob}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Grade</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.grade}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.username}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Contact Number</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.address1}, &nbsp;{this.state.address1}, &nbsp;
                      {this.state.city}, &nbsp;{this.state.province}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Acheievements</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.achievements}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Parent/Guardian Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.parent}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a
                        className="btn btn-info "
                        target="__blank"
                        href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                      >
                        Request for Modifications
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">SPORTS</i>
                        <br /> <br /> <br />
                        Details
                      </h6>
                      <small>Web Design</small>

                      <small>Website Markup</small>

                      <small>One Page</small>

                      <small>Mobile Template</small>

                      <small>Backend API</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">
                          EXAMINATIONS
                        </i>
                        <br /> <br /> <br />
                        Details
                      </h6>
                      <small>Web Design</small>

                      <small>Website Markup</small>

                      <small>One Page</small>

                      <small>Mobile Template</small>

                      <small>Backend API</small>
                    </div>
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
  getstudent: state.studentReducer.getstudent,
  getstudenterror: state.studentReducer.getstudenterror,
});

const mapDispatchToProps = (dispatch) => ({
  getStudentById: () => {
    dispatch(getStudentById());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
