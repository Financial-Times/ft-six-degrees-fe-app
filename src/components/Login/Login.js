import React from 'react';
import { FtButton } from '../Origami';
import './Login.css';

const Login = ({ user, onClick }) => {
	return user.isAuthed ? null : (
		<div className="login-bar">
			<FtButton
				className="o-buttons--standout"
				label="Login"
				onClick={onClick}
			/>
		</div>
	);
};

export default Login;
