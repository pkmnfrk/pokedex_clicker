import React from 'react';

import './Footer.css';

export default class Footer extends React.PureComponent {
    render() {
        return (
            <div id="Footer">
                <p>Pokémon is &copy;Nintendo. This application is &copy;2019 <a href="https://twitter.com/Mike_Caron">Mike Caron (@Mike_Caron)</a>, and is created as free software and parody. Inspired by <a href="https://www.game-change.co.uk/pokeclicker/">PokéClicker</a> by <a href="https://www.reddit.com/r/incremental_games/comments/8ttxbi/i_made_a_pokemoninspired_idle_clicker_in_reactjs/">/u/jforcedavies</a>.</p>
                <p>This project is <a href="https://github.com/pkmnfrk/pokedex_clicker">open source</a>. Having trouble? Submit an issue on the <a href="https://github.com/pkmnfrk/pokedex_clicker/issues">bug tracker</a>.</p></div>
        )
    }
}