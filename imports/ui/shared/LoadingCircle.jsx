import React, {Component} from 'react';

// LoadingCircle component - represents the whole app
export default class LoadingCircle extends Component {

    constructor(props) {
        super(props);
        /*this.state = {
         currentYear:'2016'
         };*/
    }

    render() {
        return (
            <img className="image-responsive-height demo-mw-50" src="/img/demo/progress.svg" alt="Progress" />
        );
    }
};








