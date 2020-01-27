import * as React from 'react';

const PlantInfo: React.FC<PlantInfoProps> = props => {

    return (
        <>
            <div className="col-md-4 p-1">
                <div className="align-items-center">
                <div className="border rounded border-primary bg-white">
                    <div className="card-body text-center display:block">

                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

interface PlantInfoProps { }

export default PlantInfo;