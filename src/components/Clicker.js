import React from 'react';

import "./Clicker.css";

import Menu from './Menu';
import MenuItem from './MenuItem';
import { formatNumber, formatMoney, formatPercent } from '../util';
import dex from '../pokedex';

export default class Clicker extends React.PureComponent {

    render() {
        let className = "";

        if(!this.props.pinPokeball && this.props.tab !== "prestige") {
            className = "pinned";
        }

        if(this.props.ballKind) {
            className = " " + this.props.ballKind;
        }

        return (
            <div id="ClickerWrapper">
                <div id="Clicker" onClick={this.props.onClick} className={className}>
                    <div className="bottom"></div>
                    <div className="button"></div>
                </div>
                <div id="Stats">
                    Automatic Clicks: {formatNumber(this.props.clicksPerTick)}/s
                    <br/>Manual Clicks: {formatNumber(this.props.manualClicksPerTick)}/s
                    <br/>Money: {formatMoney(this.props.money)} (+{formatMoney(this.props.moneyPerTick)}/s)
                    <br/>Current Gen: {this.props.generation}
                    <br/>Caught: {this.props.pokemonCount} / {this.props.totalCount}
                    {this.props.trainerMultTemp > 1 ? <><br/>Catch Rate: {formatPercent(this.props.trainerMultTemp)}%</> : null}
                    {this.props.latestNewCatch ? <><br/>Last new Pokémon: {dex[this.props.latestNewCatch].Name} ({formatPercent(dex[this.props.latestNewCatch].Chance)}%)</> : null}
                </div>
                <div id="ExtraControls">
                    <Menu onChange={this.props.onTabChange} selected={this.props.tab}>
                        <MenuItem id="pokedex" highlight={this.props.canCompleteDex}>Pokédex</MenuItem>
                        <MenuItem id="trainers" highlight={this.props.canPurchaseUpgrade}>Trainers/Upgrades</MenuItem>
                        <MenuItem id="prestige" visible={this.props.prestiges > 0}>Prestige ({formatNumber(this.props.prestigePoints)})</MenuItem>
                        <MenuItem id="badges" visible={this.props.badgesUnlocked}>Badges</MenuItem>
                        <MenuItem id="help">Help</MenuItem>
                        <MenuItem id="options">Options</MenuItem>
                    </Menu>
                </div>
            </div>
        );
    }
}