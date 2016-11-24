import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Loader from '../common/loader/loader';
import RelatedContentLink from './related-content-link';
import './related-content-single.css';

function getSingleArticle(article, index) {
    return <RelatedContentLink article={article} key={index} />;
}

class RelatedContentSingle extends React.Component {
    render() {
        const backgroundImage = {
            backgroundImage: 'url(' + this.props.connectionsRoot.img + ')',
        };
        return (
            <div className="related-content-single-wrapper">
                {!this.props.relatedContentSingle.length && <Loader />}
                {this.props.relatedContentSingle.length &&
                    <section className="related-content-single-inner">
                        <div className="related-content-single-header">
                            <figure className="related-content-single-image" style={backgroundImage}></figure>
                            <div>
                                <strong>{this.props.connectionsRoot.abbrName} is featured in <span>{this.props.connectionsRoot.articles}</span> articles from <span>FRIDAY, 11 NOV</span> to <span>FRIDAY, 18 NOV</span></strong>
                                <ul>
                                    {this.props.relatedContentSingle.map((article, index) => {
                                        return getSingleArticle(article, index);
                                    })}
                                </ul>
                            </div>
                        </div>
                    </section>
                }
            </div>
        );
    }
};

RelatedContentSingle.propTypes = {
    connectionsRoot: PropTypes.object.isRequired,
    relatedContentSingle: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        connectionsRoot: state.connectionsRoot,
        relatedContentSingle: state.relatedContentSingle
    };
}

export default connect(mapStateToProps)(RelatedContentSingle);