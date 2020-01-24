import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { json, User } from '../utils/api';
import { MdSearch } from 'react-icons/md';
import Topnavbar from '../components/Topnavbar';
import Bottomnavbar from '../components/Bottomnavbar';

const axios = require('axios').default;

const PlantSearch: React.FC<PlantSearchProps> = props => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'You must be logged in to view this page!' });
                } else {
                    
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    // const queryButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     axios.get('https://trefle.io/api/plants', {
    //         headers: { 
    //             'Authorization': 'Bearer QVpUdG1rcUFuNlVTVlF0M05QbFV1dz09' 
    //         },
    //         params: {
    //             q: query
    //         }
    //   })
    //   .then(function(response: any) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error:any) {
    //     console.log(error);
    //   }); 
    // }

    // const queryButtonPress = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     try {
    //         let response: any = await json('/api/plants', query);
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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
                                placeholder="Search for plants by name..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                            />

                            <button
                                className="btn btn-lg btn-outline-primary reveal mt-4"
                                type="submit"
                                id="button-hover"
                                // onClick={queryButtonPress}
                                disabled={!isEnabled}
                            >
                                    <MdSearch />
                            </button>

                    </div>

                </div>
            </div>
            
            <Bottomnavbar />
        </>
    );
};

interface PlantSearchProps extends RouteComponentProps { }

interface SearchResult {
    id: number,
    slug: string,
    scientific_name: string,
    common_name: string
}

export default PlantSearch;