import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {

    let btnclass = classes.ButtonGreen;
    if (props.type === 'green'){
        btnclass = classes.ButtonGreen;
    }else if(props.type === 'grey'){
        btnclass = classes.ButtonGrey;
    }

    return (
        <button className={btnclass}>{props.children}</button>
    );
};

export default Button;