import * as React from 'react';
import * as moment from 'moment';

const CommentCard: React.FC<CommentCardProps> = props => {

    return (
        <>
            <div className="p-4">
                <div className="align-items-center">
                    <div className="card-body text-center">
                        <img src={props.comments.avatar_path} className="avatar-size-comment" />
                        <h3 className="text-primary comment-username">{props.comments.username}</h3>
                        <p>"{props.comments.comment}"</p>
                        <p className="text-center date-time">posted on {moment(props.comments._created).format("MMM Do YYYY")}</p>
                    </div>
                    <hr className="linedivide mt-4" />
                </div>
            </div>
        </>
    );
}

interface CommentCardProps { comments: { comment_id: number, comment: string, username: string, avatar_path: string,  _created: string } }

export default CommentCard;