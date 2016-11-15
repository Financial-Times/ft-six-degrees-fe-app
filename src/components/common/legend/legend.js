import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as legendActions from '../../../actions/legend-actions';
import './legend.css';

class Legend extends React.Component {

    getCircles() {
        return <div className="legend-circles">
                <span></span>
                <span></span>
                <span></span>
            </div>;
    }

    getScale() {
        return <div className="legend-scale-bar"></div>;
    }

    determineLegendLabels(location) {
        let legend;

        if (location === '/people') {
            legend = {
                topLabel: 'More frequent',
                bottomLabel: 'Less frequent',
                inner: this.getCircles()
            };
        } else {
            legend = {
                topLabel: 'Stronger connection',
                bottomLabel: 'Weaker connection',
                inner: this.getScale()
            }
        }

        this.props.actions.update(legend);
    }

    componentDidMount() {
        this.determineLegendLabels(this.props.location);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.determineLegendLabels(nextProps.location);
        }
        return true;
    }

    render() {
        return (
            <div className="legend-container">
                <span className="legend-label legend-label-top">{this.props.legend.topLabel}</span>
                <div className="legend-inner">
                    {this.props.legend.inner}
                </div>
                <span className="legend-label legend-label-bottom">{this.props.legend.bottomLabel}</span>
            </div>
        );
    }
};

Legend.propTypes = {
    legend: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        legend: state.legend
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(legendActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Legend);