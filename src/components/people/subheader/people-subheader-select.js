import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as peopleRangeActions from 'actions/people-range-actions';
import './people-subheader-select.css';

class PeopleSubheaderSelect extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.updateRange = this.updateRange.bind(this);
	}

	updateRange(event) {
		let { peopleRangeUpdate } = this.props;
		peopleRangeUpdate(parseInt(event.target.value, 10));
	}

	render() {
		return (
			<div className="people-subheader-item people-subheader-select">
				<span>Select</span>
				<span className="o-forms">
                    <select id="o-forms__select-standard" className="o-forms__select" defaultValue={this.props.peopleRange} onChange={this.updateRange}>
                        <option value="20">20</option>
                        <option value="10">10</option>
                        <option value="5">5</option>
                        <option value="1">1</option>
                    </select>
                </span>
				<span>people</span>
			</div>
		);
	}
}

PeopleSubheaderSelect.propTypes = {
	peopleRange: PropTypes.number.isRequired,
	peopleRangeUpdate: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		peopleRange: state.peopleRange
	};
}

function mapDispatchToProps(dispatch) {
	return {
		peopleRangeUpdate: (val) => dispatch(peopleRangeActions.change(val))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSubheaderSelect);
