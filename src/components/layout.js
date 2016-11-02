import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './common/header/header';
import './layout.css';

class Layout extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                {this.props.children}
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