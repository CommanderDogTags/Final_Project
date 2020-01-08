import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../utils/api';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

const PhotoCard: React.FC<PhotoCardProps> = props => {

    return (
        <>
            <div className="col-sm-6">
                <div className="">
                    <div className="card-body text-center">
                        <img id='photo-size' src={props.photo.image_path} />
                        <p id="control">{props.photo.username}: {props.photo.caption}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

interface PhotoCardProps {
    photo: { photo_id: number, username: string, caption: string, image_path: string, _created: string },

}

export default PhotoCard;