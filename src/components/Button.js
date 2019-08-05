import React from 'react';
import './Button.css';


export default function Button(props) {
    let className = "enabled";
    if(props.disabled) className = "disabled";
    className = "btn " + className;

    let style = {};

    if(props.bgcolor) {
        style.backgroundColor = props.bgcolor;
    }

    if(props.color) {
        style.color = props.color;
    }

    return (
        <span className={className} onClick={props.onClick} style={style}>{props.children}</span>
    );
};