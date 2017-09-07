import React from 'react';
import MediaQuery from 'react-responsive';
import { breakpoints } from '../../config';
import './RelatedContentTitle.css';

const { M } = breakpoints;
let style = {};

const RelatedContentTitle = ({ children }) => {
	return (
		<MediaQuery minWidth={M}>
			{matches => {
				if (matches) {
					style = {
						fontSize: '22px',
						padding: '20px 0'
					};
				}
				return (
					<h1 className="related-content-title" style={style}>
						{children}
					</h1>
				);
			}}
		</MediaQuery>
	);
};

export default RelatedContentTitle;
