import React, {PropTypes} from 'react';
import './subheader.css';

import PeopleSubheader from '../../people/subheader/people-subheader';
import ConnectionsSubheader from '../../connections/subheader/connections-subheader';

class SubHeader extends React.Component {
    render() {
        if (this.props.location === '/connections') {
            return <ConnectionsSubheader />;
        } else {
            return <PeopleSubheader />;
        }

    }
}

SubHeader.propTypes = {
    location: PropTypes.string.isRequired
}

export default SubHeader;