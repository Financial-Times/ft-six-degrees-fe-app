import React from 'react';
import './home-page.css';

class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page">
                <h2>FT Six Degrees FE App</h2>
                <p className="subheader">This app uses React, Redux and React Router</p>
            </div>
        );
    }
}

export default HomePage;