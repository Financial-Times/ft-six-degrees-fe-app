import React from 'react';
import ArticleListItem from './ArticleListItem';
import './ArticleList.css';

const ArticleList = ({ articles }) =>
	<div className="o-grid-row article-list">
		{articles.map(a => <ArticleListItem key={a.id} article={a} />)}
	</div>;

export default ArticleList;
