import React from 'react';
import './Share.css';

const Share = ({ text, link }) => {
	const l = encodeURI(link);
	const t = encodeURIComponent(text);
	return (
		<div className="share-container o-share o-share--vertical">
			<ul>
				<li className="o-share__action">
					<a
						data-trackable={'twitter'}
						className="o-share__icon o-share__icon--twitter"
						href={`https://twitter.com/intent/tweet?url=${l}&amp;text=${t}&amp;related=&amp;via=FT`}
						rel="noopener"
					>
						<span className="o-share__text">Twitter</span>
					</a>
				</li>
				<li className="o-share__action">
					<a
						data-trackable={'facebook'}
						className="o-share__icon o-share__icon--facebook"
						href={`http://www.facebook.com/sharer.php?u=${l}&amp;t=${t}`}
						rel="noopener"
					>
						<span className="o-share__text">Facebook</span>
					</a>
				</li>
				<li className="o-share__action">
					<a
						data-trackable={'linkedin'}
						className="o-share__icon o-share__icon--linkedin"
						href={`https://www.linkedin.com/shareArticle?mini=true&amp;url=${l};title=${encodeURIComponent(
							'FT Six Degrees'
						)}&amp;summary=${t}&amp;source=Financial%20Times`}
						rel="noopener"
					>
						<span className="o-share__text">LinkedIn</span>
					</a>
				</li>
				<li className="o-share__action">
					<a
						className="o-share__icon o-share__icon--whatsapp"
						target="_blank"
						href={`whatsapp://send?text=${t} - ${l}`}
						data-trackable="whatsapp"
						rel="noopener"
					>
						<span className="o-share__text">Whatsapp</span>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Share;
