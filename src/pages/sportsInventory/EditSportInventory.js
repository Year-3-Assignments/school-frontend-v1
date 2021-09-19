import React, {Component} from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select';
import { getSportForSportInventory , setSportInventory, updateSportInventory } from '../../actions/sportInventoryActions';
import {connect} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';

let formData = {};
const $ = window.$;

const initialState = {
  _id: '',
  name: '',
  sportname: '',
  sports: [],
  dateOfPurchase: '',
  quantity: '',
  selectedSport: [],
  alreadySelectedSportValue: [],
  isFormInvalid: false,
};

class EditSports extends Component{

constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSportNameChange= this.onSportNameChange.bind(this);

    this.onTimeChange = this.onTimeChange.bind(this);

    this.validateResourceForm= this.validateResourceForm.bind(this);
    this.onSubmit= this.onSubmit.bind(this);

    this.removePlayers = this.removePlayers.bind(this);

    this.returnSportsPlayersList = this.returnSportsPlayersList.bind(this);

    this.state = initialState;
  }

  componentDidMount() {
    this.props.getSportForSportInventory();
  }

  componentWillReceiveProps = (nextProps) => {

    if (this.props.setsportinventory !== nextProps.setsportinventory) {

      var sportName = [];
      nextProps.setsportinventory.sportname.map((item, index) => {
        let sport = {
          value: item._id,
          label: item.name,
        };
        sportName.push(sport);
      })

      this.setState({ 
        selectedSport: sportName.map(item => {
          return {
            name: item.label,
          }
        })
      });

      this.setState({ alreadySelectedSportValue: sportName.map(coach => coach.value) });
      
      this.setState({
        _id: nextProps.selectedSportInventory._id,
        name: nextProps.selectedSportInventory.name,
        sportname: nextProps.selectedSportInventory.sportname,
        dateOfPurchase: nextProps.selectedSportInventory.dateOfPurchase,
        quantity: nextProps.selectedSportInventory.quantity,
      });

    }

    if (this.props.updatesportinventory !== nextProps.updatesportinventory) {
      NotificationManager.success("Sport Inventory update successfully");
      this.closeModal();
    }

    if (this.props.getallsports !== nextProps.getallsports) {
      let options = [];
      nextProps.getallsports.map((item, index) => {
        let coach = {
          value: item._id,
          label: <div>&nbsp;{`${item.name}`} </div>
        };
        options.push(coach);
      })
      this.setState({ sports: options });
    }

  }

  onTimeChange(time) {
    this.setState({ purchaseDate: time });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSportNameChange(e) {
    this.setState({ sportname: e ? e.map(coach => coach.value) : [] });
  }

  removePlayers (value) {
    var array = this.state.alreadySelectedSportValue;
    console.log(array)
    array.splice(value, 1);
    this.setState({alreadySelectedSportValue: array});

    var array1 = this.state.selectedSport;
    console.log(array1)
    array1.splice(value, 1);
    this.setState({selectedSport: array1});
    
  }

  returnSportsPlayersList() {
    return (
      <div>
        {this.state.selectedSport.map((item, index) => {
          return (<div className="d-flex flex-row"> <p style={{marginRight: '0.2em'}}> {item.name} </p> <button onClick={() => this.removePlayers(index)}>x</button> </div>)
        })}
      </div>
    )
  }

  validateResourceForm(){
    const data = {
      name: this.state.name && this.state.name.length > 0 ? this.state.name : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  onSubmit = (e) => {
    console.log("It comes here...");
    e.preventDefault();
    if(this.validateResourceForm()){
      let data = Object.values(formData).map(key => {
        return key !== null;
      });

      if(!data.includes(false)){
        let resource = {
          _id: this.state._id,
          name: this.state.name,
          dateOfPurchase: this.state.dateOfPurchase,          
          quantity: this.state.quantity,
          sportname: this.state.alreadySelectedSportValue.concat(this.state.sportname),
        };
        
        console.log(resource);

        // this.props.updateSportInventory(resource);
        NotificationManager.success('Sport Inventory is updated');
        this.closeModal();

      }else{
        this.setState({ isFormInvalid: true});
        NotificationManager.warning('Please fill the input fields!')
      }
    }
  }

  // close sport modal
  closeModal() {
    $('#update-sport').modal('toggle');
  }

  render() {
    const {
      name
    } = this.state;
    return(
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
            <h5 className="modal-title" id="ModalLabel">Update Sports</h5>
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.closeModal}
              />
          </div>
          <div className="modal-body">

            <div className="row m-0 mb-2">
              <label htmlFor="name" className="form-label p-0" style={{textAlign: 'left'}}>Equipment Name</label>
              <input type="text" id="name" className="form-control" name="name" value={name} onChange={this.onChange} />
              {formData.name===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Sport name is required</span> : null}
            </div>

            <div className="row m-0 mb-3">
              <label htmlFor="coach" className="form-label p-0" style={{textAlign: 'left'}}>Sport Name</label>
              {this.returnSportsPlayersList()}

              <Select
                    defaultValue={this.state.sports.length > 0 ? this.state.sports[0].label : null}
                    isMulti
                    name="students"
                    options={this.state.sports}
                    className="basic-multi-select"
                    onChange={this.onSportNameChange}
                    classNamePrefix="select"
              />   

            </div>

            {/* <div className="input-group m-0 mb-2">
                <label
                  htmlFor="numberOfQuestions"
                  className="form-label p-0 m-0"
                >
                  Purchase Date
                </label>
                &nbsp;
                <span>
                  <i className="far fa-calendar-alt"></i>
                </span>
                <DatePicker
                  className="form-control"
                  value={this.state.dateOfPurchase}
                  onChange={this.onTimeChange}
                  dateFormat="MM/dd/yyyy h:mm aa"
                  selected={this.state.dateOfPurchase}
                  showTimeInput
                />

              </div> */}

            <div className="row m-0 mb-2">
              <label htmlFor="quantity" className="form-label p-0" style={{textAlign: 'left'}}>Quantity</label>
              <input type="number" id="quantity" className="form-control" name="quantity" value={this.state.quantity} onChange={this.onChange} />
              {formData.name===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Quantity is required</span> : null}
            </div>

          </div>  

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn--pill" onClick={this.onSubmit}>Update</button>
            </div>
          </div>
        </div>
        <NotificationContainer />
    </div>
   
    )
}
}

const mapStateToProps = state => ({
  getallsports: state.sportInventoryReducer.getallsports,
  setsportinventory: state.sportInventoryReducer.setsportinventory,
  updatesportinventory: state.sportReducer.updatesportinventory
});

const mapDispatchToProps = dispatch => ({
  getSportForSportInventory: () => {
    dispatch(getSportForSportInventory());
  },
  setSportInventory: (sportData) => {
    dispatch(setSportInventory(sportData));
  },
  updateSportInventory: (sportData) => {
    dispatch(updateSportInventory(sportData));
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(EditSports);