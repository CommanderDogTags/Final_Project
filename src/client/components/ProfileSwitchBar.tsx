import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { MdPhoto } from 'react-icons/md';

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
                    <FaLeaf />
                </Link>

            </nav>
        </>
    );
}

interface ProfileSwitchBarProps { }

export default ProfileSwitchBar;