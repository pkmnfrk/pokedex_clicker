import React from 'react';

import './ListOfPokemon.css';
import DynamicPokemon from './DynamicPokemon';
import Button from './Button';

export default class ListOfPokemon extends React.PureComponent {
    render() {
        return (
            <div id="ListOfPokemon">
                <p><Button onClick={this.props.onTradeAll} disabled={!this.props.canTradeAll}>Trade all Pokémon</Button></p>
                {this.props.canCompleteDex ?
                <p><Button onClick={this.props.onCaughtAll}>Complete Pokédex</Button></p>
                : null }
                <ul>
                    {this.props.pokemon.map(p => (<DynamicPokemon
                                            key={p.Id}
                                            id={p.Id}
                                            caught={this.props.caught[p.Id]}
                                            traded={this.props.traded[p.Id]}
                                        />))}
                </ul>
            </div>
        );
    }
}