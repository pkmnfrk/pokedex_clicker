import React from 'react';
import prestigeUpgrades from '../prestigeUpgrades';

import './PrestigePage.css';
import PrestigeUpgrade from './DynamicPrestigeUpgrade';




export default class PrestigePage extends React.PureComponent {
    render() {
        if(!this.props.prestiges)
            return null;

        return <div id="PrestigePage">
            <h1>Prestige</h1>
            <div>You have {this.props.prestigePoints} prestige points</div>
            <div id="prestigeGrid">
                {prestigeUpgrades._list.map(up => <PrestigeUpgrade key={up} id={up} />)}
            </div>
        </div>;
    }
}