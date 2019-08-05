import React from 'react';

import upgrades from '../upgrades';

import './Upgrade.css';
import Button from './Button';

import {formatMoney } from '../util';


export default class Upgrade extends React.PureComponent {
    render() {
        return (
            <li>
                <img className="image" src={upgrades[this.props.id].image} alt="" />
                <div className="name">{upgrades[this.props.id].name}</div>
                <div className="description">{upgrades[this.props.id].description}</div>
                {!this.props.purchased ? <Button disabled={!this.props.canBuy} onClick={this.props.purchaseUpgrade}>Buy for {formatMoney(upgrades[this.props.id].cost)}</Button> : null}
                <div className="quote">{upgrades[this.props.id].flavour}</div>
            </li>
        )
    }
}