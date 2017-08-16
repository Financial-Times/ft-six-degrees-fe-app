import React, { Component } from 'react';
import PeopleFilterContainer from 'components/people/filter/people-filter-container';
import { connect } from 'react-redux';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import { loadPeople } from 'actions/people-data-actions';
import './people-main.css';
import { getImageUrl } from '../../../services/image-service';
import { CONFIG } from '../../../config-constants';

const PeopleDataItem = ({ person, personClickHandler }) => (
	<li className="people-data-card">
		<div className="people-card-image">
			<img src={getImageUrl(person.img)} />
		</div>
		<div className="people-card-name">
			{person.abbrName}
		</div>
		<div className="people-card-details">
			{person.articles} articles to read
		</div>
		<div className="people-card-cta">
			<a onClick={(e) => {
				e.preventDefault();
				// should be deprecated when react-router updated
				personClickHandler(person.id)
			}} href="#">View connections</a>
		</div>
	</li>
);


const animations = [{
	prop: 'scale',
	stops: [
		[-200, 0.75],
		[0, 1],
		[200, 0.75]
	]
}, {
	prop: 'opacity',
	stops: [
		[-200, 0.15],
		[0, 1],
		[200, 0.15]
	]
}];

let PeopleContainer = class extends Component {

	constructor() {
		super();
		this.personClickHandler = this.personClickHandler.bind(this);

		this.state = {
			activeIndex: 0
		};
	}

	loadData() {
		let {
			    loadPeople
		    } = this.props;

		return loadPeople();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.peopleRange !== this.props.peopleRange) {
			this.track.scrollTo(0);
		}
	}

	componentDidMount() {
		this.loadData();
	}

	personClickHandler(id) {
		if (id) {
			const uuid = id.replace('http://api.ft.com/things/', '');
			this.props.router.push('/connections/' + uuid);
		}
	}

	clickHandler(i) {
		this.setState({activeIndex: i});
		this.track.scrollTo(i);
	}

	render() {
		const { personalisedPeopleData, mentionedPeopleData, peopleRange } = this.props;
		let peopleData = personalisedPeopleData.length ? personalisedPeopleData : mentionedPeopleData;
		peopleData = peopleData.slice(0, peopleRange);
		if (!peopleData.length) {
			return <div>Loading...</div>;
		}
		return (
			<div className="o-grid-row">
				<div data-o-grid-colspan="12">
					<div className="people-data-wrapper">
						<ViewPager tag="main">
							<Frame className="frame">
								<Track
									currentView={0}
									animations={animations}
									ref={c => this.track = c}
									viewsToShow='auto'
									align={0.5}
									className="track">
									{
										peopleData.map((p, i) => {
											let pHandler = () => {};
											if(!p.img) {
												p = {...p, img: CONFIG.PLACEHOLDER_IMG}
											}
											if (this.state.activeIndex === i) {
												pHandler = this.personClickHandler;
											}
											return (
												<View
													key={i}
													className="view"
													onClick={() => this.clickHandler(i)}>
													<PeopleDataItem
														person={p}
														personClickHandler={pHandler} />
												</View>
											);
										})
									}
								</Track>
							</Frame>
						</ViewPager>
					</div>
				</div>
				<div data-o-grid-colspan="12">
					<PeopleFilterContainer/>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => ({
	mentionedPeopleData: state.mentionedPeopleData,
	personalisedPeopleData: state.personalisedPeopleData,
	peopleRange: state.peopleRange,
	loginState: state.loginState
});

PeopleContainer = connect(
	mapStateToProps,
	{
		loadPeople
	}
)(PeopleContainer);

export default PeopleContainer;
