import React, { Component } from 'react';

export default function(WrappedComponent) {
	return class extends Component {
		constructor(props) {
			super(props);
			this.oTracking = window.Origami['o-tracking'];
			let oTrackingConfig = {
				server: 'https://spoor-api.ft.com/px.gif',
				context: {
					product: 'sixdegrees'
				},
				user: {
					ft_session: this.oTracking.utils.getValueFromCookie(
						/FTSession=([^;]+)/
					)
				}
			};
			this.oTracking.init(oTrackingConfig);
		}
		render() {
			return (
				<WrappedComponent oTracking={this.oTracking} {...this.props} />
			);
		}
	};
}
