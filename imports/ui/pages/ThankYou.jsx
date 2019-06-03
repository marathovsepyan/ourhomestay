import React, {Component} from 'react';

import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

export default class ThankYouPage extends Component {
	render() {
		return (
			<section className="main-content-wrapper common-layout-box">
				<section className="common-layout-box-wrap thank-you-page">
					<div className="header-wrap">Thank you for your booking</div>
					<article className="common-layout-content">
						<div className="clearfix text-center">
							<a href="/" className="btn primary-btn">Back to Home</a>
						</div>
					</article>
				</section>
			</section>
		)
	}
}
