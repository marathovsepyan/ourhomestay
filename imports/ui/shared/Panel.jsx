
import React, {Component} from 'react';

// Panel component - represents the whole app
export default class Panel extends Component {

    constructor(props) {
        super(props);
        /*this.state = {
            currentYear:'2016'
        };*/
    }

    render() {
        return (
            <div className={"panel " + this.props.panelClass}>
                <div className="panel-heading separator">
                    <div className="panel-title">
                        {this.props.title}
                    </div>
                </div>
                <div className="panel-body">
                    {this.props.body}
                </div>
            </div>
        );
    }
};

