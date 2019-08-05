import {connect} from 'react-redux';
import ListOfTrainers from './ListOfTrainers';

import trainers from '../trainers.js';
import upgrades from '../upgrades.js';
import dex from '../pokedex';

let nPokemon = -1;

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

    if(upgrade.reqPokemon) {
        
        if(nPokemon === -1) {
            nPokemon = 0;
            for(let p of dex.gen[state.generation]) {
                if(state.owned[p.Id] || state.traded[p.Id]) {
                    nPokemon += 1;
                }
            }
        }
        if(nPokemon < upgrade.reqPokemon) {
            return false;
        }
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

    nPokemon = -1;

    return {
        trainers: trainers._list.filter(t => t === lowestLockedTrainer || state.trainer[t] > 0),
        upgrades: upgrades._list.filter(u => isUpgradeVisible(u, state)),
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