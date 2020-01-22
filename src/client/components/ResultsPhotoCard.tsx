import * as React from 'react';
import { Link } from 'react-router-dom';

const ResultsPhotoCard: React.FC<ResultsPhotoCardProps> = props => {

    return (
        <>
            <div className="col-md">
                <div className="align-items-center">
                    <div className="card-body text-center display:block">
                        <Link to={{pathname: `/one/${props.results.photo_id}`, state: {photo: props.results}}} >
                            <img id='photo-size' src={props.results.image_path} />
                        </Link>
                        <div className="row justify-content-center">
                            <img src={props.results.avatar_path} className="img-left avatar-size-results mt-2" />
                            <p className="mt-3 mx-2 unselectable">{props.results.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface ResultsPhotoCardProps {
    results: {    
        photo_id: number,
        user_id: number,
        caption: string,
        image_path: string,
        _created: Date,
        _updated: Date,
        username: string,
        avatar_path: string
    }
}

export default ResultsPhotoCard;