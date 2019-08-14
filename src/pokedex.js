import Decimal from "break_infinity.js";

import data from './pokedex.json';

let upgrades = {
    151: "old_sea_map",
    251: "gs_ball",
    386: "aurora_ticket",
    491: "member_card",
    492: "oaks_letter",
    493: "azure_flute",
};

data.calculateChances = function(gen, state) {
    let total = 0;
    for(let i of data.gen[gen]) {
        let r = i.Rarity;

        if(upgrades[i.Id] && state.upgrade[upgrades[i.Id]]) {
            r *= 100;
        }

        total += r;
    }

    let sum = 0;
    for(let i of data.gen[gen]) {
        let r = i.Rarity;

        if(upgrades[i.Id] && state.upgrade[upgrades[i.Id]]) {
            r *= 100;
        }

        i.Chance = r / total;
        sum += i.Chance;
        i.LinearChance = sum;
    }
};

data.getRandomMon = function(generation) {
    let rand = Math.random();
    let gen = data.gen[generation];

    let start = 0, end = gen.length - 1;

    while(start <= end) {
        let mid = Math.floor((start + end) / 2);

        let item = gen[mid].LinearChance;

        if(item >= rand) {
            //confirm that this item is greater, but the previous item is lower
            if(mid === 0 || gen[mid - 1].LinearChance < rand) {
                return gen[mid];
            }
        }

        if(item < rand) { //go higher
            start = mid + 1
        } else { //go lower
            end = mid - 1;
        }
    }

    /*
    for(let i of data._list) {
        if(data[i].LinearChance >= rand) {
            return data[i];
        }
    }
    */

    console.error('Did not find a mon?! ', rand);
    return 1;
};

data.calcMoney = function(id, caught, traded, multiplier = 1) {
  return Decimal.pow(2, traded).mul(data[id].Value).mul(caught).mul(multiplier);
}

data.tradeCost = function(nTraded) {
    return Math.ceil(10 * Math.pow(1.2, nTraded || 0));
}

data.maxIdForGen = function(gen) {
    switch(gen) {
        case 1: return 151;
        case 2: return 251;
        case 3: return 386;
        case 4: return 493;
        case 5: return 649;
        case 6: return 721;
        case 7: return 807;
        default: throw new Error("Unknown gen " + gen);
    }
}

data.gen = {};

for(let i = 1; i <= 7; i++) {
    let list = data._list.filter(p => p <= data.maxIdForGen(i));
    data.gen[i] = list.map(p => data[p]);
}

export default data;
