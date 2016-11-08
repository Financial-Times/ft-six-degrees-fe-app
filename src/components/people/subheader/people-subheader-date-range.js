import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as dateRangeActions from '../../../actions/date-range-actions';
import './people-subheader-date-range.css';
import FtButton from '../../common/origami/ft-button';

class PeopleSubheaderDateRange extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.rangeButtons = ['day', 'week', 'month', 'year'];
        this.changeDateRange = this.changeDateRange.bind(this);
    }

    isBtnSelected(range) {
        return this.props.dateRange === range;
    }

    changeDateRange(ref) {
        this.props.actions.change(ref.props.label);
    }

    render () {
        return (
            <div className="people-subheader-item people-subheader-date-range">
                <span className="people-subheader-item-label">From the last</span>
                <div className="o-buttons__group">
                    {this.rangeButtons.map((button, index) => {
                        return <FtButton key={index} label={button} className="o-buttons--big" onClick={this.changeDateRange} selected={this.isBtnSelected(button) ? true : false} />
                    })}
                </div>
            </div>
        );
    }

};

PeopleSubheaderDateRange.propTypes = {
    dateRange: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        dateRange: state.dateRange
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(dateRangeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSubheaderDateRange);
