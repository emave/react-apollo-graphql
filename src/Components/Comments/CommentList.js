import React from 'react';
import Loading from "../UI/Loading";

const CommentList = ({comments}) => {

    console.log(comments);

    if (!comments) return <Loading/>;

    if (comments.length === 0) return <div>No comments</div>;

    return <div>
        {comments.map(({node}) => (
            <div key={node.id}>
                <p>Author: {node.author.login}</p>
                {node.body}
            </div>
        ))}
    </div>;
};

export default CommentList;