import React, {PropTypes} from 'react';
import SentencesListRow from './sentences-list-row';

const SentencesList = ({sentences}) => {
    return (
        <div className="sentences-list">
            <table>
                <tbody>
                    {sentences.map(sentence =>
                        <SentencesListRow key={sentence.id} sentence={sentence} />
                    )}
                </tbody>
            </table>
        </div>
    );
};

SentencesList.propTypes = {
    sentences: PropTypes.array.isRequired
};

export default SentencesList;