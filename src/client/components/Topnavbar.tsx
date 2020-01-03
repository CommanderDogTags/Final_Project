import * as React from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';

const Topnavbar: React.FC<TopnavbarProps> = props => {

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.clear();
        window.location.replace('/');
    };

    return (
        <>
        <nav className="navbar p-2 shadow-sm fixed-top sticky-nav">
            
                <h2
                    className="text-primary custom-center"
                    id="plantstagram">
                    Plantstagram
                </h2>
           
                <button
                    className="btn btn-outline-primary btn-sm shadow-effect logout"
                    onClick={handleLogout}>
                    Logout
                </button>
            
        </nav>
        </>
    );
}

interface TopnavbarProps { }

export default Topnavbar;