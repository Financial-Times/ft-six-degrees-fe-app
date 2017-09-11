import React from 'react';
import { FtButton } from '../Origami';
import './Login.css';

const Login = ({ user, onClick }) => {
	return user.isAuthed ? null : (
		<div className="login-bar">
			<FtButton
				className="o-buttons--standout o-buttons--big"
				label="Login"
				onClick={onClick}
			/>
			<span className="login-text">
				{'Sign in for a personalised Six Degrees'}
			</span>
		</div>
	);
};

export default Login;
