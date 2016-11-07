import React, {PropTypes} from 'react';

const SentencesListRow = ({sentence}) => {
    return (
        <tr className="sentence">
            <td>{sentence.value}</td>
            <td>{sentence.author}</td>
        </tr>
    );
};

SentencesListRow.propTypes = {
    sentence: PropTypes.object.isRequired
};

export default SentencesListRow;