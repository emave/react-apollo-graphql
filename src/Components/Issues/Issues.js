import React from 'react';
import ErrorMessage from '../UI/Error';
import Loading from '../UI/Loading';
import IssueItem from './IssuesItem';
import gql from 'graphql-tag';
import {Query, ApolloConsumer} from "react-apollo";
import {ButtonUnobtrusive} from "../UI/Button";
import {withState} from "recompose";

const GET_ISSUES_OF_REPOSITORY = gql`
    query($repositoryOwner: String!, $repositoryName: String!, $issueState: IssueState!) {
        repository(name: $repositoryName, owner: $repositoryOwner) {
            issues(first: 5, states: [$issueState]) {
                edges {
                    node {
                        id
                        number
                        state
                        title
                        url
                        bodyHTML
                        comments(first: 5) {
                            edges {
                                node {
                                    id
                                    body
                                    author {
                                        login
                                        url
                                    }                          
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const ISSUE_STATES = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
    NONE: 'NONE'
};

const isShow = issueState => issueState !== ISSUE_STATES.NONE;

const prefetchIssues = (client, repositoryOwner, repositoryName, nextIssueState) => {
    if (isShow(nextIssueState)) {
        client.query({
            query: GET_ISSUES_OF_REPOSITORY,
            variables: {
                repositoryOwner,
                repositoryName,
                issueState: nextIssueState,
            },
        });
    }
};

const Issues = ({repositoryOwner, repositoryName, issueState, setIssueState}) => {

    return <div className="Issues">

        <IssueFilter
            setIssueState={setIssueState}
            repositoryOwner={repositoryOwner}
            repositoryName={repositoryName}
        />

        {isShow(issueState) && <Query
            query={GET_ISSUES_OF_REPOSITORY}
            variables={{
                repositoryOwner,
                repositoryName,
                issueState
            }}
        >
            {({data, loading, error}) => {
                if (error) return <ErrorMessage error={error}/>;

                const {repository} = data;

                if (loading && !repository) return <Loading/>;

                if (!repository.issues.edges.length) return <div className="IssueList">No issues ...</div>;

                const filteredRepository = {
                    issues: {
                        edges: repository.issues.edges.filter(issue => issue.node.state === issueState)
                    }
                };

                if (!filteredRepository.issues.edges.length) {
                    return <div className="IssueList">No issues ...</div>;
                }

                return <IssueList issues={filteredRepository.issues}/>;
            }}
        </Query>}
    </div>
};

const IssueList = ({issues}) => (
    <div className="IssueList">
        {issues.edges.map(({node}) => (
            <IssueItem key={node.id} issue={node}/>
        ))}
    </div>
);

const IssueFilter = ({setIssueState, repositoryOwner, repositoryName}) =>
    <ApolloConsumer>
        {client => <div>
            {Object.values(ISSUE_STATES).map(nextIssueState =>
                <ButtonUnobtrusive
                    key={nextIssueState}
                    onClick={() => setIssueState(nextIssueState)}
                    onMouseOver={() => prefetchIssues(client, repositoryOwner, repositoryName, nextIssueState)}
                >
                    {nextIssueState}
                </ButtonUnobtrusive>)}
        </div>}
    </ApolloConsumer>;

export default withState('issueState', 'setIssueState', ISSUE_STATES.NONE)(Issues);