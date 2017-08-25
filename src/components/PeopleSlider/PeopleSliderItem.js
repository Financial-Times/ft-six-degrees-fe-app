import React from 'react';
import { Link } from 'react-router-dom';
import { extractId } from '../../helpers/uuid';
import { getImageUrl } from '../../helpers/image';

const PeopleDataItem = ({ person, personClickHandler }) =>
	<li className="people-data-card">
		<div className="people-card-image">
			<img
				alt={`Portrait of ${person.abbrName}`}
				src={getImageUrl(person.img)}
			/>
		</div>
		<div className="people-card-name">
			{person.abbrName}
		</div>
		<div className="people-card-details">
			{person.articles} articles to read
		</div>
		<div className="people-card-cta">
			<Link
				to={`/connections/${extractId(person.id)}`}
				onClick={personClickHandler}
			>
				View connections
			</Link>
		</div>
	</li>;
export default PeopleDataItem;
