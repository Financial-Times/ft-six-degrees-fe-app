import React from 'react';
import { FtButton } from '../Origami/index';

const MobileViewSelector = ({
	onConnectionsClick,
	onStoriesClick,
	activeView
}) => (
	<div className="o-grid-row o-grid-row--compact">
		<div data-o-grid-colspan="12">
			<FtButton
				className="o-buttons--big ft-button--half"
				label="Connections"
				selected={activeView === 'connections'}
				onClick={onConnectionsClick}
			/>
			<FtButton
				className="o-buttons--big ft-button--half"
				selected={activeView === 'stories'}
				label="Stories"
				onClick={onStoriesClick}
			/>
		</div>
	</div>
);

export default MobileViewSelector;
