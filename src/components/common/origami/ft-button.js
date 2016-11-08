import React, {PropTypes} from 'react';
import './ft-button.css';

class FtButton extends React.Component {
    render() {
        const btnClassName = 'ft-button o-buttons ' + this.props.className;

        return <button className={btnClassName} aria-selected={this.props.selected} onClick={() => {this.props.onClick(this)}}>{this.props.label}</button>;
    }
}

FtButton.propTypes = {
    className: PropTypes.string,
    selected: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default FtButton;