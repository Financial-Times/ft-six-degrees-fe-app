import React, { PropTypes } from 'react';
import './people-subheader-select.css';

const SubheaderSelect = ({ peopleRangeList, peopleRange, peopleRangeUpdate }) => (
	<div className="people-subheader-item people-subheader-select">
		<span>Select</span>
		<span className="o-forms">
                    <select id="o-forms__select-standard" className="o-forms__select" defaultValue={peopleRange} onChange={(e) => peopleRangeUpdate(parseInt(e.target.value, 10))}>
	                    { peopleRangeList.map(val => <option key={val} value={val}>{val}</option>) }
                    </select>
                </span>
		<span>people</span>
	</div>
);

SubheaderSelect.propTypes = {
	peopleRangeList: PropTypes.array.isRequired,
	peopleRange: PropTypes.number,
	peopleRangeUpdate: PropTypes.func.isRequired
};

export default SubheaderSelect;

