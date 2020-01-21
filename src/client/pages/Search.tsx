import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import { Link } from 'react-router-dom';

const Search: React.FC<SearchProps> = props => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])

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

    const makeQuery = async () => {
        // let sanitizeQuery = 
        let results = await json(`/api/photos/search?username=${query}`)
        console.log(results);
        setResults(results);
        props.history.push('/results', {state: results});
    }

    return (
        <>
            <Topnavbar />
            
            <div className="row h-100 no-gutters">
            <div className="container text-center col-md-6 offset-md-3 my-auto p-3">
                <input type="text" className="form-control" placeholder="Search for photos by username..." value={query} onChange={e => setQuery(e.target.value)}/>
                <button className="btn btn-outline-primary mt-2" id="hover" onClick={makeQuery}>Search</button>
            </div>
            </div>

            <Bottomnavbar />
        </>
    );
};

interface SearchProps extends RouteComponentProps { }

interface SearchResult {
        photo_id: number,
        user_id: number,
        caption: string,
        image_path: string,
        _created: Date,
        _updated: Date
}

export default Search;