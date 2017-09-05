import React, { Component } from 'react';
import { FtTabs } from '../Origami';
import { RelatedContentTitle, ArticleList } from '../../components';

class RelatedContent extends Component {
	render() {
		const { tabsData, hideTitle, onTabClick } = this.props;
		return (
			<div className={this.props.className + ' ' + 'o-grid-container'}>
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
