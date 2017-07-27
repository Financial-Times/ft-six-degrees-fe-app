import React from 'react';
import PropTypes from 'prop-types';
import './share-button.css';

class ShareButton extends React.Component {
    render() {
        const iconClassName = 'share-button fa fa-' + this.props.icon;

        return (
            <a href={this.props.href} className={iconClassName} target="_blank">{this.props.label}</a>
        );
    }
}

ShareButton.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string
};

export default ShareButton;
