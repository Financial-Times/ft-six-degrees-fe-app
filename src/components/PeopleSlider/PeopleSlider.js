import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import PeopleSliderItem from './PeopleSliderItem';
import { Pager } from '../../components';
import './PeopleSlider.css';

const animations = [
	{
		prop: 'scale',
		stops: [[-200, 0.75], [0, 1], [200, 0.75]]
	},
	{
		prop: 'opacity',
		stops: [[-200, 0.15], [0, 1], [200, 0.15]]
	}
];

class PeopleSlider extends Component {
	constructor(props) {
		super(props);
		this.cardClickHandler = this.cardClickHandler.bind(this);
		this.onViewChange = this.onViewChange.bind(this);
	}

	componentDidMount() {
		this.track && this.track.scrollTo(this.props.focusedPersonIndex);
	}

	createPersonClickHandler(index) {
		return e => {
			if (index !== this.props.focusedPersonIndex) {
				e.preventDefault();
			}
		};
	}

	cardClickHandler(index) {
		this.track.scrollTo(index);
	}

	onViewChange([idx]) {
		if (idx !== this.props.focusedPersonIndex) {
			this.props.cardClickHandler(idx);
		}
	}

	createPeopleListView(peopleData) {
		return peopleData.map((p, i) => {
			return (
				<View
					key={i}
					className="view"
					onClick={() => this.cardClickHandler(i)}
				>
					<PeopleSliderItem
						person={p}
						personClickHandler={this.createPersonClickHandler(i)}
					/>
				</View>
			);
		});
	}

	render() {
		const { peopleData, loading, error, focusedPersonIndex } = this.props;
		return (
			<div className="o-grid-row o-grid-row--compact">
				<div data-o-grid-colspan="12">
					<div className="people-data-wrapper">
						{error.length > 0 ? (
							<div>{error}</div>
						) : loading || !peopleData.length ? (
							<div>Loading....</div>
						) : (
							<div>
								<ViewPager tag="main">
									<Frame className="frame">
										<Track
											currentView={0}
											animations={animations}
											ref={c => (this.track = c)}
											onViewChange={this.onViewChange}
											viewsToShow="auto"
											align={0.5}
											className="track"
										>
											{this.createPeopleListView(
												peopleData
											)}
										</Track>
									</Frame>
								</ViewPager>
							</div>
						)}
					</div>
				</div>
				<div data-o-grid-colspan="12">
					<Pager
						pages={peopleData.length}
						current={focusedPersonIndex + 1}
					/>
				</div>
			</div>
		);
	}
}

PeopleSlider.PropTypes = {
	error: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	peopleData: PropTypes.arrayOf(PropTypes.object),
	cardClickHandler: PropTypes.func.isRequired,
	focusedPersonIndex: PropTypes.number.isRequired
};

export default PeopleSlider;
