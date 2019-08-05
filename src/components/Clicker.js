import React from 'react';

import "./Clicker.css";

import Menu from './Menu';
import MenuItem from './MenuItem';
import { formatNumber, formatMoney } from '../util';

export default class Clicker extends React.PureComponent {

    render() {
        return (
            <div id="ClickerWrapper">
                <div id="Clicker" onClick={this.props.onClick} className={this.props.ballKind}>
                    <div className="bottom"></div>
                    <div className="button"></div>
                </div>
                <div id="Stats">
                    Automatic Clicks: {formatNumber(this.props.clicksPerTick)}/s<br/>
                    Manual Clicks: {formatNumber(this.props.manualClicksPerTick)}/s<br/>
                    Money: {formatMoney(this.props.money)} (+{formatMoney(this.props.moneyPerTick)}/s)<br/>
                    Current Gen: {this.props.generation}
                </div>
                <div id="ExtraControls">
                    <Menu onChange={this.props.onTabChange} selected={this.props.tab}>
                        <MenuItem id="pokedex">Pokédex</MenuItem>
                        <MenuItem id="trainers">Trainers/Upgrades</MenuItem>
                        <MenuItem id="options">Options</MenuItem>
                    </Menu>
                </div>
            </div>
        );
    }
}