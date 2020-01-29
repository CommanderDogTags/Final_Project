import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Bottomnavbar from '../components/Bottomnavbar';
import PlantResultsCard from '../components/cards/PlantResultsCard';

const PlantResults: React.FC<PlantResultsProps> = props => {
    const [results, setResults] = useState<SearchResult[]>([])
    const [query, setQuery] = useState(props.location.state.query)

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'You must be logged in to view this page!' });
                } else {
                    setResults(props.location.state.results)
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <nav className="navbar p-2 shadow-sm fixed-top sticky-nav bg-white">

                <Link
                    to={{ pathname: `/myplants`, state: { query } }}
                    className="btn btn-outline-primary shadow-effect back-button-padding"
                    id="hover" >
                    <FaArrowLeft />
                </Link>

                <h2
                    className="text-primary custom-center unselectable"
                    id="plantstagram">
                    Plantstagram
                </h2>

            </nav>

            <div className="row no-gutters" id="photo-padding">
                {results.map(result => (
                    <PlantResultsCard key={`resultsphotocard-${result.id}`} results={result} />
                ))}
            </div>

            <Bottomnavbar />
        </>
    );
};

interface PlantResultsProps extends RouteComponentProps { }

interface SearchResult {
    id: number,
    slug: string,
    scientific_name: string,
    common_name: string
}

export default PlantResults;