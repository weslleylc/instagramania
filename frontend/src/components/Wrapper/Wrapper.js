import React from "react";
import './wrapper.scss';

function Wrapper(props) {

    return (
        <div className="App text-dark">
            {[...Array(30)].map( (e, i) =>{
                return  <div key={i} className="particle"></div>
            })}
            {props.children}
        </div>
    );
}

export default Wrapper;
