import React, {Component} from 'react';

// Modal component - represents the whole app
export default class Modal extends Component {

    constructor(props) {
        super(props);
        /*this.state = {
            currentYear:'2016'
        };*/
    }

    render() {
        return (

            <div className={`modal fade ${this.props.modalClass}` } id={ this.props.modalId } tabIndex="-1" role="dialog" aria-labelledby="modalSlideUpLabel" aria-hidden="false">
                <div className="modal-dialog ">
                    <div className="modal-content-wrapper">
                        <div className="modal-content">
                            <div className="modal-header clearfix text-left">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                    <i className="fa fa-close fs-14"></i>
                                </button>
                                <h5><span className="bold">{this.props.title}</span></h5>
                                <p className="p-b-10">{this.props.titleExtra}</p>
                            </div>
                            <div className="modal-body">
                                { this.props.body }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        );
    }
};

