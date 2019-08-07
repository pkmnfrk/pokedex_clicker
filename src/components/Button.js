import React from 'react';
import './Button.css';


export default function Button(props) {
    let className = "enabled";
    let onClick = props.onClick;

    if(props.disabled) {
        className = "disabled";
        onClick = null;
    }
    className = "btn " + className;

    let style = {};

    if(props.bgcolor) {
        style.backgroundColor = props.bgcolor;
    }

    if(props.color) {
        style.color = props.color;
    }

    return (
        <span className={className} onClick={onClick} style={style}>{props.children}</span>
    );
};