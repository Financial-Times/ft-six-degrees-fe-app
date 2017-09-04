import React from 'react';
import MediaQuery from 'react-responsive';
import { breakpoints } from '../../config';
import './PageTitle.css';

const { M } = breakpoints;
let style = {};

const PageTitle = ({ className, children }) => {
	const cls = className ? `page-title ${className}` : `page-title`;
	return (
		<MediaQuery minWidth={M}>
			{matches => {
				if (matches) {
					style = {
						fontSize: '24px',
						padding: '30px 15px'
					};
				}
				return (
					<div className={cls} style={style}>
						{children}
					</div>
				);
			}}
		</MediaQuery>
	);
};

export default PageTitle;
