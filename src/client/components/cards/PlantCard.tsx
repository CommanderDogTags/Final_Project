import * as React from 'react';
import { json } from '../../utils/api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const PlantCard: React.FC<PlantCardProps> = props => {

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to remove this plant from your collection?',
            icon: 'warning',
            confirmButtonText: 'Yes!',
            confirmButtonColor: '#67DDBB',
            showCancelButton: true,
            cancelButtonColor: '#DD6B67',
            cancelButtonText: 'No!'
        }).then((result: any) => {
            if (result.value) {
                try {
                    let response = json(`/api/plants/${props.plants.plant_id}`, 'DELETE');
                    window.location.reload();
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    };

    return (
        <>
            <div className="col-md-4 p-4">
                <div className="border rounded border-primary bg-white">
                    <div className="card-body display:block">
                        <div className="row justify-content-end mr-1 mb-2">
                            <button
                                className="btn btn-outline-primary btn-sm shadow-effect justify-content-end"
                                id="hover"
                                onClick={handleDelete}
                            >
                                x
                            </button>
                        </div>

                        <p className="font-weight-bold text-primary text-center">Common Name:</p>
                        <p className="text-center">{props.plants?.common_name || 'n/a'}</p>
                        <p className="font-weight-bold text-primary text-center">Scientific Name:</p>
                        <p className="text-center">{props.plants?.scientific_name || 'n/a'}</p>

                        <div className="row justify-content-center">
                            <Link
                                to={{ pathname: `/plantinfo/${props.plants.trefle_id}`, state: { id: props.plants.trefle_id } }}
                                className="btn btn-outline-primary btn-md shadow-effect"
                                id="hover"
                            >
                                Plant Info
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