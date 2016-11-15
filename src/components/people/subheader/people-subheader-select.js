import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as peopleRangeActions from '../../../actions/people-range-actions';
import './people-subheader-select.css';

class PeopleSubheaderSelect extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.updateRange = this.updateRange.bind(this);
    }

    updateRange(event) {
        this.props.actions.change(parseInt(event.target.value, 10));
    }

    render() {
        return (
            <div className="people-subheader-item people-subheader-select">
                <span>Select</span>
                <span className="o-forms">
                    <select id="o-forms__select-standard" className="o-forms__select" defaultValue={this.props.peopleRange} onChange={this.updateRange}>
                        <option value="20">20</option>
                        <option value="10">10</option>
                        <option value="5">5</option>
                        <option value="1">1</option>
                    </select>
                </span>
                <span>people</span>
            </div>
        );
    }
};

PeopleSubheaderSelect.propTypes = {
    peopleRange: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        peopleRange: state.peopleRange
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(peopleRangeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSubheaderSelect);