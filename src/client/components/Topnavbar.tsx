import * as React from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';

const Topnavbar: React.FC<TopnavbarProps> = props => {

    return (
        <>
            <nav className="navbar p-2 shadow-sm fixed-top sticky-nav bg-white">

                <h2
                    className="text-primary custom-center unselectable"
                    id="plantstagram">
                    Plantstagram
                </h2>
                
            </nav>
        </>
    );
}

interface TopnavbarProps { }

export default Topnavbar;