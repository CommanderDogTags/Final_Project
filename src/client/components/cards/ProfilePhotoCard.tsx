import * as React from 'react';
import { json } from '../../utils/api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = props => {

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to delete this photo?',
            icon: 'warning',
            confirmButtonText: 'Yes!',
            confirmButtonColor: '#67DDBB',
            showCancelButton: true,
            cancelButtonColor: '#DD6B67',
            cancelButtonText: 'No!'
        }).then((result: any) => {
            if (result.value) {
                try {
                    let response = json(`/api/photos/${props.photo.photo_id}`, 'DELETE');
                    window.location.reload();
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    };

    return (
        <>
            <div className="col-md">
                <div className="align-items-center">
                    <div className="card-body text-center display:inline-block">

                        <Link to={{ pathname: `/one/${props.photo.photo_id}`, state: { photo: props.photo } }} >
                            <img className="mt-2" id='photo-size' src={props.photo.image_path} />
                        </Link>

                        <div className="card-footer">
                            <button
                                className="btn rounded btn-outline-primary shadow-effect btn-sm mt-1 mx-1"
                                id="hover"
                                onClick={handleDelete}
                            >
                                Delete Photo
                            </button>

                            <Link
                                to={{ pathname: `/editphoto/${props.photo.photo_id}`, state: { photo: props.photo } }}
                                className="btn rounded btn-outline-primary shadow-effect btn-sm mt-1 mx-1"
                                id="hover"
                            >
                                Edit Caption
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface ProfilePhotoCardProps {
    photo: {
        photo_id: number,
        username: string,
        caption: string,
        image_path: string,
        avatar_path: string,
        _created: string,
    }
}

export default ProfilePhotoCard;