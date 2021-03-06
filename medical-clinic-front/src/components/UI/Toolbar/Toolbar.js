import React from 'react';
import {NavLink} from 'react-router-dom';

const Toolbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#1">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="#2">Features</a>
                    <a className="nav-item nav-link" href="#3">Pricing</a>
                    <NavLink className="nav-item nav-link" to="/" exact>Logout</NavLink>
                    {/*<a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>*/}
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;