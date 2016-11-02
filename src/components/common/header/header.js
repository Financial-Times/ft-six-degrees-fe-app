import React from 'react';
import {Link, IndexLink} from 'react-router';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <header className="o-header-services" data-o-component="o-header">
                <div className="o-header-services__top o-header-services__container">
                    <div className="o-header-services__ftlogo"></div>
                    <div className="o-header-services__title animated fadeIn">
                        <h1 className="o-header-services__product-name">Six Degrees</h1><span className="o-header-subrand__product-tagline ">Internal debugging tool</span>
                    </div>
                </div>
            </header>
            <nav className="navigation">
                <IndexLink to="/" activeClassName="active" className="o-buttons">Home</IndexLink>
                <Link to="/subpage" activeClassName="active" className="o-buttons">Example Subpage</Link>
            </nav>
        </div>
    );
};

export default Header;