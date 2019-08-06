import React from 'react';

import './ListOfTrainers.css';
import DynamicTrainer from './DynamicTrainer';
import DynamicUpgrade from './DynamicUpgrade';

export default class ListOfTrainers extends React.PureComponent {
    render() {
        return (
            <div id="ListOfTrainers">
                <h2>Trainers</h2>
                <ul id="trainers">
                    {this.props.trainers.map(p => (<DynamicTrainer key={p} id={p} />))}
                </ul>
                {this.props.upgrades.length ?
                <>
                <h2>Upgrades</h2>
                <ul id="upgrades">
                    {this.props.upgrades.map(u => (<DynamicUpgrade key={u} id={u} />))}
                </ul>
                </> : null }
                {this.props.purchasedUpgrades.length ?
                <>
                <h2>Purchased Upgrades</h2>
                <ul id="purchased_upgrades">
                    {this.props.purchasedUpgrades.map(u => (<DynamicUpgrade key={u} id={u} />))}
                </ul>
                </> : null }

            </div>
        );
    }
}