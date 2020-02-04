import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../../components/nav/Topnavbar';
import Bottomnavbar from '../../components/nav/Bottomnavbar';
import { useState, useEffect } from 'react';
import { json, User } from '../../utils/api';
import PhotoCard from '../../components/cards/PhotoCard';

const LikedPhotos: React.FC<LikedPhotosProps> = props => {
    const [photos, setPhotos] = useState<{ photo_id: number, username: string, caption: string, image_path: string, avatar_path: string, _created: string, comment_count: number }[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'Login info is incorrect!' });
                } else {
                    let photos = await json(`/api/likes`);
                    setPhotos(photos);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <Topnavbar />

            {isLoading ? <div className="mx-auto photo-page-spinner"></div> :
                <div className="row no-gutters" id="photo-padding">
                    {photos.map(photo => (
                        <PhotoCard key={`photoscard-${photo.photo_id}`} photo={photo} />
                    ))}
                </div>
            }

            <Bottomnavbar />
        </>
    );
};

interface LikedPhotosProps extends RouteComponentProps { }

export default LikedPhotos;