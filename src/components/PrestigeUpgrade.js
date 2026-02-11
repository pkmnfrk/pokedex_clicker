import React from 'react';
import prestigeUpgrades from '../prestigeUpgrades';

import './PrestigeUpgrade.css';
import { formatNumber } from '../util';

function gridPos(col, row) {
    col += 1;
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

        if(this.props.purchasable) {
            klass += " purchasable";
        }

        if(up.repeatable && (!up.maxLevel || this.props.level < up.maxLevel)) {
            klass += " repeatable";
        } else {
            klass += " nonrepeatable";
        }


        let boost = null;

        if(up.boostScale && this.props.level) {
            boost = up.boost || 1;
            let pre = up.boostPrefix || "Current Bonus: x";
            let suf = up.boostSuffix || "";

            boost = pre + formatNumber(boost * Math.pow(up.boostScale, this.props.level), 2) + suf;
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