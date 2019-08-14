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

        let showCost = true;

        if(this.props.level && !up.repeatable) {
            showCost = false;
        } else if(up.repeatable && this.props.level >= up.maxLevel) {
            showCost = false;
        }

        let boost = null;

        if(up.boostScale && this.props.level) {
            boost = "Current Bonus: x" + Math.pow(up.boostScale, this.props.level);
        } else if(up.repeatable && !up.boostScale && this.props.level) {
            boost = "Level: " + this.props.level;
        }

        return (
            <div className={klass} style={gridPos(up.x, up.y)} onClick={onClick} id={"upgrade_" + this.props.id}>
                {up.name}<br/>
                {showCost ? (
                <>Cost: {this.props.cost}<br/></>
                ) : null}
                {boost}
            </div>
        );
    }
}