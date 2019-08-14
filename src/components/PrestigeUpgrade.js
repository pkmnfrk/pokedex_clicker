import React from 'react';
import prestigeUpgrades from '../prestigeUpgrades';

import './PrestigeUpgrade.css';
import { formatNumber } from '../util';

function gridPos(col, row) {
    return { gridArea: row + "/" + col + "/" + row + "/" + (col + 2) };
}

export default class PrestigeUpgrade extends React.PureComponent {
    render() {
        let up = prestigeUpgrades[this.props.id];
        let onClick = this.props.purchaseUpgrade;
        let klass = "prestigeUpgrade";
        let showCost = true;

        if(this.props.level && !up.repeatable) {
            showCost = false;
        } else if(up.repeatable && this.props.level >= up.maxLevel) {
            showCost = false;
        }

        if(this.props.level) {
            klass += " purchased";
        }

        if(!showCost) {
            if(!showCost) {
                klass += " maxed";
            }
        } else {
            if(!this.props.eligible || !this.props.purchasable) {
                klass += " unavailable";
                onClick = null;
            }
        }

        let boost = null;

        if(up.boostScale && this.props.level) {
            boost = "Current Bonus: x" + formatNumber(Math.pow(up.boostScale, this.props.level), 2);
        } else if(up.repeatable && !up.boostScale && this.props.level) {
            boost = "Level: " + this.props.level;
        }

        return (
            <div className={klass} style={gridPos(up.x, up.y)} onClick={onClick} id={"upgrade_" + this.props.id}>
                {up.name}<br/>
                {showCost ? (
                <>Cost: {formatNumber(this.props.cost)}<br/></>
                ) : null}
                {boost}
            </div>
        );
    }
}