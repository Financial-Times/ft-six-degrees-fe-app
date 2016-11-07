import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './common/header/header';
import Footer from './common/footer/footer';
import SubHeader from './common/subheader/subheader';
import Hint from './common/hint/hint';
import Share from './common/share/share';
import Legend from './common/legend/legend';
import '../assets/css/font-awesome.min.css';
import './layout.css';

class Layout extends Component {
    render() {
         return (
            <div className="layout-wrapper">
                <Header />
                <div className="o-grid-container">
                    <div className="o-grid-row">
                        <div data-o-grid-colspan="12">
                            <SubHeader location={this.props.location.pathname} />
                        </div>
                    </div>
                </div>
                <div className="o-grid-container">
                    <div className="o-grid-row">
                        <div data-o-grid-colspan="12">
                            <Hint location={this.props.location.pathname} />
                        </div>
                    </div>
                </div>
                <div className="o-grid-container main-container">
                    {this.props.children}
                    <aside className="aside">
                        <Share />
                        <Legend location={this.props.location.pathname} />
                    </aside>
                </div>
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Layout);