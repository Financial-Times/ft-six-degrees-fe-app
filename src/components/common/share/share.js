import React from 'react';
import ShareButton from './share-button';
import './share.css';

const Share = () => {
    return (
        <div className="share-container">
            <span className="share-label">Share</span>
            <ShareButton icon="twitter" href={(() => {return 'https://twitter.com/intent/tweet?text=Use Six Degree\'s to figure out who has made the headlines, discover their associations and unearth the stories that connect them&url=' + window.location.href})()} />
            <ShareButton icon="facebook" href={(() => {return 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href})()} />
        </div>
    );
};

export default Share;