import React from 'react';
import prestigeUpgrades from '../prestigeUpgrades';

import './PrestigeUpgrade.css';

function gridPos(col, row) {
    return { gridArea: row + "/" + col + "/" + row + "/" + (col + 2) };
}

export default class PrestigeUpgrade extends React.PureComponent {
    render() {
        let up = prestigeUpgrades[this.props.id];
        let onClick = this.props.purchaseUpgrade;
        let klass = "prestigeUpgrade";

        if(!this.props.eligible || !this.props.purchasable) {
            klass += " unavailable";
            onClick = null;
        }

        if(this.props.level) {
            klass += " purchased";
        }

        if(this.props.level) {
            klass += " purchased";
        }

        return (
            <div className={klass} style={gridPos(up.x, up.y)} onClick={onClick} id={"upgrade_" + this.props.id}>
                {up.name}<br/>
                Cost: {this.props.cost}<br/>
                {this.props.id === "multPrestigePoints" ? <>
                Current Bonus: x{Math.pow(2, this.props.level)}
                </> : null }
            </div>
        );
    }
}