import React, { useState } from 'react';
import PropTypes from "prop-types";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

const NavBar = ({logOut, setIsHome, setCreate}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink onClick={()=>{setCreate(true)}}>New Post</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  onClick={()=>{setCreate(false)}}>Posts</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/weslleylc/django-react-boilerplate">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText onClick={logOut} style={{cursor: "pointer"}}> Sing Out </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}


NavBar.propTypes = {
    onClick : PropTypes.func.isRequired
}

Navbar.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
}

Navbar.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
}

NavbarBrand.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
}

NavbarText.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
}


export default NavBar;