import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import { Link } from 'react-router-dom';

const Search: React.FC<SearchProps> = props => {

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
            
            <div className="row h-100">
            <div className="container text-center col-md-6 offset-md-3 my-auto">
                <p>Page for searches</p>
            </div>
            </div>

            <Bottomnavbar />
        </>
    );
};

interface SearchProps extends RouteComponentProps { }

export default Search;