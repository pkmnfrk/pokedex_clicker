import {connect} from 'react-redux';
import ListOfTrainers from './ListOfTrainers';

import trainers from '../trainers.js';
import upgrades from '../upgrades.js';

function isUpgradeVisible(id, state) {
    let upgrade = upgrades[id];

    if(upgrade.reqTrainer && state.trainer[upgrade.reqTrainer] < upgrade.reqLevel) {
        return false;
    }

    if(upgrade.reqUpgrade && !state.upgrade[upgrade.reqUpgrade]) {
        return false;
    }

    if(upgrade.reqGen && state.generation < upgrade.reqGen) {
        return false;
    }

    if(upgrade.reqPokemon && state.pokemonCount < upgrade.reqPokemon) {
        return false;
    }

    return true;
}

function mapStateToProps(state) {
    let lowestLockedTrainer = null;

    for(let t of trainers._list) {
        if(!state.trainer[t]) {
            lowestLockedTrainer = t;
            break;
        }
    }

    return {
        trainers: trainers._list.filter(t => t === lowestLockedTrainer || state.trainer[t] > 0),
        upgrades: upgrades._list.filter(u => !state.upgrade[u] && isUpgradeVisible(u, state)),
        purchasedUpgrades: upgrades._list.filter(u => state.upgrade[u]),
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


const DynamicListOfTrainers = connect(
    mapStateToProps,
    mapDispatchToProps
) (ListOfTrainers);

export default DynamicListOfTrainers;