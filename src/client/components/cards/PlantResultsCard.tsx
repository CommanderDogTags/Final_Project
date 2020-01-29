import * as React from 'react';
import { useState } from 'react';
import { json, User } from '../../utils/api';

const PlantResultsCard: React.FC<PlantResultsCardProps> = props => {
    const [user_id] = useState(User.user_id);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let trefle_id = props.results.id;
            let common_name = props.results.common_name;
            let scientific_name = props.results.scientific_name;
            let response: any = await json('/api/plants', 'POST', { user_id, trefle_id, common_name, scientific_name });
            console.log(response);
            window.location.replace(`/myplants`)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="col-md-4 p-4">
                <div className="align-items-center">
                <div className="border rounded border-primary bg-white">
                    <div className="card-body text-center display:block">
                            <p className="font-weight-bold text-primary">Common Name:</p>
                            <p>{props.results?.common_name || 'n/a'}</p>
                            <p className="font-weight-bold text-primary">Scientific Name:</p>
                            <p>{props.results?.scientific_name || 'n/a'}</p>
                        <div className="row justify-content-center">
                            <button 
                                className="btn btn-outline-primary btn-sm shadow-effect" 
                                id="hover"
                                onClick={handleSubmit}
                            >
                                Add to My Plants
                            </button>
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