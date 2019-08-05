import React from 'react';

import './MenuItem.css';

export default class MenuItem extends React.PureComponent {
    render() {
        let klas = "";

        if(this.props.selected) {
            if(klas) klas += " ";
            klas += "selected";
        }
        return (
            <li className={klas} onClick={this.props.onClick}>
                {this.props.children}
            </li>
        );
    }
}