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
				onClick={e => {
					document.body.dispatchEvent(
						new CustomEvent('oTracking.event', {
							detail: {
								category: 'root-connection',
								action: 'click',
								id: extractId(person.id)
							},
							bubbles: true
						})
					);
					personClickHandler(e);
				}}
			>
				View connections
			</Link>
		</div>
	</li>
);
export default PeopleDataItem;
