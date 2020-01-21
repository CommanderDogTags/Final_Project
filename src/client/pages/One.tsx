import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import Bottomnavbar from '../components/Bottomnavbar';
import CommentCard from '../components/CommentCard';
import * as moment from 'moment';

const All: React.FC<AllProps> = props => {
    const [photo, setPhoto] = useState<{
        photo_id: number, username: string, caption: string,
        image_path: string, avatar_path: string, _created: string
    }>({
        photo_id: 0, username: '', caption: '', image_path: '', avatar_path: '', _created: ''
    });
    const [user, setUser] = useState<{ username: string, avatar_path: string, user_id: number }>({
        username: '',
        avatar_path: '',
        user_id: 0
    });
    const [comments, setComments] = useState<{ comment_id: number, comment: string, username: string, avatar_path: string, _created: string }[]>([]);
    const [comment, setComment] = useState('');
    const [user_id] = useState(User.user_id);
    const [photo_id] = useState(props.location.state.photo.photo_id);

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'You must be logged in to view this page!' });
                } else {
                    setPhoto(props.location.state.photo);
                    let user = await json('/api/users');
                    setUser(user);
                    let comments = await json(`/api/comments/${props.location.state.photo.photo_id}`);
                    setComments(comments);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response: any = await json('/api/comments', 'POST', { comment, user_id, photo_id });
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const isEnabled = comment.length > 0;

    return (
        <>
            <nav className="navbar p-2 shadow-sm fixed-top sticky-nav bg-white">

                <img src={photo.avatar_path} className="avatar-size-single-photo shadow-effect unselectable" />

                <h2
                    className="text-primary custom-center-one unselectable"
                    id="plantstagram">
                    {photo.username}
                </h2>

            </nav>

            <div className="row no-gutters" id="single-photo-padding">
                <div className="container text-center">
                    <img src={photo.image_path} className="" id="single-photo-size" />
                    <p className="text-center">"{photo.caption}"</p>
                    <p className="text-center date-time">posted on {moment(photo._created).format("MMM Do YYYY")}</p>
                </div>
            </div>

            <div className="container text-center col-md-6 my-auto">

                    <form className="form-group p-5">

                        <textarea
                            rows={5}
                            placeholder="Comment on this photo!"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            className="form-control"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary text-white form-control mt-4 shadow-sm"
                            onClick={handleSubmit}
                            disabled={!isEnabled}>
                            Add Comment!
                        </button>

                    </form>

            </div>

            <div className="row no-gutters" id="comment-padding">
                {comments.map(comments => (
                    <CommentCard key={`commentcard-${comments.comment_id}`} comments={comments} />
                ))}
            </div>

            <Bottomnavbar />
        </>
    );
};

interface AllProps extends RouteComponentProps {
    photo: {
        photo_id: number,
        username: string,
        caption: string,
        image_path: string,
        avatar_path: string,
        _created: string
    }
}

export default All;