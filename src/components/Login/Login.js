import React from 'react';
import { FtButton } from '../Origami';
import './Login.css';

const Login = ({ user, onClick }) => {
	return user.isAuthed === false ? (
		<div className="login-bar">
			<FtButton
				className="o-buttons--standout o-buttons--big"
				label="Sign In"
				onClick={onClick}
			/>
			<span className="login-text">
				{'for a personalised Six Degrees'}
			</span>
		</div>
	) : null;
};

export default Login;
