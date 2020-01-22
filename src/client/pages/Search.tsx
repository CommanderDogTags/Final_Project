import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import { MdSearch } from 'react-icons/md';

const Search: React.FC<SearchProps> = props => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'You must be logged in to view this page!' });
                } else {
                    if (props.location.state.query.length > 0){
                        setQuery(props.location.state.query)
                    } 
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const queryButtonPress = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        // let sanitizeQuery = 
        let results = await json(`/api/photos/search?username=${query}`)
        console.log(results);
        setResults(results);
        props.history.push('/results', { query, results });
    }

    const queryKeyPress = async (e:any) => {
        if (e.key === "Enter") {
            let results = await json(`/api/photos/search?username=${query}`)
            console.log(results);
            setResults(results);
            props.history.push('/results', { query, results });
        }
    }

    const isEnabled = query.length > 0;

    return (
        <>
            <Topnavbar />

            <div className="row h-100 no-gutters">
                <div className="container text-center col-md-6 offset-md-3 my-auto p-3">

                    <div className="input-group">
                        <input
                            className="form-control mt-4 p-2"
                            type="text"
                            placeholder="Search for photos by username..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyPress={queryKeyPress}
                        />
                            <button
                                className="btn btn-lg btn-outline-primary reveal mt-4"
                                type="submit"
                                id="button-hover"
                                onClick={queryButtonPress}
                                disabled={!isEnabled}>
                                    <MdSearch />
                            </button>
                        <span className="input-group-btn">
                        </span>
                    </div>

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
    _updated: Date,
    username: string,
    avatar_path: string
}

export default Search;