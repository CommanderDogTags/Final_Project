import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect, useRef } from 'react';
import { json, User } from '../utils/api';
import { Link } from 'react-router-dom';

const Compose: React.FC<ComposeProps> = props => {

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

    const fileInput = useRef<HTMLInputElement>();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('image', fileInput.current.files[0]);
        data.append('caption', 'lorem ipsum caption test');
        await fetch('/api/photos', {
            method: 'POST',
            body: data
        })
    }

    return (
        <>
            <Topnavbar />

            <div className="row h-100 no-gutters">
                <div className="container text-center col-md-6 my-auto">
                    <form className="form-group p-3 border rounded border-primary shadow-sm">

                        <input ref={fileInput} type="file" className="form-control-file" />

                        <button
                            id="hover"
                            onClick={handleClick}
                            className="btn btn-outline-primary btn-sm shadow-effect mt-3 logout">
                            Submit!
                        </button>
                        
                    </form>
                </div>
                </div>

                <Bottomnavbar />
        </>
            );
        };
        
interface ComposeProps extends RouteComponentProps {}

            export default Compose;