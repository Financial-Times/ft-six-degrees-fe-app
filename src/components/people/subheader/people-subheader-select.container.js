import {connect} from 'react-redux';
import * as peopleRangeActions from '../../../actions/people-range-actions';
import SubheaderSelect from './subheader-select';

const mapStateToProps = ({ peopleRange, peopleRangeList }) => ({
	peopleRangeList,
	peopleRange,
});

const PeopleSubheaderSelect = connect(
	mapStateToProps,
	{ peopleRangeUpdate: peopleRangeActions.change }
)(SubheaderSelect);

export default PeopleSubheaderSelect;
