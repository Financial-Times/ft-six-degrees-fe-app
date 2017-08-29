import React from 'react';


const ArticleListItem = ({ article }) => (
	<div data-o-grid-colspan="4">
		<div className="related-content-item">
			<a target="_blank" href={article.webUrl}>{article.title}</a>
		</div>
	</div>
);

export default ArticleListItem;
