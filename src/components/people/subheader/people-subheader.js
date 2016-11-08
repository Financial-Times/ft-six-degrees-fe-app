import React from 'react';
import './people-subheader.css';

import PeopleSelect from './people-subheader-select';
import PeopleGroup from './people-subheader-group';
import PeopleDateRange from './people-subheader-date-range';
import PeopleLoginArea from './people-subheader-login-area';

const PeopleSubheader = () => {
    return (
        <div className="people-subheader">
            <PeopleSelect />
            <PeopleGroup />
            <PeopleDateRange />
            <PeopleLoginArea />
        </div>
    );
};

export default PeopleSubheader;