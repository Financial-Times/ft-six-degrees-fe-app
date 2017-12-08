import React from 'react';
import MediaQuery from 'react-responsive';
import { breakpoints } from '../../config';
import { FtButton } from '../Origami/index';

const { M } = breakpoints;

const defaultButtonClasses = ['o-buttons--big'];

const ConnectionsViewSelector = ({
	onConnectionsClick,
	onStoriesClick,
	activeView
}) => (
	<MediaQuery minWidth={M}>
		{matches => {
			const switcherStyle = matches
				? {
						textAlign: 'center',
						padding: '20px 0',
						backgroundColor: '#F2DFCE'
					}
				: {};
			const buttonClasses = matches
				? [...defaultButtonClasses]
				: [...defaultButtonClasses, 'ft-button--half'];
			const connectionsLabel = matches
				? 'View connections'
				: 'Connections';
			const storiesLabel = matches ? 'View stories' : 'Stories';
			return (
				<div className="o-grid-row o-grid-row--compact">
					<div data-o-grid-colspan="12" style={switcherStyle}>
						<FtButton
							className={buttonClasses.join(' ')}
							label={connectionsLabel}
							selected={activeView === 'connections'}
							onClick={onConnectionsClick}
						/>
						<FtButton
							className={buttonClasses.join(' ')}
							selected={activeView === 'stories'}
							label={storiesLabel}
							onClick={onStoriesClick}
						/>
					</div>
				</div>
			);
		}}
	</MediaQuery>
);

export default ConnectionsViewSelector;
