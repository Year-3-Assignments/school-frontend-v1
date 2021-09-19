import React, {Component} from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select';
import { createSportInventory, getSportForSportInventory } from '../../actions/sportInventoryActions';
import {connect} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';

let formData = {};
const $ = window.$;

class AddSportsInventory extends Component{

constructor(props) {
    super(props);
    this.state = {
      name: '',
      sportname: [],
      sports: [],
      purchaseDate: '',
      quantity: '',
      isFormInvalid: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSportNameChange= this.onSportNameChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.validateResourceForm= this.validateResourceForm.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getSportForSportInventory();
  }

  componentWillReceiveProps = (nextProps) => {

    if (this.props.getallsports !== nextProps.getallsports) {
      let options = [];
      nextProps.getallsports.map((item, index) => {
        let sportData = {
          value: item._id,
          label: <div>&nbsp;&nbsp;{`${item.name}`} </div>
        };
        options.push(sportData);
      })
      this.setState({ sports: options });
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSportNameChange(e) {
    this.setState({ sportname: e ? e.map(sport => sport.value) : [] });
  }

  onTimeChange(time) {
    this.setState({ purchaseDate: time });
  }


  validateResourceForm(){
    const data = {
      name: this.state.name && this.state.name.length > 0 ? this.state.name : null,
      // sportname: this.state.sportname && this.state.sportname.length > 0 ? this.state.sportname : null,
      quantity: this.state.quantity && this.state.quantity.length > 0 ? this.state.quantity : null,

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

      if(!data.includes(false)){
        let resource = {
          name: this.state.name,
          sportname: this.state.sportname,
          dateOfPurchase: this.state.purchaseDate,
          quantity: this.state.quantity,
        };
        
        console.log(resource);

        this.props.createSportInventory(resource);
        NotificationManager.success('New Sport Inventory is created');

        this.setState({
          name: '',
          sportname: '',
          purchaseDate: '',
          quantity: '',
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
    const {
      name,
      sportname,
      sports,
      purchaseDate,
      quantity,
    } = this.state;
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
              <label htmlFor="name" className="form-label p-0" style={{textAlign: 'left'}}>Equipment Name</label>
              <input type="text" id="name" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
              {formData.name===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Sport name is required</span> : null}
            </div>

            <div className="row m-0 mb-2">
              <label htmlFor="teamPlayers" className="form-label p-0" style={{textAlign: 'left'}}>Sport Name</label>
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

              <div className="input-group m-0 mb-2">
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
                  value={purchaseDate}
                  onChange={this.onTimeChange}
                  dateFormat="MM/dd/yyyy h:mm aa"
                  selected={purchaseDate}
                  showTimeInput
                />

                {/* {formData.purchaseDate === null && isFormInvalid ? (
                  <span className="text-danger p-0 m-0">
                    <small>{'Purchase Date Required..!'}</small>
                  </span>
                ) : null} */}

              </div>

              <div className="row m-0 mb-2">
              <label htmlFor="quantity" className="form-label p-0" style={{textAlign: 'left'}}>Quantity</label>
              <input type="number" id="quantity" className="form-control" name="quantity" value={this.state.quantity} onChange={this.onChange} />
              {formData.name===null && this.state.isFormInvalid ? <span className="text-danger validation-text p-0">Quantity is required</span> : null}
            </div>

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
  newSportInventory: state.sportInventoryReducer.createsportinventory,
  getallsports: state.sportInventoryReducer.getallsports
});

const mapDispatchToProps = dispatch => ({
  createSportInventory: sportInventory => {
    dispatch(createSportInventory(sportInventory));
  },
  getSportForSportInventory: () => {
    dispatch(getSportForSportInventory());
  }

});

export default connect(mapStateToProps,mapDispatchToProps)(AddSportsInventory);