import React from 'react';
import prestigeUpgrades from '../prestigeUpgrades';

import './PrestigePage.css';
import PrestigeUpgrade from './DynamicPrestigeUpgrade';


function updateLines() {
    for(let line of document.getElementsByTagName("line")) {
        let from = document.getElementById(line.dataset.from);
        let to = document.getElementById(line.dataset.to);

        line.x1.baseVal.value = from.offsetLeft + from.offsetWidth / 2;
        line.y1.baseVal.value = from.offsetTop + from.offsetHeight / 2;

        line.x2.baseVal.value = to.offsetLeft + to.offsetWidth / 2;
        line.y2.baseVal.value = to.offsetTop + to.offsetHeight / 2;

    }
}

export default class PrestigePage extends React.PureComponent {
    componentDidMount() {
        window.addEventListener('resize', updateLines)
        updateLines();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', updateLines);
    }

    render() {
        if(!this.props.prestiges)
            return null;

        let lines = prestigeUpgrades._list.flatMap(p => {
            return prestigeUpgrades[p].req ? prestigeUpgrades[p].req.map(r => (
                <line key={p + "_" + r} data-from={"upgrade_" + p} data-to={"upgrade_" + r}></line>
            )) : null;
        });

        return <div id="PrestigePage">
            <h1>Prestige</h1>
            <div>You have {this.props.prestigePoints} prestige points</div>
            <div id="prestigeGrid">
                {prestigeUpgrades._list.map(up => <PrestigeUpgrade key={up} id={up} />)}
                <svg>
                {lines}
                </svg>
            </div>
        </div>;
    }
}