import * as React from 'react';
import { Link } from 'react-router-dom';
import { MdPhoto } from 'react-icons/md';
import { GiFlowerPot } from 'react-icons/gi';

const ProfileSwitchBar: React.FC<ProfileSwitchBarProps> = props => {

    return (
        <>
            <nav className="navbar p-3 shadow-sm fixed sticky-nav bg-white switch-bar">

                <Link
                    to={{ pathname: `/profile`}}
                    className="btn btn-outline-primary btn-lg shadow-effect mx-auto"
                    id="hover" >
                    <MdPhoto />
                </Link>

                <Link
                    to={{ pathname: `/myplants`}}
                    className="btn btn-outline-primary btn-lg shadow-effect mx-auto"
                    id="hover" >
                    <GiFlowerPot />
                </Link>

            </nav>
        </>
    );
}

interface ProfileSwitchBarProps { }

export default ProfileSwitchBar;