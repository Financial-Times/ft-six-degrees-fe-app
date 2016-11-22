import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import './related-content.css';

class RelatedContent extends React.Component {

    isConnectionsPage() {
        return this.props.location.indexOf('connections') !== -1;
    }

    updateArticlesList() {
        const peopleData = [].concat(this.props.personalisedPeopleData, this.props.mentionedPeopleData),
            connectedPeople = [].concat(this.props.connectedPeopleChain);

        if (connectedPeople.length && peopleData.length) {
            console.log('updating articles', connectedPeople);
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.isConnectionsPage() && (this.props.connectedPeopleChain.length !== nextProps.connectedPeopleChain.length || JSON.stringify(this.props.connectedPeopleChain) !== JSON.stringify(nextProps.connectedPeopleChain));
    }

    componentDidUpdate() {
        this.updateArticlesList();
    }

    render() {
        return this.isConnectionsPage() && <div>
            related content
        </div>;
    }

}

RelatedContent.propTypes = {
    location: PropTypes.string.isRequired,
    connectedPeopleChain: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        connectedPeopleChain: state.connectedPeopleChain,
        mentionedPeopleData: state.mentionedPeopleData,
        personalisedPeopleData: state.personalisedPeopleData
    };
}

export default connect(mapStateToProps)(RelatedContent);