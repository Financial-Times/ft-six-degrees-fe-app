import React, { Component } from 'react';
import { FtTabs } from '../Origami';
import { RelatedContentTitle, ArticleList } from '../../components';
import isEmpty from 'lodash/isEmpty';
import { getLastName } from '../../helpers/connection';

class RelatedContent extends Component {
	getTabsData(content) {
		if (!isEmpty(content)) {
			const rootIds = Object.keys(content);
			return rootIds.reduce((agg, rootId, idx) => {
				let item = {};
				item['id'] = rootId;
				item['articles'] = content[rootId].content;
				item['label'] =
					idx > 0
						? `${getLastName(
								content[rootIds[idx - 1]]
							)} & ${getLastName(content[rootId])}`
						: getLastName(content[rootId]);
				item['title'] =
					idx > 0
						? `${getLastName(
								content[rootIds[idx - 1]]
							)} appears in ${content[rootId].content
								.length} articles with ${getLastName(
								content[rootId]
							)}`
						: `${getLastName(content[rootId])} appears in ${content[
								rootId
							].content.length} articles`;
				return [...agg, item];
			}, []);
		}
	}
	render() {
		const tabsData = this.getTabsData(this.props.content);
		return (
			<div className="o-grid-container">
				<div className="o-grid-row">
					<div data-o-grid-colspan="12">
						{tabsData ? tabsData.length > 1 ? (
							<div>
								<FtTabs content={tabsData} />
							</div>
						) : (
							<div>
								<RelatedContentTitle>
									{tabsData[0].title}
								</RelatedContentTitle>
								<ArticleList articles={tabsData[0].articles} />
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

export default RelatedContent;
