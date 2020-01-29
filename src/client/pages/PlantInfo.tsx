import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { json, User } from '../utils/api';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Bottomnavbar from '../components/Bottomnavbar';

const PlantInfo: React.FC<PlantInfoProps> = props => {
    const [info, setInfo] = useState<{ 
        common_name: string, 
        scientific_name: string, 
        duration: string,
        genus: {name:string},
        class: {name:string},
        family: {name:string},
        images: [{url:string}]
    }>({
        common_name: '',
        scientific_name: '',
        duration: '',
        genus:{name:''},
        class:{name:''},
        family:{name:''},
        images: [{url:''}]
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                if (!User || User.user_id === null || User.role !== 'guest') {
                    props.history.replace('/', { msg: 'You must be logged in to view this page!' });
                } else {
                    let info = await json(`/api/plants/plantinfo/details/${props.location.state.id}`);
                    setInfo(info);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    let test = (<>
        {info.images.map(image => (
            <img 
                src={image.url} 
                key={`plantimage-${image.url}`}
                className="mx-1 my-1 plant-info-image-size"
            />
        ))}

        <div className="row justify-content-center">
            <p className="font-weight-bold text-primary">Common Name:</p>
                <p className="ml-1">{info?.common_name || 'n/a'}</p>
        </div>

        <div className="row justify-content-center">
            <p className="font-weight-bold text-primary">Scientific Name:</p>
                <p className="ml-1">{info?.scientific_name || 'n/a'}</p>
        </div>

        <div className="row justify-content-center">
            <p className="font-weight-bold text-primary">Genus:</p>
                <p className="ml-1">{info.genus?.name || 'n/a'}</p>
        </div>

        <div className="row justify-content-center">
            <p className="font-weight-bold text-primary">Family:</p>
                <p className="ml-1">{info.family?.name || 'n/a'}</p>
        </div>

        <div className="row justify-content-center">
            <p className="font-weight-bold text-primary">Class:</p>
                <p className="ml-1">{info.class?.name || 'n/a'}</p>
        </div>

        <div className="row justify-content-center">
            <p className="font-weight-bold text-primary">Duration:</p>
                <p className="ml-1">{info?.duration || 'n/a'}</p>
        </div>
        </>);

    return (
        <>
            <nav className="navbar p-2 shadow-sm fixed-top sticky-nav bg-white">

                <Link
                    to="/myplants"
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

            <div className="col-md-10 mx-auto p-4" id="plant-info-padding">
                <div className="align-items-center">
                        <div className="card-body text-center">
                            {isLoading ? <div className="loader mx-auto mt-5"></div> : test}
                            {/* <PlantInfoCard info={info} /> will go where test is */}
                        </div>
                </div>
            </div>

            <Bottomnavbar />
        </>
    );
}

interface PlantInfoProps extends RouteComponentProps { }

export default PlantInfo;