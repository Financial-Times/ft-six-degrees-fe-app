export const getLastName = connection => {
	let person = connection;
	if (connection.hasOwnProperty('person')) {
		person = connection.person;
	}
	const names = person.abbrName.split(' ');
	return names.length > 0 ? names[names.length - 1] : '';
};
