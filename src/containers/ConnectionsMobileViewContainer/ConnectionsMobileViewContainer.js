import React, { Component } from 'react';
import {
	PageTitle,
	MobileViewSelector,
	ConnectionsGraph,
	RelatedContent
} from '../../components';

class ConnectionsMobileView extends Component {
	constructor(props) {
		super(props);
		this.connectionsClickHandler = this.connectionsClickHandler.bind(this);
		this.storiesClickHandler = this.storiesClickHandler.bind(this);
		this.contentTabClickHandler = this.contentTabClickHandler.bind(this);
		this.state = {
			activeView: 'connections',
			activeStoriesTitle: ''
		};
	}

	connectionsClickHandler() {
		this.setState(() => {
			return {
				activeView: 'connections',
				activeStoriesTitle: ''
			};
		});
	}

	storiesClickHandler() {
		this.setState(() => {
			return {
				activeView: 'stories'
			};
		});
	}

	contentTabClickHandler(title) {
		this.setState(() => {
			return {
				activeStoriesTitle: title
			};
		});
	}

	render() {
		const {
			getTitleText,
			getGraph,
			onNodeClick,
			relatedContent,
			getTabsData
		} = this.props;
		const { activeView, activeStoriesTitle } = this.state;
		const tabsData = getTabsData(relatedContent);
		return (
			<div>
				{activeView === 'connections' ? (
					<PageTitle>{getTitleText()}</PageTitle>
				) : activeView === 'stories' ? (
					<PageTitle>
						{activeStoriesTitle ||
							tabsData[tabsData.length - 1].title}
					</PageTitle>
				) : (
					''
				)}
				<MobileViewSelector
					onConnectionsClick={this.connectionsClickHandler}
					onStoriesClick={this.storiesClickHandler}
					activeView={activeView}
				/>
				<ConnectionsGraph
					className={activeView !== 'connections' ? 'hidden' : ''}
					loading={this.props.connections.isFetching}
					graph={getGraph()}
					onNodeClick={onNodeClick()}
				/>
				<RelatedContent
					onTabClick={this.contentTabClickHandler}
					className={activeView !== 'stories' ? 'hidden' : ''}
					hideTitle={true}
					tabsData={tabsData}
				/>
			</div>
		);
	}
}

export default ConnectionsMobileView;
