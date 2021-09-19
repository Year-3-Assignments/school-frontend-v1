import React, { Component } from 'react'
import { NotificationContainer } from 'react-notifications';
import {
  deleteSportInventory
} from '../../actions/sportInventoryActions';
import {connect} from 'react-redux';

const $ = window.$;

class DeleteSport extends Component {

    // close create exam modal
    closeModal() {
        $('#delete-sport').modal('toggle');
    }

    onSubmit = () => {
        console.log(this.props.id._id)
        this.props.deleteSportInventory(this.props.id);
        this.closeModal()
    }

    render() {
        return (
            <div
            className="modal fade"
            id="delete-sport"
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
                  <label htmlFor="name" className="form-label p-0" style={{textAlign: 'left'}}>Are you Sure You Want to Delete?</label>
                </div>

              </div>  
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn--pill" onClick={this.closeModal}>Cancel</button>
                  <button type="button" className="btn btn-warning btn--pill" onClick={this.onSubmit}>Delete</button>
                </div>
              </div>
            </div>
            <NotificationContainer />
        </div>
       
        )
    }
}

const mapStateToProps = state => ({


});

const mapDispatchToProps = dispatch => ({
  deleteSportInventory: (sportData) => {
    dispatch(deleteSportInventory(sportData));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(DeleteSport);