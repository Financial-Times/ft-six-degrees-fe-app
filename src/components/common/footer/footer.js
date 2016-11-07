import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="o-footer o-footer--theme-light" data-o-component="o-footer" data-o-footer--no-js="">
            <div className="o-footer__container">
                <div>
                    <ul className="o-footer__legal-links">
                        <li><a href="http://help.ft.com/help/legal-privacy/terms-conditions/">Terms &amp; Conditions</a></li>
                        <li><a href="http://help.ft.com/help/legal-privacy/privacy/">Privacy</a></li>
                        <li><a href="http://help.ft.com/help/legal-privacy/cookies/">Cookies</a></li>
                        <li><a href="http://help.ft.com/help/legal-privacy/copyright/copyright-policy/">Copyright</a></li>
                    </ul>
                </div>
                <div className="o-footer__copyright" role="contentinfo">
                    <small>
                        Markets data delayed by at least 15 minutes. &#xA9; THE FINANCIAL TIMES LTD.
                        <abbr title="Financial Times" aria-label="F T">FT</abbr> and &#x2018;Financial Times&#x2019; are trademarks of The Financial Times Ltd.<br></br>
                        The Financial Times and its journalism are subject to a self-regulation regime under the <a href="http://www.ft.com/editorialcode" aria-label="F T Editorial Code of Practice">FT Editorial Code of Practice</a>.
                    </small>
                </div>
            </div>
            <div className="o-footer__brand">
                <div className="o-footer__container">
                    <div className="o-footer__brand-logo"></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;