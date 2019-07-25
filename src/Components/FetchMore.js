import React from 'react';
import Loading from "./UI/Loading";
import {ButtonUnobtrusive} from "./UI/Button";

const FetchMore = ({
                       variables,
                       loading,
                       updateQuery,
                       hasNextPage,
                       fetchMore,
                       children,
                   }) => (
    hasNextPage && <div className="FetchMore">
        {
            loading ?
                <Loading/>
                :
                <ButtonUnobtrusive
                    type="button"
                    className="FetchMore-button"
                    onClick={() => fetchMore({variables, updateQuery})}
                >
                    More {children}
                </ButtonUnobtrusive>
        }
    </div>
);

export default FetchMore;