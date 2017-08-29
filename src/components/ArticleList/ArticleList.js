import React from 'react';
import ArticleListItem from './ArticleListItem';
import './ArticleList.css';

const ArticleList = ({ articles }) =>
	<div className="related-content o-grid-container">
		<div className="o-grid-row">
			{articles.map(a => <ArticleListItem key={a.id} article={a} />)}
		</div>
	</div>;

export default ArticleList;
