import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import './header.css';

class Header extends React.Component {

    getHeaderCopyInner() {
        return this.props.peopleGroup === 'based on my behaviour' ? 'who you have been reading about' : 'who has made the headlines';
    }

    render() {
        const pageClassName = this.props.location ? 'page-' + this.props.location.replace('/', '') : 'page-people';

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
                        <div className={pageClassName} data-o-grid-colspan="12">
                            <h2 className="o-typography-heading1">Use Six Degree's to figure out <span className="header-copy-inner page-people-inner"><em>{this.getHeaderCopyInner()}</em><b></b></span>, <span className="header-copy-inner page-connections-inner"><em>discover their associations</em><b></b></span> and unearth the stories that connect them</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

Header.propTypes = {
    peopleGroup: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        peopleGroup: state.peopleGroup
    };
}

export default connect(mapStateToProps)(Header);