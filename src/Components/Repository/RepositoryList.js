import React from 'react';
import RepositoryItem from './RepositoryItem';
import FetchMore from "../FetchMore";
import Issues from '../Issues/Issues';

const getUpdateQuery = entry => (previousResult, {fetchMoreResult}) => {
    if (!fetchMoreResult) {
        return previousResult;
    }

    if (previousResult[entry]) {
        return {
            ...previousResult,
            [entry]: {
                ...previousResult[entry],
                repositories: {
                    ...previousResult[entry].repositories,
                    ...fetchMoreResult[entry].repositories,
                    edges: [
                        ...previousResult[entry].repositories.edges,
                        ...fetchMoreResult[entry].repositories.edges
                    ]
                }
            }
        }
    }
};


const RepositoryList = ({repositories, fetchMore, loading, entry}) => <>
    {repositories.edges.map(({node}) => (
        <div key={node.id} className="RepositoryItem">
            <RepositoryItem {...node} />

            <Issues
                repositoryName={node.name}
                repositoryOwner={node.owner.login}
            />
            <hr/>
        </div>
    ))}

    <FetchMore
        loading={loading}
        hasNextPage={repositories.pageInfo.hasNextPage}
        variables={{
            cursor: repositories.pageInfo.endCursor
        }}
        updateQuery={getUpdateQuery(entry)}
        fetchMore={fetchMore}
    >
        Repositories
    </FetchMore>
</>;

export default RepositoryList;
