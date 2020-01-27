import * as React from 'react';
import { Link } from 'react-router-dom';

const PlantCard: React.FC<PlantCardProps> = props => {

    return (
        <>
            <div className="col-md-6 p-4">
                <div className="align-items-center">
                <div className="border rounded border-primary bg-white">
                    <div className="card-body text-center display:block">
                            <p className="font-weight-bold">Common Name:</p>
                            <p>{props.plants.common_name}</p>
                            <p className="font-weight-bold">Scientific Name:</p>
                            <p>{props.plants.scientific_name}</p>
                        <Link 
                            to={`/plantinfo/${props.plants.trefle_id}`}
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