import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as peopleGroupActions from '../../../actions/people-group-actions';
import './people-subheader-group.css';
import FtButton from '../../common/origami/ft-button';

class PeopleSubheaderGroup extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.groupButtons = ['mentioned in FT articles', 'based on my behaviour'];
        this.updateGroup = this.updateGroup.bind(this);
    }

    updateGroup(ref) {
        this.props.actions.change(ref.props.label);
    }

    isBtnSelected(group) {
        return this.props.peopleGroup === group;
    }

    getButtonsForLoggedOutState() {
        return <FtButton label="mentioned in FT articles" className="o-buttons--big" onClick={this.updateGroup} selected={this.isBtnSelected('mentioned in FT articles') ? true : false} />
    }

    getButtonsForLoggedInState() {
        return <div className="o-buttons__group">
            {this.groupButtons.map((button, index) => {
                return <FtButton key={index} label={button} className="o-buttons--big" onClick={this.updateGroup} selected={this.isBtnSelected(button) ? true : false} />
            })}
        </div>
    }

    render () {
        const groupButtons = this.props.loginState ? this.getButtonsForLoggedInState() : this.getButtonsForLoggedOutState();

        return (
            <div className="people-subheader-item people-subheader-group">
                {groupButtons}
            </div>
        );
    }
};

PeopleSubheaderGroup.propTypes = {
    loginState: PropTypes.bool.isRequired,
    peopleGroup: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        peopleGroup: state.peopleGroup,
        loginState: state.loginState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(peopleGroupActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSubheaderGroup);