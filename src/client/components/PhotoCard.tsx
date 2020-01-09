import * as React from 'react';
import ImageZoom from 'react-medium-image-zoom';
import { useState, useEffect } from 'react';
import * as moment from 'moment';

const PhotoCard: React.FC<PhotoCardProps> = props => {

    return (
        <>
            <div className="col-md">
                <div className="align-items-center">
                    <div className="card-body text-center display:block my-auto">
                        {/* <img className="shadow-effect" id='photo-size' src={props.photo.image_path} /> */}
                        
                        <ImageZoom
                            image={{
                                src: props.photo.image_path,
                                className: 'shadow-effect',
                                style: { width: '25em'},
                                id: 'photo-size'
                            }}
                            zoomImage={{
                                src: props.photo.image_path,
                                text: props.photo.caption
                            }}
                        />
                    </div>
                    <div className="mx-5 text-center">
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