import React, { Component } from 'react';
import { FtTabs } from '../Origami';
import { RelatedContentTitle, ArticleList, InfoCard } from '../../components';

class RelatedContent extends Component {
	render() {
		const { tabsData, hideTitle, onTabClick, activeView } = this.props;
		const storiesClassName =
			activeView && activeView !== 'stories' ? 'hidden' : '';
		let styleOverride = {};
		if (activeView) {
			styleOverride = {
				height: '100%',
				minHeight: '600px'
			};
		}
		return (
			<div className={storiesClassName} style={styleOverride}>
				<div className="o-grid-container">
					<div className="o-grid-row">
						<div data-o-grid-colspan="12">
							{tabsData ? tabsData.length > 1 ? (
								<div>
									<FtTabs
										onTabClick={onTabClick}
										hideTitle={hideTitle}
										content={tabsData}
									/>
								</div>
							) : (
								<div>
									{hideTitle === true ? (
										''
									) : (
										<RelatedContentTitle>
											{tabsData[0].title}
										</RelatedContentTitle>
									)}
									<ArticleList
										articles={tabsData[0].articles}
									/>
								</div>
							) : null}
						</div>
					</div>
				</div>
				<InfoCard />
			</div>
		);
	}
}

export default RelatedContent;
