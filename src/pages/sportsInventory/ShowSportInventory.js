import React, { Component } from 'react'
import { NotificationContainer } from 'react-notifications';

const $ = window.$;

export default class ShowSport extends Component {

    // close create exam modal
    closeModal() {
        $('#one-sport').modal('toggle');
    }

    render() {
        return (
            <div
            className="modal fade"
            id="one-sport"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >        
          <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="ModalLabel">{this.props.id.name}</h5>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={this.closeModal}
                  />
              </div>
              <div className="modal-body">

                {this.props.id.sportname && this.props.id.sportname !== '' ?
                (<div>Sports: {this.props.id.sportname.map((item, index) => (
                    <p key={item._id}>{index+1}.&nbsp;{item.name}</p>
                ))} </div> )
                : null }

                <p>Date of Purchase: {this.props.id.dateOfPurchase}</p>

                <p>Quantity: {this.props.id.quantity}</p>

              </div>  
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn--pill" onClick={this.closeModal}>Ok</button>
                </div>
              </div>
            </div>
            <NotificationContainer />
        </div>
       
        )
    }
}
