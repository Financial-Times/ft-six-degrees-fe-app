import React from 'react';
import './Share.css';

const Share = ({ text, link }) => {
	const l = encodeURI(link);
	const t = encodeURIComponent(text);
	return (
		<div className="share-container o-share o-share--vertical">
			<ul>
				<li className="o-share__action o-share__action--twitter">
					<a
						href={`https://twitter.com/intent/tweet?url=${l}&amp;text=${t}&amp;related=&amp;via=FT`}
						rel="noopener"
					>
						<i>Twitter</i>
					</a>
				</li>
				<li className="o-share__action o-share__action--facebook">
					<a
						href={`http://www.facebook.com/sharer.php?u=${l}&amp;t=${t}`}
						rel="noopener"
					>
						<i>Facebook</i>
					</a>
				</li>
				<li className="o-share__action o-share__action--linkedin">
					<a
						className="o-share__action--icon"
						href={`https://www.linkedin.com/shareArticle?mini=true&amp;url=${l};title=${encodeURIComponent(
							'FT Six Degrees'
						)}&amp;summary=${t}&amp;source=Financial%20Times`}
						rel="noopener"
					>
						<i>LinkedIn</i>
					</a>
				</li>
				<li className="o-share__action o-share__action--whatsapp">
					<a
						className="o-share__action--icon"
						target="_blank"
						href={`whatsapp://send?text=${t} - ${l}`}
						data-trackable="whatsapp"
						rel="noopener"
					>
						<i>Whatsapp</i>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Share;
