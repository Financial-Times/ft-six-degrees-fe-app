import React from 'react';
import moment from 'moment';
import './related-content-link.css';

function getDate(date) {
    return moment().diff(date, 'days') < 15 ? moment(date).fromNow() : moment(date).format('MMMM DD, YYYY');
}

const RelatedContentLink = ({article}) => {
    return (
        <li className="related-content-link">
            <a href={article.webUrl} target="_blank">
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <span className="related-content-link-title">{article.title}</span>
                <span className="related-content-link-divider">|</span>
                <span className="related-content-published">{getDate(article.publishedDate)}</span>
            </a>
        </li>
    );
};

export default RelatedContentLink;