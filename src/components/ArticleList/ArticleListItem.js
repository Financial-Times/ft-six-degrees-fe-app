import React from 'react';
import { segmentId } from '../../config';
import { getArticleUrl } from '../../helpers/connection';
import FtButton from '../Origami/FtButton/FtButton';
import './ArticleListItem.css';

const ArticleListItem = ({ article }) => {
	const articleUrl = `${article.webUrl ||
		getArticleUrl(article.apiUrl)}?segmentId=${segmentId}`;
	return (
		<div data-o-grid-colspan="12 M6 L4">
			<div className="article-list-item">
				<a target="_blank" href={articleUrl}>
					{article.title || article.standfirst}
				</a>
				<div className="article-list-item-cta">
					<FtButton
						label={'View story'}
						onClick={() => window.open(articleUrl)}
					/>
				</div>
			</div>
		</div>
	);
};

export default ArticleListItem;
