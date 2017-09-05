import React from 'react';
import './Pager.css';

const Pager = props =>
	<div className="pager">
		<strong>{props.current}</strong> of {props.pages}
	</div>;

export default Pager;
