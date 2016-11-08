import React from 'react';
import {Link} from 'react-router';
import './people-graph-container.css';

class PeopleGraphContainer extends React.Component {
    render() {
        return (
            <div className="people-graph-container">
                People graph
                <p>
                    <Link to="/connections" className="o-typography-link" activeClassName="active">Hillary Clinton</Link>
                </p>
            </div>
        );
    }
}

export default PeopleGraphContainer;