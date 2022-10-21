import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    if (currentUser) {
        return (
            <div className="dropdown" onClick={toggleMenu}>
                <div className="btn dropdown-toggle d-flex align-items-center">
                    <div className="me-2">{currentUser.name}</div>
                    <img className="img-responsive rounded-circle"
                        src={currentUser.image}
                        alt="Profile image"
                        height="40"
                        width="40" />
                </div>
                <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                    <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
                    <Link to={`/logout`} className="dropdown-item">Log out</Link>
                </div>
            </div >
        );
    }
};

export default NavProfile;
