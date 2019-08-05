import dex from '../pokedex';
import trainers from '../trainers';

import Decimal from 'break_infinity.js';
import upgrades from '../upgrades';

function calcClicksPerTick(state) {
    let totalClicks = 0;
    let totalMoney = new Decimal(0);
    let trainerMult = 1;
    let canTradeAll = false;
    let canCompleteDex = true;

    for(let i of dex.gen[state.generation]) {
        if(state.owned[i.Id]) {
            let m = dex.calcMoney(i.Id, state.owned[i.Id], state.traded[i.Id]);
            m = m.mul(Math.pow(3, state.generation - 1));
            totalMoney = totalMoney.add(m);

            if(!canTradeAll) {
                let tradeCost = dex.tradeCost(state.traded[i.Id]);
                if(state.owned[i.Id] >= tradeCost) {
                    canTradeAll = true;
                }
            }
        } else if(!state.traded[i.Id]) {
            canCompleteDex = false;
        }
    }

    trainerMult = Decimal.pow(1.01, trainerMult);

    for(let t of trainers._list) {
        if(state.trainer[t]) {

            totalClicks += trainers.power(t, state);
        }
    }

    state.clicksPerTick = totalClicks;
    state.moneyPerTick = totalMoney;
    state.canTradeAll = canTradeAll;
    state.canCompleteDex = canCompleteDex;
}

function trade_pokemon(state, id) {
    let nPokemon = state.owned[id] || 0;
    let nTraded = state.traded[id] || 0;
    let cost = dex.tradeCost(nTraded);
    
    if(nPokemon >= cost) {
        state.owned[id] = nPokemon - cost;
        state.traded[id] = nTraded + 1;
        
        return true;
    }

    return false;
}

export default function reduce(state, action) {
    switch(action.type) {
        case 'button_click': {
            let ret = {...state, owned: {...state.owned}}

            let gotten = dex.getRandomMon();

            let mult = 1;

            for(let b of ["great_ball", "ultra_ball", "master_ball"]) {
                if(state.upgrade[b]) mult *= 10;
            }

            for(let i = 0; i < mult; i++) {
                ret.owned[gotten.Id] = ret.owned[gotten.Id] + 1;
                ret.manualClicks ++;
            }

            calcClicksPerTick(ret);

            return ret;
        }
        case 'trade_pokemon': {
            let ret = { ...state, owned: {...state.owned}, traded: {...state.traded} };

            if(trade_pokemon(ret, action.id)) {
                calcClicksPerTick(ret);
                return ret;
            }

            return state;

        }
        case 'trade_all': {
            let ret = {...state, owned: {...state.owned}, traded: {...state.traded} };
            let changed = false;

            for(let i of dex._list) {
                while(trade_pokemon(ret, dex[i].Id)) {
                    changed = true;
                }
            }

            if(changed) {
                calcClicksPerTick(ret);
                return ret;
            }
            return state;
        }
        case 'tick': {
            //let ret = {...state, owned: {...state.owned}};
            let ret = state;
            let copied = false;

            let tick = state.clicksPerTick + state.partialTick;

            for(let i = 0; i < tick; i++) {
                if(!copied) {
                    ret = {...state, owned: {...state.owned}};
                    copied = true;
                }
                let gotten = dex.getRandomMon();

                ret.owned[gotten.Id] = ret.owned[gotten.Id] + 1;
                
                tick -= 1;
            }
            if(copied) {
                calcClicksPerTick(ret);
            }

            if(tick) {
                if(!copied) {
                    ret = {...state};
                    copied = true;
                }
                ret.partialTick = tick;
            }

            if(ret.moneyPerTick.compare(0) > 0) {
                if(!copied) {
                    ret = {...state};
                    copied = true;
                }
                ret.money = ret.money.add(ret.moneyPerTick);
            }
            if(ret.manualClicks || ret.manualClicksPerTick) {
                if(!copied) {
                    ret = {...state};
                    copied = true;
                }
                ret.manualClicksPerTick = ret.manualClicks;
                ret.manualClicks = 0;
            }

            return ret;
        }
        case 'change_tab': {
            let ret = state;

            if(state.tab !== action.tab) {
                ret = {
                    ...state,
                    tab: action.tab
                };
            }

            return ret;
        }
        case 'level_trainer': {
            let ret = state;

            let cost = trainers.calcCost(action.id, ret.trainer[action.id]);

            if(ret.money.compare(cost) >= 0) {
                ret = {
                    ...state,
                    money: ret.money.minus(cost),
                    trainer: {
                        ...state.trainer,
                        [action.id]: state.trainer[action.id] + 1
                    }
                };

                calcClicksPerTick(ret);
            }

            return ret;
        }
        case 'purchase_upgrade': {
            let ret = state;

            let okay = true;
            let upgrade = upgrades[action.id];

            if(upgrade.reqTrainer) {
                if(state.trainer[upgrade.reqTrainer] < upgrade.reqLevel) {
                    okay = false;
                }
            }

            if(okay) {
                if(state.money.compare(upgrade.cost) < 0) {
                    okay = false;
                }
            }

            if(okay) {
                ret = {
                    ...state,
                    money: state.money.minus(upgrade.cost),
                    upgrade: {
                        ...state.upgrade,
                        [action.id]: true
                    }
                }

                calcClicksPerTick(ret);
            }

            return ret;
        }
        case 'save': {
            let data = { ...state };

            data.saved = Date.now();

            data = JSON.stringify(data);

            localStorage.pokeClicker = data;

            return state;
        }
        case 'load': {
            try {
                let newState = JSON.parse(action.data);

                newState.money = new Decimal(newState.money);
                newState.moneyPerTick = new Decimal(newState.moneyPerTick);

                if(newState.saved) {
                    let saved = new Date(newState.saved);
                    delete newState.saved;
                    
                    let deltaMs = Date.now() - saved;

                    newState.money = newState.money.add(newState.moneyPerTick * deltaMs / 1000);
                }

                if(!newState.generation) newState.generation = 1;

                dex.calculateChances(dex.maxIdForGen(newState.generation));

                if(!newState.upgrade) {
                    newState.upgrade = {};
                }

                return newState;

            } catch(e) {
                return state;
            }
        }
        case 'complete_pokedex': {
            let ret = state;
            let okay = true;

            if(state.generation === 7) { //we don't have gen 8+ yet...
                okay = false;
            }
            
            if(okay) {
                for(let i of dex.gen[state.generation]) {
                    if(!state.owned[i.Id] && !state.traded[i.Id]) {
                        okay = false;
                        break;
                    }
                }
            }

            if(okay) {
                ret = {...state};
                for(let i of dex._list) {
                    ret.owned[i] = 0;
                    ret.traded[i] = 0;
                }
                for(let t of trainers._list) {
                    ret.trainer[t] = 0;
                }
                ret.upgrade = {};
                ret.partialTick = 0;
                ret.manualClicks = 0;
                ret.money = new Decimal(0);
                ret.generation += 1;

                calcClicksPerTick(ret);

                dex.calculateChances(dex.maxIdForGen(ret.generation));
            }

            return ret;
        }
        case "reset": {
            let ret = reduce(undefined, {});

            dex.calculateChances(dex.maxIdForGen(ret.generation));

            return ret;
        }
        case "cheat_dex": {
            let ret = {...state, owned: { ...state.owned }};

            for(let p of dex.gen[state.generation]) {
                ret.owned[p.Id] += 1;
            }

            calcClicksPerTick(ret);
            console.log("Cheated dex");
            
            return ret;
        }
        case "cheat_money": {
            let ret = {...state};

            ret.money = new Decimal('1e200');
            
            return ret;
        }
        default: {
            if(typeof state === "undefined") {
                state = {
                    clicksPerTick: 0,
                    partialTick: 0,
                    manualClicks: 0,
                    manualClicksPerTick: 0,
                    money: new Decimal(0),
                    moneyPerTick: new Decimal(0),
                    canTradeAll: 0,
                    tab: "pokedex",
                    generation: 1,
                    caughtAll: false,
                };
                let owned = {};
                let traded = {}
                let trainer = {};
                let upgrade = {};

                state.owned = owned;
                state.traded = traded;
                state.trainer = trainer;
                state.upgrade = upgrade;

                for(let i of dex._list) {
                    owned[i] = 0;
                    traded[i] = 0;
                }

                for(let i of trainers._list) {
                    trainer[i] = 0;
                }
            }

            return state;
        }
    }
}