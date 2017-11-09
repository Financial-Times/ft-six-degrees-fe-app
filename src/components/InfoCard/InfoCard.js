import React from 'react';
import './InfoCard.css';

const InfoCard = ({ style }) => (
	<div className="o-grid-container">
		<div className="o-grid-row">
			<div data-o-grid-colspan="12">
				<div className="info-card" style={style}>
					Six Degrees is still in beta. Help us improve by{' '}
					<a
						data-trackable={'feedback'}
						href="https://financiatimescx.eu.qualtrics.com/jfe/form/SV_87cjlQeMMZkdoW1"
						target={'_blank'}
					>
						sharing your feedback
					</a>.
				</div>
			</div>
		</div>
	</div>
);

export default InfoCard;
