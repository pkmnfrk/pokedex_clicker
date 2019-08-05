import React from 'react';

import './ListOfPokemon.css';
import DynamicPokemon from './DynamicPokemon';
import Button from './Button';

export default class ListOfPokemon extends React.PureComponent {
    render() {
        return (
            <div id="ListOfPokemon">
                <p>Click on the big Pokéball above to catch a random Pokémon! Different Pokémon have different chances, you can mouse over them to see.</p>
                <p>Each Pokémon you catch will earn a small bit of money every second. If you catch 10 of the same kind, you can trade them in to increase the income from that species in the future. This number goes up the more times you do it. You can mouse over them to see this too.</p>
                <p>If you manage to catch them all, something special might happen...</p>
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