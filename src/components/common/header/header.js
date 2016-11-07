import React from 'react';
import './header.css';

const Header = () => {
    const isLoggedIn = false, //TODO,
        subheaderCopyInner = isLoggedIn ? 'who you have been reading about' : 'who has made the headlines' ;

    return (
        <div className="header-main">
            <header className="o-header o-header--simple" data-o-component="o-header" data-o-header--no-js="">
                <div className="o-header__row o-header__top">
                    <div className="o-header__container">
                        <div className="o-header__top-wrapper">
                            <div className="o-header__top-column o-header__top-column--center">
                                <a className="o-header__top-logo" href="/" title="Go to Financial Times homepage">
                                    <span className="o-header__visually-hidden">Financial Times</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="o-grid-container">
                <div className="o-grid-row">
                    <div data-o-grid-colspan="12">
                        <h2 className="o-typography-heading1">Use Six Degree's to figure out {subheaderCopyInner}, discover their associations and unearth the stories that connect them</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;