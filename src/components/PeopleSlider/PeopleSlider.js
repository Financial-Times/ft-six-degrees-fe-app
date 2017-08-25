import React, { Component } from 'react';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import PeopleSliderItem from './PeopleSliderItem';
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
	}

	componentDidMount() {
		this.track && this.track.scrollTo(this.props.focusedPersonIndex);
	}

	componentDidUpdate() {
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
		this.props.cardClickHandler(index);
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
		const { peopleData, loading, error } = this.props;
		return (
			<div className="o-grid-row">
				<div data-o-grid-colspan="12">
					<div className="people-data-wrapper">
						{error.length > 0
							? <div>
									{error}
								</div>
							: loading || !peopleData.length
								? <div>Loading....</div>
								: <ViewPager tag="main">
										<Frame className="frame">
											<Track
												currentView={0}
												animations={animations}
												ref={c => (this.track = c)}
												viewsToShow="auto"
												align={0.5}
												className="track"
											>
												{this.createPeopleListView(
													peopleData
												)}
											</Track>
										</Frame>
									</ViewPager>}
					</div>
				</div>
			</div>
		);
	}
}
export default PeopleSlider;
