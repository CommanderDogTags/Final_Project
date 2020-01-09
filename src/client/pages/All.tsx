import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import PhotoCard from '../components/PhotoCard';

const All: React.FC<AllProps> = props => {
    const [photos, setPhotos] = useState<{photo_id:number, username:string, caption:string, image_path:string, _created:string}[]>([]);

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', {msg:'You must be logged in to view this page!'});
                } else {
                    let photos = await json('/api/photos');
                    setPhotos(photos);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <Topnavbar />
            
            <div className="row no-gutters" id="photo-padding">
                {photos.map(photo => (
                    <PhotoCard key={`photoscard-${photo.photo_id}`} photo={photo} />
                ))}
            </div>

            <Bottomnavbar />
        </>
    );
};

interface AllProps extends RouteComponentProps {}

export default All;