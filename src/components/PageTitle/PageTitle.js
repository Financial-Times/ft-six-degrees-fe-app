import React from 'react';
import './PageTitle.css';

const PageTitle = ({ className, children }) => {
	const cls = className ? `page-title ${className}` : `page-title`;
	return <div className={cls}>{children}</div>;
};

export default PageTitle;
