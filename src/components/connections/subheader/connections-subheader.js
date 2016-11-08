import React from 'react';
import {browserHistory} from 'react-router';
import './connections-subheader.css';

class ConnectionsSubheader extends React.Component {
    startOver(event) {
        event.preventDefault();
        event.stopPropagation();
        browserHistory.push('/');
    }

    render() {
        return (
            <div className="connections-subheader">
                <div className="connections-subheader-hint">Hillary Clinton has 10 direct associations from today</div>
                <div className="connections-subheader-startoverbtn">
                    <a href="/people" onClick={this.startOver} className="o-buttons o-buttons--standout o-buttons--big">
                        <i className="fa fa-times"></i>
                        <em>Start over</em>
                    </a>
                </div>
            </div>
        );
    }
};

export default ConnectionsSubheader;