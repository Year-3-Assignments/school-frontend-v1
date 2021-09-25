import React, {Component} from 'react'
import Progress from './progress/progress';
import firebase from "../../firebase.config";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select';
import { createSport, getAllSportStudent, getAllSportCoach } from '../../actions/sportActions';
import {connect} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

let formData = {};
const $ = window.$;

class AddSports extends Component{

constructor(props) {
    super(props);
    this.state = {
      name: '',
      teamImageUrl: '',
      coach: [],
      coaches: [],
      students: [],
      teamPlayers: [],
      isFormInvalid: false,
      uploadPercentage: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.onCoachNameChange= this.onCoachNameChange.bind(this);
    this.onStudenthNameChange= this.onStudenthNameChange.bind(this);
    this.validateResourceForm= this.validateResourceForm.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {
    this.props.getAllSportStudent();
    this.props.getAllSportCoach();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getallstdentsSports !== nextProps.getallstdentsSports) {
      let options = [];
      nextProps.getallstdentsSports.map((item, index) => {
        let teamPlayer = {
          value: item._id,
          label: <div><img src={item.imageurl} className="thumb-img" />&nbsp;&nbsp;{`${item.firstname} ${item.lastname} Grade:${item.grade}`} </div>
        };
        options.push(teamPlayer);
      })
      this.setState({ students: options });
    }

    if (this.props.getallcoachSports !== nextProps.getallcoachSports) {
      let options = [];
      nextProps.getallcoachSports.map((item, index) => {
        let coach = {
          value: item._id,
          label: <div><img src={item.imageurl} className="thumb-img" />&nbsp;&nbsp;{`${item.firstName} ${item.lastName}`} </div>
        };
        options.push(coach);
      })
      this.setState({ coaches: options });
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setUploadPercentage = (progress) => {
    this.setState({ uploadPercentage: progress });
  }

  onFileChange(e){
    this.setState({ teamImageUrl: e.target.files});
  }

  onCoachNameChange(e) {
    this.setState({ coach: e ? e.map(coach => coach.value) : [] });
  }

  onStudenthNameChange(e) {
    this.setState({ teamPlayers: e ? e.map(student => student.value) : [] });
  }

  uploadImage(e){
    e.preventDefault();
    if(this.state.teamImageUrl.length > 0 ) {
      let folderName = "Resources";
      let files = this.state.teamImageUrl;
      
      for (let i = 0; i < files.length; i++) {
        let upload = firebase.storage().ref(`${folderName}/${uuidv4()}/${files[i].name}`).put(files[i]);

        upload.on('state_changed', (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setUploadPercentage(progress);
        }, (error) => {
          console.log(error);
        }, () => {
          upload.snapshot.ref.getDownloadURL()
          .then(url => {
            this.state.teamImageUrl = url;
            NotificationManager.success('File uploaded successfully')
          });
        });
      }
    } else {
      NotificationManager.warning('Please select a file')
    }
  }

  validateResourceForm(){
    const data = {
      name: this.state.name && this.state.name.length > 0 ? this.state.name : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.validateResourceForm()){
      let data = Object.values(formData).map(key => {
        return key !== null;
      });

      const uniqueId = uuidv4().substring(0, 4);
      console.log(uniqueId);
      if(!data.includes(false)){
        let resource = {
          sportId: uniqueId,
          name: this.state.name,
          teamImageUrl: this.state.teamImageUrl,
          coach: this.state.coach,
          teamPlayers: this.state.teamPlayers,
        };
        
        console.log(resource);

        this.props.createSport(resource);
        NotificationManager.success('New Sport is created');

        this.setState({
          name: [],
          teamImageUrl: [],
          coach: [],
          teamPlayers: [],
        })
        this.closeModal();
      }else{
        this.setState({ isFormInvalid: true});
        NotificationManager.warning('Please fill the input fields!')
      }
    }
  }

    // close create exam modal
    closeModal() {
      $('#create-sport').modal('toggle');
    }

  render() {
    return(
      <div
        className="modal fade"
        id="create-sport"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >        
      <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="ModalLabel">Add Sports</h5>
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.closeModal}
              />
          </div>
          <div className="modal-body">

            <div className="row m-0 mb-2">
              <label htmlFor="name" className="form-label p-0" style={{textAlign: 'left'}}>Sport Name</label>
              <input type="text" id="name" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
              {formData.name===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Sport name is required</span> : null}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label" style={{textAlign: 'left'}}>Team Image</label>
              <div className="input-group">
                <input type="file" className="form-control" id="files" onChange={e => this.onFileChange(e)}/>
                <button className="btn btn-color btn-sm" type="button" onClick={this.uploadImage}>UPLOAD</button>
              </div>
            </div>
            <div className="mb-3">
              <Progress percentage={this.state.uploadPercentage} />
            </div>

            <div className="row m-0 mb-3">
              <label htmlFor="coach" className="form-label p-0" style={{textAlign: 'left'}}>Coach Name</label>
              <Select
                    defaultValue={this.state.coaches.length > 0 ? this.state.coaches[0].label : null}
                    isMulti
                    name="coaches"
                    options={this.state.coaches}
                    className="basic-multi-select"
                    onChange={this.onCoachNameChange}
                    classNamePrefix="select"
                />
            </div>

            <div className="row m-0 mb-2">
              <label htmlFor="teamPlayers" className="form-label p-0" style={{textAlign: 'left'}}>Players Name</label>
              <Select
                    defaultValue={this.state.coaches.length > 0 ? this.state.coaches[0].label : null}
                    isMulti
                    name="students"
                    options={this.state.students}
                    className="basic-multi-select"
                    onChange={this.onStudenthNameChange}
                    classNamePrefix="select"
                />            
            </div>

            <div className="mb-3">
            </div>
            {this.state.image && this.state.image !== '' ?
              <div>
                <img alt="icon" src={this.state.image} className="upload-img" />
              </div>
            :
              null
            }
          </div>  
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn--pill" onClick={this.onSubmit}>Create</button>
            </div>
          </div>
        </div>
        <NotificationContainer />
    </div>
   
    )
}
}

const mapStateToProps = state => ({
  newSport: state.sportReducer.createsport,
  getallstdentsSports: state.sportReducer.getallstudents,
  getallcoachSports: state.sportReducer.getallcoaches

});

const mapDispatchToProps = dispatch => ({
  createSport: sport => {
    dispatch(createSport(sport));
  },
  getAllSportStudent: () => {
    dispatch(getAllSportStudent());
  },
  getAllSportCoach: () => {
    dispatch(getAllSportCoach());
  }

});

export default connect(mapStateToProps,mapDispatchToProps)(AddSports);