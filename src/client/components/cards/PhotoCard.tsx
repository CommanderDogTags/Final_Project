import * as React from 'react';
import { Link } from 'react-router-dom';

const PhotoCard: React.FC<PhotoCardProps> = props => {

    return (
        <>
            <div className="col-md">
                <div className="align-items-center">
                    <div className="card-body text-center display:block">
                        <Link to={{pathname: `/one/${props.photo.photo_id}`, state: {photo: props.photo}}} >
                            <img id='photo-size' src={props.photo.image_path} />
                        </Link>
                        <div className="row justify-content-center">
                            <img src={props.photo.avatar_path} className="img-left avatar-size-results mt-2" />
                            <p className="mt-3 mx-2 unselectable">{props.photo.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface PhotoCardProps {
    photo: { photo_id: number, username: string, caption: string, image_path: string, avatar_path: string,  _created: string }
}

export default PhotoCard;