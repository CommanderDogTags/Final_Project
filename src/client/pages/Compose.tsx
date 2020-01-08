import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect, useRef, createRef } from 'react';
import { json, User } from '../utils/api';
import { MdPlayCircleFilled } from 'react-icons/md';

const Compose: React.FC<ComposeProps> = props => {
    const fileInput = useRef<HTMLInputElement>();
    const [fileName, setFileName] = useState(`Choose a Photo`);
    const [caption, setCaption] = useState('');
    const [user_id] = useState(User.user_id);

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'You must be logged in to view this page!' });
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setFileName(fileInput.current.files[0].name);
            const data = new FormData();
            data.append('image_path', fileInput.current.files[0]);
            data.append('caption', caption);
            data.append('user_id', user_id);
            await fetch('/api/photos', {
            method: 'POST',
            body: data
        });
        props.history.push(`/all`)
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

                        <div>
                            <input
                                onChange={() => setFileName(fileInput.current.files[0].name)} 
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                ref={fileInput}
                            />

                            <label className="custom-file-label mx-4 mt-5" htmlFor="customFile">
                                {fileName}
                            </label>

                        <textarea
                            rows={5}
                            placeholder="Add a caption!"
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                            className="form-control mt-5"
                        />

                        </div>

                        <button
                            id="hover"
                            onClick={handleSubmit}
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
        
interface ComposeProps extends RouteComponentProps {}

export default Compose;