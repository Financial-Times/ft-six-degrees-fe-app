import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { FtButton } from '../../components';
import { PEOPLE_DATE_RANGE, breakpoints } from '../../config';
import './PeopleFilter.css';

const { M } = breakpoints;
let peopleFilterWrapperStyles = {};

const PeopleFilter = ({
	dateRange,
	peopleSelector,
	peopleSelectorChange,
	peopleDateRangeChange
}) => {
	const content = (
		<div className="o-grid-row o-grid-row--compact">
			<div
				data-o-grid-colspan="12 S10 M8 L6 center"
				className="people-filter-wrapper"
				style={peopleFilterWrapperStyles}
			>
				<form className="people-filter-form">
					<fieldset>
						<legend>FILTER</legend>
						<div className="people-filter-section" data-o-grid-colspan="12">
							<div className="people-filter-label">from the last</div>
							<div className="o-buttons__group">
								{PEOPLE_DATE_RANGE.map(r => {
									return (
										<FtButton
											key={r}
											label={r}
											selected={dateRange === r}
											className="ft-button--quarter"
											onClick={e => {
												e.preventDefault();
												document.body.dispatchEvent(
													new CustomEvent('oTracking.event', {
														detail: {
															category: 'date-filter',
															action: 'click',
															id: r
														},
														bubbles: true
													})
												);
												peopleDateRangeChange(r);
											}}
										/>
									);
								})}
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
	return (
		<MediaQuery minWidth={M}>
			{matches => {
				if (matches) {
					peopleFilterWrapperStyles = {
						margin: '40px auto 100px auto'
					};
				}
				return content;
			}}
		</MediaQuery>
	);
};

PeopleFilter.PropTypes = {
	dateRange: PropTypes.string.isRequired,
	peopleSelector: PropTypes.string.isRequired,
	peopleSelectorChange: PropTypes.func.isRequired,
	peopleDateRangeChange: PropTypes.func.isRequired
};

export default PeopleFilter;
