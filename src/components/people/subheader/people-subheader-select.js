import React from 'react';
import './people-subheader-select.css';

const PeopleSubheaderSelect = () => {
    return (
        <div className="people-subheader-item people-subheader-select">
            <span>Select</span>
            <span className="o-forms">
                <select id="o-forms__select-standard" className="o-forms__select" defaultValue="20">
                    <option value="20">20</option>
                    <option value="10">10</option>
                    <option value="5">5</option>
                    <option value="1">1</option>
                </select>
            </span>
            <span>people</span>
        </div>
    );
};

export default PeopleSubheaderSelect;