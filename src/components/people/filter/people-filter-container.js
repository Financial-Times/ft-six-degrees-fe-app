import React, { Component } from 'react';
import FtButton from 'components/common/origami/ft-button';
import './people-filter.css';

let PeopleFilterContainer = class extends Component {
	render() {
		return (
			<div className="people-filter-wrapper">
				<form className="people-filter-form">
					<fieldset>
						<legend>FILTER</legend>
						<div className="people-filter-section" data-o-grid-colspan="6">
							<div className="people-filter-label">Select people that appear</div>
							<div data-colspan="6" className="o-buttons__group">
								<FtButton label="in stories I have read" className="o-buttons" />
								<FtButton label="in stories on FT.com" className="o-buttons" />
							</div>
						</div>
						<div className="people-filter-section" data-o-grid-colspan="6">
							<div className="people-filter-label">from the last</div>
							<div className="o-buttons__group">
								<FtButton label="7 days" className="o-buttons" />
								<FtButton label="14 days" className="o-buttons" />
								<FtButton label="month" selected="true" className="o-buttons" />
								<FtButton label="6 months" className="o-buttons" />
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
};

export default PeopleFilterContainer;
