export const getNounForm = (no = 1, noun = '') =>
	no === 1 ? `${no} ${noun}` : `${no} ${noun}s`;
