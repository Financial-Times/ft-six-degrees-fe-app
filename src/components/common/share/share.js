import React from 'react';
import ShareButton from './share-button';
import './share.css';

const Share = () => {
    return (
        <div className="share-container">
            <span className="share-label">Share</span>
            <ShareButton icon="twitter" href="http://www.ft.com" />
            <ShareButton icon="facebook" href="http://www.ft.com" />
        </div>
    );
};

export default Share;