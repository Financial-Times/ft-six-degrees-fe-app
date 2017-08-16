import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRelatedContent } from 'selectors';
import './related-content.css';

const getArticleUrl = (apiUrl) => {
	return apiUrl.replace('api', 'www');
};
const RelatedContentItem = ({article}) => (
	<div data-o-grid-colspan="4">
		<div className="related-content-item">
			<a target="_blank" href={getArticleUrl(article.apiUrl)}>{article.title}</a>
		</div>
	</div>
);

const RelatedContentTitle = ({title}) => (
	<div data-o-grid-colspan="12">
		<div className="related-content-title">
			{title}
		</div>
	</div>
);

let RelatedContent = class extends Component {
	render() {
		const articles = this.props.relatedContent;
		if (!articles || !articles.length) {
			return null;
		}
		const title = `${this.props.activeRootConnection.person.abbrName} appears in ${articles.length} stories`;
		return (
			<div className="related-content o-grid-container">
				<div className="o-grid-row">
					<RelatedContentTitle title={title} />
					{articles.map(a => <RelatedContentItem key={a.id} article={a} />)}
				</div>
			</div>
		);
	}
};

const makeMapStateToProps = (state, ownProps) => {
	const relatedContent = getRelatedContent();
	return {
		relatedContent: relatedContent(state, ownProps),
		activeRootConnection: state.activeRootConnection
	};
};

RelatedContent = connect(
	makeMapStateToProps
)(RelatedContent);

export default RelatedContent;
