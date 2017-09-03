import React from 'react';
import PropTypes from 'prop-types';
import { FtButton } from '../../components';
import { PEOPLE_SELECTOR, PEOPLE_DATE_RANGE } from '../../config';
import './PeopleFilter.css';

const PeopleFilter = ({
	dateRange,
	peopleSelector,
	peopleSelectorChange,
	peopleDateRangeChange
}) => {
	const selectorClickHandler = val => e => {
		e.preventDefault();
		peopleSelectorChange(val);
	};
	return (
		<div className="o-grid-row o-grid-row--compact">
			<div
				data-o-grid-colspan="12 S10 M8 XL7 center"
				className="people-filter-wrapper"
			>
				<form className="people-filter-form">
					<fieldset>
						<legend>FILTER</legend>
						<div
							className="people-filter-section"
							data-o-grid-colspan="12 L6"
						>
							<div className="people-filter-label">
								Select people that appear
							</div>
							<div data-colspan="12" className="o-buttons__group">
								{Object.keys(PEOPLE_SELECTOR).map(key => {
									const label = PEOPLE_SELECTOR[key]['LABEL'];
									const value = PEOPLE_SELECTOR[key]['VAL'];
									return (
										<FtButton
											key={key}
											selected={peopleSelector === value}
											label={label}
											className="o-buttons"
											onClick={selectorClickHandler(
												value
											)}
										/>
									);
								})}
							</div>
						</div>
						<div
							className="people-filter-section"
							data-o-grid-colspan="12 L6"
						>
							<div className="people-filter-label">
								from the last
							</div>
							<div className="o-buttons__group">
								{PEOPLE_DATE_RANGE.map(r => {
									return (
										<FtButton
											key={r}
											label={r}
											selected={dateRange === r}
											className="o-buttons ft-button--quarter"
											onClick={e => {
												e.preventDefault();
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
};

PeopleFilter.PropTypes = {
	dateRange: PropTypes.string.isRequired,
	peopleSelector: PropTypes.string.isRequired,
	peopleSelectorChange: PropTypes.func.isRequired,
	peopleDateRangeChange: PropTypes.func.isRequired
};

export default PeopleFilter;
