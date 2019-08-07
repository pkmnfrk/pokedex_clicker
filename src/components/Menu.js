import React from 'react';

import './Menu.css';

export default class Menu extends React.PureComponent {
    render() {
        let items = React.Children.toArray(this.props.children);
        let children = [];

        let onChange  = this.props.onChange;
        
        for(let i = 0; i < items.length; i++) {
            let id = items[i].props.id;
            let newProps = {};

            if(typeof(items[i].props.visible) !== "undefined" && !items[i].props.visible) {
                continue;
            }

            if(onChange) {
                newProps.onClick = function() {
                    onChange(id);
                };
            }

            if(this.props.selected === id) {
                newProps.selected = true;
            }
            
            let itm = React.cloneElement(items[i], newProps)

            children.push(itm);
        }
        

        return (
            <ul className="menu">
                {children}
            </ul>
        );
    }
}