import React, {PropTypes} from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import { resetConnections } from '../../../actions/dd-connections-actions';
import './connections-subheader.css';

function getToday() {
    return moment().format('dddd, DD MMM');
}

function getFromDate(numberOfDays) {
    return moment().subtract(numberOfDays, 'days').format('dddd, DD MMM');
}

class ConnectionsSubheader extends React.Component {
    startOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.resetConnections();
        browserHistory.push('/');
    }

    getTimescaleString() {
        let timeScaleFrom, timeScaleTo;

        switch (this.props.dateRange) {
            case 'year':
                timeScaleFrom = getFromDate(365);
            break;
            case 'month':
                timeScaleFrom = getFromDate(30);
            break;
            case 'week':
                timeScaleFrom = getFromDate(7);
            break;
            case 'day':
                timeScaleFrom = 'today';
            break;
            default:
                timeScaleFrom = getFromDate(30);
            break;
        }
        return [timeScaleFrom, timeScaleTo || getToday()];
    }

    render() {
        const range = this.getTimescaleString();
        return (
            <div className="connections-subheader">
                <div className="connections-subheader-hint">{this.props.connectionsRoot.abbrName} has <b>10</b> direct associations <span>from <b>{range[0]}</b></span> {range[1] && <span>to <b>{range[1]}</b></span>}</div>
                <div className="connections-subheader-startoverbtn">
                    <a onClick={(e) => this.startOver(e)} className="o-buttons o-buttons--standout o-buttons--big">
                        <i className="fa fa-times"></i>
                        <em>Start over</em>
                    </a>
                </div>
            </div>
        );
    }
}

ConnectionsSubheader.propTypes = {
    connectionsRoot: PropTypes.object,
    dateRange: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        connectionsRoot: state.connectionsRoot,
        dateRange: state.dateRange
    };
}

const mapDispatchToProps = dispatch => {
	return {
		resetConnections: () => {
			dispatch(resetConnections());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionsSubheader);
