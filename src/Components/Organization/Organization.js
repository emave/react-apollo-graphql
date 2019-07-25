import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import REPOSITORY_FRAGMENT from "../../Fragments/repositoryFragment";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/Error";
import RepositoryList from "../Repository/RepositoryList";

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
    query ($organizationName: String!, $cursor: String) {
        organization(login: $organizationName) {
            repositories(first: 5, after: $cursor) {
                edges {
                    node {
                        ...repository
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }

    ${REPOSITORY_FRAGMENT}
`;

const Organization = ({organizationName}) => <Query query={GET_REPOSITORIES_OF_ORGANIZATION}
                                                    variables={{organizationName}}
                                                    skip={organizationName === ''}
                                                    notifyOnNetworkStatusChange={true}
>
    {({data, loading, error, fetchMore}) => {

        if (error) return <ErrorMessage error={error}/>;

        const {organization} = data;

        if (!organization) return <Loading/>;

        return <RepositoryList
            loading={loading}
            fetchMore={fetchMore}
            repositories={organization.repositories}
            entry={'organization'}
        />
    }}
</Query>;

export default Organization;