import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { ShareIcon } from '../../components';
import { Share } from '../Origami';
import { SHARE_TEXT } from '../../config';

const Header = ({ showLeftIcon, location, shareClickHandler, showShare }) => {
	return (
		<header
			className="o-header o-header--simple"
			data-o-component="o-header"
			data-o-header--no-js=""
		>
			<div className="o-header__row o-header__top">
				<div className="o-header__container">
					<div className="o-header__top-wrapper">
						<div className="o-header__top-column o-header__top-column--left">
							{showLeftIcon(location.pathname)}
						</div>
						<div className="o-header__top-column o-header__top-column--center">
							<a
								className="o-header__top-logo"
								href={'https://ft.com'}
								data-trackable={'ft.com'}
								title="go to FT.com"
							>
								<span className="o-header__visually-hidden">
									financial times
								</span>
							</a>
						</div>
						<div className="o-header__top-column o-header__top-column--right">
							<ShareIcon onShareClick={shareClickHandler} />
							{showShare ? (
								<Share
									text={SHARE_TEXT}
									link={window.location.origin}
								/>
							) : (
								''
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

Header.PropTypes = {
	showLeftIcon: PropTypes.func.isRequired,
	location: PropTypes.string.isRequired
};

export default Header;
