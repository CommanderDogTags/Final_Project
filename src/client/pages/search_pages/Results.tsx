import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Bottomnavbar from '../../components/nav/Bottomnavbar';
import { useState, useEffect } from 'react';
import { User } from '../../utils/api';
import { Link } from 'react-router-dom';
import ResultsPhotoCard from '../../components/cards/ResultsPhotoCard';
import { FaArrowLeft } from 'react-icons/fa';

const Results: React.FC<ResultsProps> = props => {
    const [results, setResults] = useState<SearchResult[]>([])
    const [query, setQuery] = useState(props.location.state.query)

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'You must be logged in to view this page!' });
                } else {
                    setResults(props.location.state.results)
                    setIsLoading(false);
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
                    to={{ pathname: `/search`, state: { query } }}
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

            {isLoading ? <div className="mx-auto photo-page-spinner"></div> :
                <div className="row no-gutters" id="photo-padding">
                    {results.map(result => (
                        <ResultsPhotoCard key={`resultsphotocard-${result.photo_id}`} results={result} />
                    ))}
                </div>
            }

            <Bottomnavbar />
        </>
    );
};

interface ResultsProps extends RouteComponentProps { }

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

export default Results;