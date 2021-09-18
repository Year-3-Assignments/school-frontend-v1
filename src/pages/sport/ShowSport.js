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

                {this.props.id.coach && this.props.id.coach !== '' ?
                (<div>Coachs: {this.props.id.coach.map((item, index) => (
                    <p key={item._id}>{item.firstName} {item.lastName}</p>
                ))} </div> )
                : null }

                {this.props.id.teamPlayers && this.props.id.teamPlayers !== '' ?
                (<div>Team Players: {this.props.id.teamPlayers.map((item, index) => (
                    <p key={item._id}>{index+1}. {item.firstname} {item.lastname} - Grade: {item.grade}</p>
                ))} </div> )
                : null }

                {this.props.id.teamImageUrl && this.props.id.teamImageUrl !== '' ?
                  <div>
                    <img alt="icon" src={this.props.id.teamImageUrl} width="50%" height="50%" className="upload-img" />
                  </div>

                :
                  null
                
                }
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
