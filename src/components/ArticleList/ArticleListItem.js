import React from 'react';
import { getArticleUrl } from '../../helpers/connection';

const ArticleListItem = ({ article }) =>
	<div data-o-grid-colspan="4">
		<div className="related-content-item">
			<a
				target="_blank"
				href={article.webUrl || getArticleUrl(article.apiUrl)}
			>
				{article.title}
			</a>
		</div>
	</div>;

export default ArticleListItem;
