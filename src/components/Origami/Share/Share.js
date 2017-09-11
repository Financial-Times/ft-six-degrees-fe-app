import React from 'react';
import './Share.css';

const Share = () => {
	return (
		<div className="share-container o-share o-share--vertical">
			<ul>
				<li className="o-share__action o-share__action--twitter">
					<a
						href="https://twitter.com/intent/tweet?url=&amp;text=&amp;related=&amp;via=FT"
						rel="noopener"
					>
						<i>Twitter</i>
					</a>
				</li>
				<li className="o-share__action o-share__action--facebook">
					<a
						href="http://www.facebook.com/sharer.php?u=&amp;"
						rel="noopener"
					>
						<i>Facebook</i>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Share;
