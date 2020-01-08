import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import { Link } from 'react-router-dom';

const Profile: React.FC<ProfileProps> = props => {

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', {msg:'You must be logged in to view this page!'});
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <Topnavbar />
            
            <div className="row h-100 no-gutters">
            <div className="container text-center col-md-6 offset-md-3 my-auto">
                <p>Page for profile</p>
            </div>
            </div>

            <Bottomnavbar />
        </>
    );
};

interface ProfileProps extends RouteComponentProps { }

export default Profile;