import React from 'react';
import ShareButton from './share-button';
import './share.css';

const Share = () => {
    return (
        <div className="share-container">
            <span className="share-label">Share</span>
            <ShareButton icon="twitter" href="https://twitter.com/intent/tweet?text=Use Six Degree's to figure out who has made the headlines, discover their associations and unearth the stories that connect them&url=https://six-degrees.ft.com/" />
            <ShareButton icon="facebook" href="https://www.facebook.com/sharer/sharer.php?u=https://six-degrees.ft.com/" />
        </div>
    );
};

export default Share;