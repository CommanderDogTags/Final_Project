import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect, useRef } from 'react';
import { json, User } from '../utils/api';
import { MdPlayCircleFilled } from 'react-icons/md';

const EditPhoto: React.FC<EditPhotoProps> = props => {
    const [photo, setPhoto] = useState<{photo_id:number, caption:string, image_path:string}[]>([{photo_id:0, caption:'', image_path:''}]);
    const [caption, setCaption] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', {msg:'You must be logged in to view this page!'});
                } else {
                    setPhoto(props.location.state.photo);
                    setCaption(props.location.state.photo.caption)
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response: any = await json(`/api/photos/${props.match.params.photo_id}`, 'PUT', { caption });
            console.log(response);
            props.history.push('/all')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Topnavbar />

            <div className="row h-100 no-gutters">
                <div className="container text-center col-md-6 my-auto">
                    <div className="border rounded border-primary" id="clear-border">
                        <form className="form-group p-4">

                        <label className="text mt-2">Edit this caption:</label>
                            <textarea
                                rows={8}
                                defaultValue={caption}
                                onChange={e => setCaption(e.target.value)}
                                className="form-control my-1"
                        />

                        <button type="submit" className="btn rounded btn-outline-primary mt-2" onClick={handleEdit} id="hover">
                            Edit!
                        </button>

                        </form>
                    </div>
                </div>
            </div>

            <Bottomnavbar />
        </>
    );
};

interface EditPhotoProps extends RouteComponentProps<{photo_id:string}> { }

export default EditPhoto;