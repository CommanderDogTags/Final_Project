import * as React from 'react';
import { Link } from 'react-router-dom';

const PlantCard: React.FC<PlantCardProps> = props => {

    return (
        <>
            <div className="col-md-4 p-4">
                <div className="align-items-center">
                <div className="border rounded border-primary bg-white">
                    <div className="card-body text-center display:block">
                            <p className="font-weight-bold text-primary">Common Name:</p>
                            <p>{props.plants?.common_name || 'n/a'}</p>
                            <p className="font-weight-bold text-primary">Scientific Name:</p>
                            <p>{props.plants?.scientific_name || 'n/a'}</p>
                        <Link 
                            to={{pathname: `/plantinfo/${props.plants.trefle_id}`, state: {id: props.plants.trefle_id}}}
                            className = "btn btn-outline-primary btn-sm shadow-effect"
                            id="hover"
                        >
                                Info
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

interface PlantCardProps {
    plants: {    
        plant_id: number,
        trefle_id: number,
        common_name: string,
        scientific_name: string,
        _created: string
    }
}

export default PlantCard;