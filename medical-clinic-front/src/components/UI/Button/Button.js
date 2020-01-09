import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {

    let btnclass = classes.ButtonGreen;
    if (props.type === 'green'){
        btnclass = classes.ButtonGreen;
    }else if(props.type === 'grey'){
        btnclass = classes.ButtonGrey;
    }else if (props.type === 'red'){
        btnclass = classes.ButtonRed;
    }else if (props.type === 'black'){
        btnclass = classes.ButtonBlack;
    }

    return (
        <button className={btnclass} style={props.style} onClick={props.click}>{props.children}</button>
    );
};

export default Button;