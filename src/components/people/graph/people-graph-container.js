import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as peopleDataActions from '../../../actions/people-data-actions';
import {Link} from 'react-router';
import Graph from './people-graph';
import PeopleDataUtils from '../../../assets/js/services/people-data.utils';
import './people-graph-container.css';

let exampleData = [
    {
        "id": "http://api.ft.com/things/8d9470c9-127e-3fc7-95a0-71804cc5ea9d",
        "prefLabel": "Hillary Rodham Clinton",
        "articles": "129",
        "img": "https://lh4.googleusercontent.com/-eXKU4UhFusI/AAAAAAAAAAI/AAAAAAAAATA/1QahWqsqd-I/s0-c-k-no-ns/photo.jpg"
    },
    {
        "id": "http://api.ft.com/things/0a619d71-9af5-3755-90dd-f789b686c67a",
        "prefLabel": "Barack H. Obama",
        "articles": "110",
        "img": "http://www.nationalturk.com/en/wp-content/uploads/2012/07/obama1-5687.jpg"
    },
    {
        "id": "http://api.ft.com/things/fc9817ea-41cc-31b3-bfaa-214ae3d57d88",
        "prefLabel": "Vladimir Vladimirovich Putin",
        "articles": "98",
        "img": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Vladimir_Putin_2015.jpg"
    },
    {
        "id": "http://api.ft.com/things/3ead3886-85d3-36ee-95e3-75ed1dc832b7",
        "prefLabel": "John Ellis Bush",
        "articles": "79",
        "img": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Governor_of_Florida_Jeb_Bush_at_Southern_Republican_Leadership_Conference_May_2015_by_Michael_Vadon_16.jpg"
    },
    {
        "id": "http://api.ft.com/things/385e9494-1f9d-3040-b47e-a19a199dac92",
        "prefLabel": "Angela Dorothea Merkel",
        "articles": "76",
        "img": "https://upload.wikimedia.org/wikipedia/commons/2/21/Angela_Merkel_-_Juli_2010_-_3zu4_cropped.jpg"
    },
    {
        "id": "http://api.ft.com/things/43ccbeb0-c5ab-3ac5-a3fd-c0fb6e62ba46",
        "prefLabel": "Donald John Trump",
        "articles": "69",
        "img": "https://lh5.googleusercontent.com/-Sv0q6lkSAGM/AAAAAAAAAAI/AAAAAAAAAVA/9wS9aK9rScw/s0-c-k-no-ns/photo.jpg"
    },
    {
        "id": "http://api.ft.com/things/d762ca40-75ad-3ca2-8fcd-f803d2f11e1a",
        "prefLabel": "Janet Louise Yellen",
        "articles": "58",
        "img": "http://a3.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTIwNjA4NjM0MjUyODU0Nzk2.jpg"
    },
    {
        "id": "http://api.ft.com/things/8edf8f98-4696-3516-beef-0b3fe184a273",
        "prefLabel": "Recep Tayyip Erdogan",
        "articles": "47",
        "img": "https://lh5.googleusercontent.com/-ZLfIwgqn8iQ/AAAAAAAAAAI/AAAAAAAAT7M/4TDSFUS4iFg/s0-c-k-no-ns/photo.jpg"
    },
    {
        "id": "http://api.ft.com/things/8a1fdf49-3df5-3852-96d6-eb8bad6f367b",
        "prefLabel": "Narendra Damodardas Modi",
        "articles": "36",
        "img": "http://www.india.com/wp-content/uploads/2014/05/narendra-modi-123.jpg"
    },
    {
        "id": "http://api.ft.com/things/dc278df2-1c8b-3e44-8ca8-5d255f75f737",
        "prefLabel": "David William Donald Cameron",
        "articles": "25",
        "img": ""
    },
    {
        "id": "http://api.ft.com/things/8d41540f-0006-3726-8e91-8a8db8de6b48",
        "prefLabel": "John Podesta",
        "articles": "18",
        "img": "https://lh6.googleusercontent.com/-TegqjicrTQA/AAAAAAAAAAI/AAAAAAAAJI0/RBqmDJszVEU/photo.jpg"
    },
    {
        "id": "http://api.ft.com/things/e101a259-d2e0-30a8-aeae-40a49a99e4e0",
        "prefLabel": "Steve Rowe",
        "articles": "12",
        "img": "https://static.standard.co.uk/s3fs-public/thumbnails/image/2016/01/07/11/SteveRowe0701A.jpg"
    },
    {
        "id": "http://api.ft.com/things/3ba7778d-b131-34ce-8196-51dc21166c43",
        "prefLabel": "James Brien Comey",
        "articles": "9",
        "img": "https://www.google.co.uk/imgres?imgurl=http://media2.s-nbcnews.com/j/newscms/2015_30/1136301/150723-james-comey-jpo-500a_18fedec20ffef3fb4226c7fdced44951.nbcnews-fp-1200-800.jpg&imgrefurl=http://www.nbcnews.com/politics/2016-election/clinton-emails-only-latest-controversy-fbi-director-james-comey-n675006&h=800&w=1200&tbnid=8s7-Ok0ttur2MM:&vet=1&tbnh=133&tbnw=200&docid=OJOM-SRHcl3jcM&itg=1&usg=__eqsQiYG6DxT7Dg17qkdLl05_Nq0=&sa=X&ved=0ahUKEwjW04OT0qjQAhUrJ8AKHYvOAg4Q_B0IfjAK&ei=5OIpWNbRNavOgAaLnYtw"
    },
    {
        "id": "http://api.ft.com/things/e48d5e74-21dc-368e-8354-33cb9da6f34f",
        "prefLabel": "George Walker Bush",
        "articles": "7",
        "img": "https://upload.wikimedia.org/wikipedia/commons/d/d4/George-W-Bush.jpeg"
    },
    {
        "id": "http://api.ft.com/things/f38c4ffc-bdce-3f1b-8f5e-179449505ad4",
        "prefLabel": "Alan J. Davies",
        "articles": "4"
    },
    {
        "id": "http://api.ft.com/things/8ce4f8b7-a938-37c7-99f8-54950b765d16",
        "prefLabel": "Ronald Wilson Reagan",
        "articles": "2",
        "img": "https://upload.wikimedia.org/wikipedia/commons/1/16/Official_Portrait_of_President_Reagan_1981.jpg"
    },
    {
        "id": "http://api.ft.com/things/209e6720-f2bd-338f-9410-6577c980eaca",
        "prefLabel": "Willard Mitt Romney",
        "articles": "1",
        "img": "https://d229l5sflpl9cp.cloudfront.net/canphoto/21942_lg.jpg"
    },
    {
        "id": "http://api.ft.com/things/d953ae78-222c-35f2-90ec-f56f8d6227f7",
        "prefLabel": "Francois Gerard Georges Nicol Hollande",
        "articles": "1",
        "img": "http://www.thefamouspeople.com/profiles/images/franois-hollande-1.jpg"
    },
    {
        "id": "http://api.ft.com/things/849da278-9c30-36e3-88e6-07867af2e1c3",
        "prefLabel": "Debra A. Valentine",
        "articles": "1",
        "img": "http://riocareers.build-qa.rufusleonard.com/images/img_valentine.jpg"
    },
    {
        "id": "http://api.ft.com/things/f87f3989-42db-378d-ba23-70f8026cca08",
        "prefLabel": "Rudolph W. Giuliani",
        "articles": "1",
        "img": ""
    }
];

class PeopleGraphContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = props.peopleData;
    }

    hasChanged(itemOne, itemTwo) {
        return JSON.stringify(itemOne) !== JSON.stringify(itemTwo);
    }

    parseData(data) {
        data.map(person => {
            person.abbrName = PeopleDataUtils.getAbbreviatedName(person.prefLabel);
            person.initials = PeopleDataUtils.getNameInitials(person.prefLabel);
            return person;
        });
        return data;
    }

    updateData() {
        return this.props.peopleData.slice(0, this.props.peopleRange || 1);
    }

    updateGraph() {
        this.graph = new Graph();
        this.graph.draw(this.updateData(), this.props.peopleRange);
    }

    componentDidUpdate() {
        //update graph
        this.updateGraph();
    }

    componentDidMount() {
        this.updateGraph();

        //temporary
        const self = this;
        setTimeout(function () {
            exampleData = self.parseData(exampleData);
            self.props.actions.data.update(exampleData);
        }, 1000);
    }

    render() {
        return (
            <div className="people-graph-container">
                <div id="people-graph" className="people-graph"></div>
                <p>
                    <Link to="/connections" className="o-typography-link" activeClassName="active">Hillary Clinton</Link>
                </p>
            </div>
        );
    }
}

PeopleGraphContainer.propTypes = {
    peopleRange: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        peopleRange: state.peopleRange,
        peopleData: state.peopleData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            data: bindActionCreators(peopleDataActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleGraphContainer);