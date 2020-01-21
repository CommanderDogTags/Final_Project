import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoIosArrowDropdown } from 'react-icons/io';

const ProfileNavbar: React.FC<ProfileNavbarProps> = props => {
    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.clear();
        window.location.replace('/');
    };

    const handleDropdown = async (e: React.MouseEvent<HTMLButtonElement>) => {
        document.getElementById("myDropdown").classList.toggle("show");
    };

    return (
        <>
            <nav className="navbar p-2 shadow-sm fixed-top sticky-nav bg-white">

                <img 
                    className="avatar-size shadow-effect unselectable" 
                    src={props.user.avatar_path} 
                    alt="profile picture"
                />

                <h2
                    className="text-primary custom-center-profile unselectable"
                    id="plantstagram">
                    {props.user.username}
                </h2>

                <ul>
                    <li> <IoIosArrowDropdown className="dropdownfontsize text-primary dropdown-icon" />
                        <ul>
                            <NavLink
                                id="dropdown-hover"
                                exact to="/editavatar"
                                className="btn btn-outline-primary btn-sm mx-auto mb-2 shadow-effect bg-white"
                                activeClassName="btn btn-primary mx-auto mb-2 shadow-effect text-white">
                                Update Avatar
                            </NavLink>

                            {/* <NavLink
                                id="dropdown-hover"
                                exact to="/changepassword"
                                className="btn btn-outline-primary btn-sm mx-auto mb-2 shadow-effect bg-white"
                                activeClassName="btn btn-primary mx-auto mb-2 shadow-effect text-white">
                                Update Password
                            </NavLink> */}

                            <button 
                                className="btn btn-outline-primary btn-sm shadow-effect mx-auto mb-2 bg-white"
                                id="dropdown-hover"
                                onClick={handleLogout}>
                                    Logout
                            </button>

                        </ul>
                    </li>
                </ul>



            </nav>
        </>
    );
}

interface ProfileNavbarProps {
    user: {
        username: string,
        avatar_path: string,
        role: string,
        user_id: number
    }
}

export default ProfileNavbar;