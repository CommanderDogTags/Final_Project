import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProfileNavbar from '../components/ProfileNavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import ProfilePhotoCard from '../components/ProfilePhotoCard';

const Profile: React.FC<ProfileProps> = props => {
    const [photos, setPhotos] = useState<{photo_id:number, username:string, caption:string, image_path:string, avatar_path:string, _created:string}[]>([]);
    const [user, setUser] = useState<{username:string, avatar_path:string, role: string, user_id: number}>({
        username: '',
        avatar_path: '',
        role: '',
        user_id: 0
    });

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', {msg:'You must be logged in to view this page!'});
                } else {
                    let [user, photos] = await json('/api/users');
                    setUser(user);
                    setPhotos(photos);
                } 
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <ProfileNavbar user={user} />
            
            <div className="row no-gutters" id="photo-padding">
                {photos.map(photo => (
                    <ProfilePhotoCard key={`profilephotoscard-${photo.photo_id}`} photo={photo} />
                ))}
            </div>

            <Bottomnavbar />
        </>
    );
};

interface ProfileProps extends RouteComponentProps {  }

export default Profile;