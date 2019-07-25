import React from 'react';

import Link from '../UI/Link';
import CommentList from "../Comments/CommentList";

const IssueItem = ({ issue }) => (
    <div className="IssueItem">
        {/* placeholder to add a show/hide comment button later */}

        <div className="IssueItem-content">
            <h3>
                <Link href={issue.url}>{issue.title}</Link>
            </h3>
            <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />

            {issue.comments && <div>
                <h4>Comments:</h4>
                <CommentList comments={issue.comments.edges}/>
            </div>}

            {/* placeholder to render a list of comments later */}
        </div>
    </div>
);

export default IssueItem;