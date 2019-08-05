import React from 'react';

import './ListOfTrainers.css';
import DynamicTrainer from './DynamicTrainer';
import DynamicUpgrade from './DynamicUpgrade';

export default class ListOfTrainers extends React.PureComponent {
    render() {
        return (
            <div id="ListOfTrainers">
                <p>Trainers are helpful buddies that will go out and automatically catch Pokémon for you! However, they can only do so with your guidance, which means that they won't catch any Pokémon while you are offline.</p>
                <h2>Trainers</h2>
                <ul id="trainers">
                    {this.props.trainers.map(p => (<DynamicTrainer key={p} id={p} />))}
                </ul>
                <h2>Upgrades</h2>
                <ul id="upgrades">
                    {this.props.upgrades.map(u => (<DynamicUpgrade key={u} id={u} />))}
                </ul>
                <div style={{clear:'both'}}></div>
            </div>
        );
    }
}