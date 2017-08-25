import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../../components';

const Header = ({ showLeftIcon, location }) => {
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
							<Link
								className="o-header__top-logo"
								to="/"
								title="go to homepage"
							>
								<span className="o-header__visually-hidden">
									financial times
								</span>
							</Link>
						</div>
						<div className="o-header__top-column o-header__top-column--right">
							<LogoIcon />
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
