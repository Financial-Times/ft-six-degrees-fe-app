class PeopleDataUtils {

    getNameInitials(prefLabel) {
        const initials = prefLabel.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    getAbbreviatedName(prefLabel) {
        const prefLabelArray = prefLabel.split(' '),
            max = prefLabelArray.length;
        return prefLabelArray[0] + ' ' + prefLabelArray[max - 1];
    }

}

export default new PeopleDataUtils();