import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ArticleList } from '../../index';
import { RelatedContentTitle } from '../../index';
import './FtTabs.css';

const showTabs = (content, onTabClick = () => {}) => {
	if (!isEmpty(content)) {
		return content.map((item, idx) => {
			return (
				<li
					key={item.id}
					role="tab"
					onClick={() => onTabClick(item.title)}
					aria-selected={idx === content.length - 1}
				>
					<a href={`#${item.id}`}>{item.label}</a>
				</li>
			);
		});
	}
};
const showTabPanels = (content, hideTitle = false) => {
	return content.map(item => {
		return (
			<div key={item.id} id={item.id} className="o-tabs__tabpanel">
				{hideTitle ? (
					''
				) : (
					<RelatedContentTitle>{item.title}</RelatedContentTitle>
				)}
				<ArticleList articles={item.articles} />
			</div>
		);
	});
};
class FtTabs extends Component {
	componentDidMount() {
		this.tabs = window.Origami['o-tabs'].init()[0];
	}
	componentDidUpdate() {
		this.tabs && this.tabs.destroy();
		this.tabs = window.Origami['o-tabs'].init()[0];
		this.tabs.selectTab(this.tabs.tabEls.length - 1);
	}
	render() {
		const { content, hideTitle, onTabClick } = this.props;
		return (
			<div className="tabs-container">
				<ul
					data-o-component="o-tabs"
					className="o-tabs o-tabs--buttontabs"
					role="tablist"
				>
					{showTabs(content, onTabClick)}
				</ul>
				{showTabPanels(content, hideTitle)}
			</div>
		);
	}
}

export default FtTabs;
