import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PersonArticlesAjax from '../../services/person-articles-ajax';
import UuidUtils from '../../services/uuid.utils';
import RelatedContentSingle from './related-content-single';
import RelatedContentMultiple from './related-content-multiple';
import * as relatedContentSingleActions from '../../actions/related-content-single-actions';
import './related-content.css';

class RelatedContent extends React.Component {

    isConnectionsPage() {
        return this.props.location.indexOf('connections') !== -1;
    }

    updateArticlesList() {
        const peopleData = [].concat(this.props.personalisedPeopleData, this.props.mentionedPeopleData),
            connectedPeople = [].concat(this.props.connectedPeopleChain);

        if (connectedPeople.length && peopleData.length) {

            //related content single
            if (connectedPeople.length === 1) {
                this.props.actions.relatedContentSingle.update([]);
                PersonArticlesAjax.fetch(UuidUtils.extract(connectedPeople[0].id), this.props.dateRange).then(response => {
                    this.props.actions.relatedContentSingle.update(response);
                })
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.isConnectionsPage() && (this.props.connectedPeopleChain.length !== nextProps.connectedPeopleChain.length || JSON.stringify(this.props.connectedPeopleChain) !== JSON.stringify(nextProps.connectedPeopleChain));
    }

    componentDidUpdate() {
        this.updateArticlesList();
    }

    render() {
        let template = null;

        if (this.isConnectionsPage() && this.props.connectionsRoot.id) {
            template = <div className="related-content-container">
                <div className="o-grid-container">
                    <div className="o-grid-row">
                        <div className="related-content" data-o-grid-colspan="12">
                            {this.props.connectedPeopleChain.length === 1 && <RelatedContentSingle />}
                            {this.props.connectedPeopleChain.length > 1 && <RelatedContentMultiple />}
                        </div>
                    </div>
                </div>
            </div>
        };

        return template;
    }

}

RelatedContent.propTypes = {
    connectionsRoot: PropTypes.object.isRequired,
    dateRange: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    connectedPeopleChain: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            relatedContentSingle: bindActionCreators(relatedContentSingleActions, dispatch)
        }
    };
}

function mapStateToProps(state) {
    return {
        connectedPeopleChain: state.connectedPeopleChain,
        connectionsRoot: state.connectionsRoot,
        dateRange: state.dateRange,
        mentionedPeopleData: state.mentionedPeopleData,
        personalisedPeopleData: state.personalisedPeopleData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedContent);