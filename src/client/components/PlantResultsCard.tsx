import * as React from 'react';
import { Link } from 'react-router-dom';

const PlantResultsCard: React.FC<PlantResultsCardProps> = props => {

    return (
        <>
            <div className="col-md-4 p-1">
                <div className="align-items-center">
                <div className="border rounded border-primary bg-white">
                    <div className="card-body text-center display:block">
                            <p>Common Name:</p>
                            <p>{props.results.common_name}</p>
                            <p>Scientific Name: {props.results.scientific_name}</p>

                        <div className="row justify-content-center">
                            <button className="btn btn-outline-primary btn-sm shadow-effect" id="hover">Add to My Plants</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

interface PlantResultsCardProps {
    results: {    
        id: number,
        slug: string,
        scientific_name: string,
        common_name: string
    }
}

export default PlantResultsCard;