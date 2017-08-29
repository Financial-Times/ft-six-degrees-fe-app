import React from 'react';
import './Pager.css';

const Pager = props =>
	<div data-o-grid-colspan="12">
		<div className="pager">
			<strong>{props.current}</strong> of {props.pages}
		</div>
	</div>;

export default Pager;
