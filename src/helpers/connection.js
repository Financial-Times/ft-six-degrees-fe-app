import isEmpty from 'lodash/isEmpty';

export const getLastName = connection => {
	let person = connection;
	let names = [];
	if (connection.hasOwnProperty('person')) {
		person = connection.person;
	}
	if (!isEmpty(person) && person.hasOwnProperty('abbrName')) {
		names = person.abbrName.split(' ');
	}
	return names.length > 0 ? names[names.length - 1] : '';
};
export const getArticleUrl = apiUrl => {
	return apiUrl && apiUrl.replace('api', 'www');
};
