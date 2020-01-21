import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect, useRef } from 'react';
import { json, User } from '../utils/api';
import { MdPlayCircleFilled } from 'react-icons/md';

const EditAvatar: React.FC<EditAvatarProps> = props => {
    const fileInput = useRef<HTMLInputElement>();
    const [fileName, setFileName] = useState(`Choose an Avatar`);
    const [user_id] = useState(User.user_id);
    const [user, setUser] = useState<{user_id: string}>({
        user_id: ''
    });

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'You must be logged in to view this page!' });
                } else {
                    let [user] = await json('/api/users');
                    setUser(user);
                } 
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setFileName(fileInput.current.files[0].name);
            const data = new FormData();
            data.append('avatar_path', fileInput.current.files[0]);
            data.append('user_id', user_id);
            await fetch('/api/users/avatar', {
                method: 'PUT',
                body: data
            })
            props.history.push(`/profile`)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Topnavbar />

            <div className="row h-100 no-gutters">
                <div className="container text-center col-md-6 my-auto">
                    <div className="border rounded border-primary" id="clear-border">
                        <form className="form-group p-4">

                            <input
                                onChange={() => setFileName(fileInput.current.files[0].name)}
                                type="file"
                                className="custom-file-input mb-4"
                                id="customFile"
                                ref={fileInput}
                            />

                            <label className="custom-file-label mx-4 mt-5 upload-form-text" htmlFor="customFile">
                                {fileName}
                            </label>

                            <button
                                id="hover"
                                onClick={handleEdit}
                                className="btn btn-outline-primary btn-sm shadow-effect mt-4">
                                Submit!
                        </button>

                        </form>
                    </div>
                </div>
            </div>

            <Bottomnavbar />
        </>
    );
};

interface EditAvatarProps extends RouteComponentProps { }

export default EditAvatar;