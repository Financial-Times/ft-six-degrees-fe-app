import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PEOPLE_SELECTOR } from '../../config';
import {
	loadPeople,
	setFocusedPersonIndex,
	peopleSelectorChange,
	setPeopleError,
	peopleDateRangeChange
} from '../../redux/modules/people';
import { PeopleFilter, PageTitle, PeopleSlider } from '../../components';

class PeopleContainer extends Component {
	componentDidMount() {
		const { people, loadPeople } = this.props;
		if (people[`${people.peopleSelector}People`].length === 0) {
			loadPeople();
		}
	}

	render() {
		const {
			people,
			setFocusedPersonIndex,
			peopleSelectorChange,
			peopleDateRangeChange
		} = this.props;
		const titleText =
			people.peopleSelector === PEOPLE_SELECTOR.DEFAULT.VAL
				? 'Most featured people in stories on FT.com'
				: 'Most featured people in stories you have read';
		const peopleData = people[people.peopleSelector + 'People'];

		return (
			<div>
				<PageTitle>
					{titleText}
				</PageTitle>
				<div className="o-grid-container">
					<PeopleSlider
						error={people.error}
						loading={people.isFetching}
						peopleData={peopleData}
						cardClickHandler={setFocusedPersonIndex}
						focusedPersonIndex={people.focusedPersonIndex}
					/>
					<PeopleFilter
						dateRange={people.dateRange}
						peopleSelector={people.peopleSelector}
						peopleSelectorChange={peopleSelectorChange}
						peopleDateRangeChange={peopleDateRangeChange}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	people: state.people
});

export default connect(mapStateToProps, {
	setFocusedPersonIndex,
	setPeopleError,
	loadPeople,
	peopleSelectorChange,
	peopleDateRangeChange
})(PeopleContainer);
