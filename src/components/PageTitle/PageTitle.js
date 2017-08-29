import React from 'react';
import './PageTitle.css';

const PageTitle = ({ children, className = '' }) =>
	<h1 className={`page-title ${className}`}>
		{children}
	</h1>;

export default PageTitle;
