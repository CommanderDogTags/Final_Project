import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome, MdSearch, MdPerson, MdAdd } from 'react-icons/md';
import { IoMdHeartEmpty } from 'react-icons/io';

const Bottomnavbar: React.FC<BottomnavbarProps> = props => {

    return (
        <nav className="nav p-2 shadow fixed-bottom stick-nav bg-white">

            <NavLink
                id="hover" 
                exact to="/all"
                className="btn btn-outline-primary mx-auto my-auto shadow-effect"
                activeClassName="btn btn-primary mx-auto my-auto shadow-effect text-white">
                <MdHome className="iconfontsize" />
            </NavLink>

            <NavLink
                id="hover"
                exact to="/compose"
                className="btn btn-outline-primary mx-auto my-auto shadow-effect"
                activeClassName="btn btn-primary mx-auto my-auto shadow-effect text-white">
                <MdAdd className="iconfontsize" />
            </NavLink>

            <NavLink
                id="hover"
                exact to="/likedphotos"
                className="btn btn-outline-primary mx-auto my-auto shadow-effect"
                activeClassName="btn btn-primary mx-auto my-auto shadow-effect text-white">
                <IoMdHeartEmpty className="iconfontsize" />
            </NavLink>

            <NavLink
                id="hover"
                exact to="/search"
                className="btn btn-outline-primary mx-auto my-auto shadow-effect"
                activeClassName="btn btn-primary mx-auto my-auto shadow-effect text-white">
                <MdSearch className="iconfontsize" />
            </NavLink>

            <NavLink
                id="hover"
                exact to="/profile"
                className="btn btn-outline-primary mx-auto my-auto shadow-effect"
                activeClassName="btn btn-primary mx-auto my-auto shadow-effect text-white">
                <MdPerson className="iconfontsize" />
            </NavLink>

        </nav>
    );
}

interface BottomnavbarProps { }

export default Bottomnavbar;