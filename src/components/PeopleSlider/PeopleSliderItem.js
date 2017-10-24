import React from 'react';
import { Link } from 'react-router-dom';
import { extractId } from '../../helpers/uuid';
import { Image } from '../Origami';

const PeopleDataItem = ({ person, personClickHandler }) => (
	<li className="people-data-card">
		<div className="people-card-image">
			<Image
				alt={`Portrait of ${person.abbrName}`}
				width={120}
				gravity="faces"
				source="six-degrees"
				height={120}
				src={person.img}
			/>
		</div>
		<div className="people-card-name">{person.abbrName}</div>
		<div className="people-card-cta">
			<Link
				to={`/connections/${extractId(person.id)}`}
				data-trackable={'people-card'}
				onClick={personClickHandler}
			>
				View connections
			</Link>
		</div>
	</li>
);
export default PeopleDataItem;
