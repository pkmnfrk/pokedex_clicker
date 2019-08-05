import React from 'react';

import './Pokemon.css';
import { formatPercent, formatMoney } from '../util';
import dex from '../pokedex';

export default class Pokemon extends React.PureComponent {
    render() {
        let mon = dex[this.props.id];
        let nextTrade = dex.tradeCost(this.props.traded);
        let value = dex.calcMoney(this.props.id, 1, this.props.traded).mul(Math.pow(3, this.props.generation - 1)).toNumber()

        let className = "caught";
        if(!this.props.caught && !this.props.traded) {
            className = "uncaught";
        } else if (this.props.caught >= nextTrade) {
            className = "tradable";
        }
        className += " " + mon.Type1;
        return (
            <li className={"pokemon " + className} onClick={() => this.props.onTradePokemon(this.props.id)}>
                <div className="name">{mon.Name}</div>
                <div className="caught">Caught: {this.props.caught}</div>
                <div className="value">{formatMoney(value, 2)}/s</div>
                <div className="extended">
                    <div>Chance: {formatPercent(mon.Chance)}%</div>
                    <div>Next Trade: {nextTrade}</div>
                </div>
            </li>
        );
    }
}