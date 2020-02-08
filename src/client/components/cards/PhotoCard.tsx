import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { json, User } from '../../utils/api';
import { HashLink as NavLink } from 'react-router-hash-link';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import Swal from 'sweetalert2';

const PhotoCard: React.FC<PhotoCardProps> = props => {
    const [user_id] = useState(User.user_id);
    const [photo_id] = useState(props.photo.photo_id);
    const [heart, setHeart] = useState<boolean>(false);
    const [results, setResults] = useState<{user_id:number, photo_id:number}>({user_id:0, photo_id:0});

    useEffect(() => {
        (async () => {
            try {
                let results = await json(`/api/likes/check/${props.photo.photo_id}`);
                setResults(results)
                console.log(results)
                if (results === 'NO') {
                    setHeart(false)
                } else {
                    setHeart(true)
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (heart === false) {
                let response: any = await json('/api/likes', 'POST', { user_id, photo_id });
                console.log(response);
                setHeart(true);
                Swal.fire({
                    title: 'Added to Liked Photos!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                let response: any = await json('/api/likes', 'DELETE', { user_id, photo_id });
                console.log(response);
                setHeart(false);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="col-md">
                <div className="align-items-center">
                    <div className="card-body text-center display:block">
                        <Link to={{ pathname: `/one/${props.photo.photo_id}`, state: { photo: props.photo } }} >
                            <img id='photo-size' src={props.photo.image_path} />
                        </Link>
                        <div className="row justify-content-center">

                            <img src={props.photo.avatar_path} className="avatar-size-results shadow-effect" />
                            <p className="mt-3 mx-2 unselectable text-primary">{props.photo.username}</p>

                            {props.photo.comment_count === 0 ? null :
                                <NavLink id="muted-text" to={{ pathname: `/one/${props.photo.photo_id}`, state: { photo: props.photo } }} >
                                    <p
                                        className="mt-3"
                                        id="muted-text"
                                    >
                                        || Comments: {props.photo.comment_count} ||
                                </p>
                                </NavLink>
                            }

                            <button
                                className="like-button"
                                onClick={toggleLike}>
                                {heart ? <IoMdHeart /> : <IoMdHeartEmpty />}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface PhotoCardProps {
    photo: { photo_id: number, username: string, caption: string, image_path: string, avatar_path: string, _created: string, comment_count: number }
}

export default PhotoCard;