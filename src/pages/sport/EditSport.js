import React, { Component } from 'react';
import Progress from './progress/progress';
import firebase from '../../firebase.config';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import Select from 'react-select';
import {
  getAllSportStudent,
  getAllSportCoach,
  setSport,
  updateSport,
} from '../../actions/sportActions';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

let formData = {};
const $ = window.$;

const initialState = {
  _id: '',
  id: '',
  name: '',
  teamImageUrl: '',
  coach: [],
  coaches: [],
  students: [],
  teamPlayers: [],
  alreadySelectedCoachValue: [],
  alreadySelectedPlayerhValue: [],
  selectedCoach: [],
  selectedPlayers: [],
  isFormInvalid: false,
  uploadPercentage: 0,
};

class EditSports extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.onCoachNameChange = this.onCoachNameChange.bind(this);
    this.onStudenthNameChange = this.onStudenthNameChange.bind(this);
    this.validateResourceForm = this.validateResourceForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.removeCoach = this.removeCoach.bind(this);
    this.removePlayers = this.removePlayers.bind(this);
    this.returnSportsPlayersList = this.returnSportsPlayersList.bind(this);
    this.returnSportsCoahList = this.returnSportsCoahList.bind(this);

    this.state = initialState;
  }

  componentDidMount() {
    this.props.getAllSportStudent();
    this.props.getAllSportCoach();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.setsport !== nextProps.setsport) {
      var coachName = [];
      nextProps.setsport.coach.map((item, index) => {
        let coach = {
          value: item._id,
          label: {
            imageurl: item.imageurl,
            firstName: item.firstName,
            lastName: item.lastName,
          },
        };
        coachName.push(coach);
      });

      var playersName = [];
      nextProps.setsport.teamPlayers.map((item, index) => {
        let player = {
          value: item._id,
          label: {
            imageurl: item.imageurl,
            firstname: item.firstname,
            lastname: item.lastname,
            grade: item.grade,
          },
        };
        playersName.push(player);
        console.log(playersName);
      });

      this.setState({
        selectedCoach: coachName.map((item) => {
          return {
            imageurl: item.label['imageurl'],
            firstName: item.label['firstName'],
            lastName: item.label['lastName'],
          };
        }),
      });

      this.setState({
        selectedPlayers: playersName.map((item) => {
          return {
            imageurl: item.label['imageurl'],
            firstname: item.label['firstname'],
            lastname: item.label['lastname'],
            grade: item.label['grade'],
          };
        }),
      });

      this.setState({
        alreadySelectedCoachValue: coachName.map((coach) => coach.value),
      });

      this.setState({
        alreadySelectedPlayerhValue: playersName.map((player) => player.value),
      });

      this.setState({
        _id: nextProps.selectedSport._id,
        name: nextProps.selectedSport.name,
        teamImageUrl: nextProps.selectedSport.teamImageUrl,
      });
    }

    if (this.props.updateSport !== nextProps.updateSport) {
      NotificationManager.success('Sport update successfully');
      this.closeModal();
    }

    if (this.props.getallstdentsSports !== nextProps.getallstdentsSports) {
      let options = [];
      nextProps.getallstdentsSports.map((item, index) => {
        let teamPlayer = {
          value: item._id,
          label: (
            <div>
              <img src={item.imageurl} className="thumb-img" />
              &nbsp;&nbsp;
              {`${item.firstname} ${item.lastname} Grade:${item.grade}`}{' '}
            </div>
          ),
        };
        options.push(teamPlayer);
      });
      this.setState({ students: options });
    }

    if (this.props.getallcoachSports !== nextProps.getallcoachSports) {
      let options = [];
      nextProps.getallcoachSports.map((item, index) => {
        let coach = {
          value: item._id,
          label: (
            <div>
              <img src={item.imageurl} className="thumb-img" />
              &nbsp;&nbsp;{`${item.firstName} ${item.lastName}`}{' '}
            </div>
          ),
        };
        options.push(coach);
      });
      this.setState({ coaches: options });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setUploadPercentage = (progress) => {
    this.setState({ uploadPercentage: progress });
  };

  onFileChange(e) {
    this.setState({ teamImageUrl: e.target.files });
  }

  onCoachNameChange(e) {
    this.setState({ coach: e ? e.map((coach) => coach.value) : [] });
  }

  onStudenthNameChange(e) {
    this.setState({ teamPlayers: e ? e.map((student) => student.value) : [] });
  }

  removeCoach(value) {
    console.log(value);
    var array = this.state.alreadySelectedCoachValue;
    array.splice(index, 1);
    this.setState({ alreadySelectedCoachValue: array });

    var array1 = this.state.selectedCoach;
    console.log(array1);
    var index = array1.indexOf(value);
    array1.splice(index, 1);
    this.setState({ selectedCoach: array1 });
  }

  removePlayers(value) {
    var array = this.state.alreadySelectedPlayerhValue;
    console.log(array);
    array.splice(value, 1);
    this.setState({ alreadySelectedPlayerhValue: array });

    var array1 = this.state.selectedPlayers;
    console.log(array1);
    array1.splice(value, 1);
    this.setState({ selectedPlayers: array1 });
  }

  returnSportsCoahList() {
    return (
      <div>
        {this.state.selectedCoach.map((item, index) => {
          return (
            <div className="d-flex flex-row">
              {' '}
              <p style={{ marginRight: '0.2em' }}>
                {' '}
                {item.firstName} {item.lastName}{' '}
              </p>
              <button
                type="button"
                class="btn btn-primary btn-floating btn-rounded"
                onClick={() => this.removeCoach(index)}
              >
                <span className="close-icon">X</span>
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  returnSportsPlayersList() {
    return (
      <div>
        {this.state.selectedPlayers.map((item, index) => {
          return (
            <div className="d-flex flex-row">
              {' '}
              <p style={{ marginRight: '0.2em' }}>
                {' '}
                {item.firstname} {item.lastname}{' '}
              </p>{' '}
              <button
                type="button"
                class="btn btn-primary btn-floating btn-rounded"
                onClick={() => this.removePlayers(index)}
              >
                <span className="close-icon">X</span>
              </button>{' '}
            </div>
          );
        })}
      </div>
    );
  }

  uploadImage(e) {
    e.preventDefault();
    if (this.state.teamImageUrl.length > 0) {
      let folderName = 'Resources';
      let files = this.state.teamImageUrl;

      for (let i = 0; i < files.length; i++) {
        let upload = firebase
          .storage()
          .ref(`${folderName}/${uuidv4()}/${files[i].name}`)
          .put(files[i]);

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
              this.state.teamImageUrl = url;
              NotificationManager.success('File uploaded successfully');
            });
          }
        );
      }
    } else {
      NotificationManager.warning('Please select a file');
    }
  }

  validateResourceForm() {
    const data = {
      name:
        this.state.name && this.state.name.length > 0 ? this.state.name : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  onSubmit = (e) => {
    console.log('It comes here...');
    e.preventDefault();
    if (this.validateResourceForm()) {
      let data = Object.values(formData).map((key) => {
        return key !== null;
      });

      if (!data.includes(false)) {
        let resource = {
          id: this.state.id,
          _id: this.state._id,
          name: this.state.name,
          teamImageUrl: this.state.teamImageUrl,
          coach: this.state.alreadySelectedCoachValue.concat(this.state.coach),
          teamPlayers: this.state.alreadySelectedPlayerhValue.concat(
            this.state.teamPlayers
          ),
        };

        console.log(resource);

        this.props.updateSport(resource);
        NotificationManager.success('Sport is updated');
        this.closeModal();
      } else {
        this.setState({ isFormInvalid: true });
        NotificationManager.warning('Please fill the input fields!');
      }
    }
  };

  // close sport modal
  closeModal() {
    $('#update-sport').modal('toggle');
  }

  render() {
    const { name } = this.state;
    return (
      <div
        className="modal fade"
        id="update-sport"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLabel">
                Update Sports
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.closeModal}
              />
            </div>
            <div className="modal-body">
              <div className="row m-0 mb-2">
                <label
                  htmlFor="name"
                  className="form-label p-0"
                  style={{ textAlign: 'left' }}
                >
                  Sport Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                />
                {formData.name === null && this.state.isFormInvalid ? (
                  <span className="text-danger validation-text p-0">
                    Sport name is required
                  </span>
                ) : null}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="image"
                  className="form-label"
                  style={{ textAlign: 'left' }}
                >
                  Team Image
                </label>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="files"
                    onChange={(e) => this.onFileChange(e)}
                  />
                  <button
                    className="btn btn-color btn-sm"
                    type="button"
                    onClick={this.uploadImage}
                  >
                    UPLOAD
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <Progress percentage={this.state.uploadPercentage} />
              </div>

              <div className="row m-0 mb-3">
                <label
                  htmlFor="coach"
                  className="form-label p-0"
                  style={{ textAlign: 'left' }}
                >
                  Coach Name
                </label>
                {this.returnSportsCoahList()}

                <Select
                  defaultValue={
                    this.state.coach.length > 0
                      ? this.state.students[0].label
                      : null
                  }
                  isMulti
                  name="students"
                  options={this.state.coaches}
                  className="basic-multi-select"
                  onChange={this.onCoachNameChange}
                  classNamePrefix="select"
                />
              </div>

              <div className="row m-0 mb-3">
                <label
                  htmlFor="teamPlayers"
                  className="form-label p-0"
                  style={{ textAlign: 'left' }}
                >
                  Players Name
                </label>
                {this.returnSportsPlayersList()}

                <Select
                  defaultValue={
                    this.state.students.length > 0
                      ? this.state.students[0].label
                      : null
                  }
                  isMulti
                  name="students"
                  options={this.state.students}
                  className="basic-multi-select"
                  onChange={this.onStudenthNameChange}
                  classNamePrefix="select"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn--pill"
                onClick={this.onSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getallstdentsSports: state.sportReducer.getallstudents,
  getallcoachSports: state.sportReducer.getallcoaches,
  setsport: state.sportReducer.setsport,
  updateSport: state.sportReducer.updateSport,
});

const mapDispatchToProps = (dispatch) => ({
  getAllSportStudent: () => {
    dispatch(getAllSportStudent());
  },
  getAllSportCoach: () => {
    dispatch(getAllSportCoach());
  },
  setSport: (sportData) => {
    dispatch(setSport(sportData));
  },
  updateSport: (sportData) => {
    dispatch(updateSport(sportData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSports);
