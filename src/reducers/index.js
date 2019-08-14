import dex from '../pokedex';
import trainers from '../trainers';

import Decimal from 'break_infinity.js';
import upgrades from '../upgrades';
//import { multiplierForPrestiges } from '../util';
import prestigeUpgrades from '../prestigeUpgrades';
import { updateLines } from '../components/PrestigePage';

function calcClicksPerTick(state) {
    let totalClicks = 0;
    let totalMoney = new Decimal(0);
    let canTradeAll = false;
    let canCompleteDex = true;
    let nPokemon = 0;

    let multiplier = Math.pow(2, state.prestigeUpgrade.boostMoneyRate || 0) * Math.pow(3, state.generation - 1);

    for(let i of dex.gen[state.generation]) {
        if(state.owned[i.Id]) {
            nPokemon += 1;
            let m = dex.calcMoney(i.Id, state.owned[i.Id], state.traded[i.Id], multiplier);
            totalMoney = totalMoney.add(m);

            if(!canTradeAll) {
                let tradeCost = dex.tradeCost(state.traded[i.Id]);
                if(state.owned[i.Id] >= tradeCost) {
                    canTradeAll = true;
                }
            }
        } else if(state.traded[i.Id]) {
            nPokemon += 1;
        } else if(!state.traded[i.Id]) {
            canCompleteDex = false;
        }
    }

    for(let t of trainers._list) {
        if(state.trainer[t]) {

            totalClicks += trainers.power(t, state);
        }
    }

    state.pokemonCount = nPokemon;
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

function catchNPokemon(ret, n) {

    //for performance reasons, once we start getting into large numbers of clicks, make some
    //statistical assumptions about how many we catch
    //this is probably not super accurate

    let nNormal = Math.max(1, Math.floor(n / 2000));

    while(n >= 1) {

        let gotten = dex.getRandomMon(ret.generation);

        let nCount = Math.min(n, Math.floor(Math.max(1, nNormal * gotten.Chance)));

        if(!ret.owned[gotten.Id] && !ret.traded[gotten.Id]) {
            ret.latestNewCatch = gotten.Id;
        }
        
        ret.owned[gotten.Id] = ret.owned[gotten.Id] + nCount;
        
        n -= nCount;
    }

    return n;
}

export default function reduce(state, action) {
    switch(action.type) {
        case 'button_click': {
            let ret = {...state, owned: {...state.owned}}

            let mult = 1;

            for(let b of ["great_ball", "ultra_ball", "master_ball"]) {
                if(state.upgrade[b]) mult *= 10;
            }

            //mult *= multiplierForPrestiges(state);

            if(state.leftoverManualClicks) {
                mult += state.leftoverManualClicks;
            }

            ret.manualClicks += mult;

            ret.leftoverManualClicks = catchNPokemon(ret, mult);

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
            return tick(state)
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
            return levelTrainer(state, action.id, action.max);
        }
        case 'purchase_upgrade': {
            return purchaseUpgrade(state, action.id);
        }
        case 'purchase_prestige': {
            return purchasePrestigeUpgrade(state, action.id);
        }
        case 'save': {
            return saveData(state);
        }
        case 'load': {
            return loadData(state, action.data);
        }
        case 'complete_pokedex': {
            return completePokedex(state, action.isCheat);
        }
        case "reset": {
            return resetAllData();
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
        case "cheat_pp": {
            let ret = {...state};

            ret.prestigePoints = 1000000;
            
            return ret;
        }
        case 'set_option': {
            return setOption(state, action.option, action.value);
        }
        default: {
            if(typeof state === "undefined") {
                state = resetAllData();
            }

            return state;
        }
    }
}

function arraysMatch(a, b) {
    if(!Array.isArray(a) || !Array.isArray(b)) return false;

    if(a.length !== b.length) return false;

    for(let i = 0; i < a.length; i++) {
        if(a[i] !== b[i]) return false;
    }

    return true;
}

function calculatePurchasableUpgrades(state) {
    let upList = [];
    let purchUpList = [];
    let visTrainers = [];

    for(let t of trainers._list) {
        visTrainers.push(t);

        if(!state.trainer[t]) break;
    }

    state.canPurchaseUpgrade = false;

    for(let u of upgrades._list) {
        let upgrade = upgrades[u];

        if(state.upgrade[u]) {
            purchUpList.push(u);
            continue;
        }

        if(upgrade.reqTrainer && state.trainer[upgrade.reqTrainer] < upgrade.reqLevel) {
            continue;
        }
    
        if(upgrade.reqUpgrade && !state.upgrade[upgrade.reqUpgrade]) {
            continue;
        }
    
        if(upgrade.reqGen && state.generation < upgrade.reqGen) {
            continue;
        }
    
        if(upgrade.reqPokemon && state.pokemonCount < upgrade.reqPokemon) {
            continue;
        }
    
        upList.push(u);

        if(state.money.compare(upgrade.cost) >= 0) {
            state.canPurchaseUpgrade = true;
        }
    }

    if(!arraysMatch(state.purchaseableUpgrades, upList)) {
        state.purchaseableUpgrades = upList;
    }

    if(!arraysMatch(state.purchasedUpgrades, purchUpList)) {
        state.purchasedUpgrades = purchUpList;
    }

    if(!arraysMatch(state.visibleTrainers, visTrainers)) {
        state.visibleTrainers = visTrainers;
    }

    return state;
}

function resetAllData() {
    let state = {
        version: 1,
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
        pokemonCount: 0,
        prestiges: 0,
        latestNewCatch: 0,
        options: {},
        upgrade: {},
        prestigePoints: 0,
        prestigeUpgrade: {},
    };
    let owned = {};
    let traded = {};
    let trainer = {};
    state.owned = owned;
    state.traded = traded;
    state.trainer = trainer;
    for (let i of dex._list) {
        owned[i] = 0;
        traded[i] = 0;
    }
    for (let i of trainers._list) {
        trainer[i] = 0;
    }
    dex.calculateChances(state.generation, state);
    calculatePurchasableUpgrades(state);
    return state;
}

function completePokedex(state, isCheat) {
    let ret = state;
    let okay = true;
    
    if(okay && !isCheat) {
        for(let i of dex.gen[state.generation]) {
            if(!state.owned[i.Id] && !state.traded[i.Id]) {
                okay = false;
                break;
            }
        }
    }

    if(okay) {
        ret = {...state, owned: {}, traded: {}, trainer: {}, upgrade: {}};
        for(let i of dex._list) {
            ret.owned[i] = 0;
            ret.traded[i] = 0;
        }
        for(let t of trainers._list) {
            ret.trainer[t] = 0;
        }
        ret.partialTick = 0;
        ret.manualClicks = 0;
        ret.money = new Decimal(0);
        ret.latestNewCatch = 0;

        if(ret.generation === 7) {
            ret.generation = 1;
            ret.prestiges += 1;
            ret.prestigePoints += Math.pow(2, ret.prestigeUpgrade.multPrestigePoints || 0);
        } else {
            ret.generation += 1;
        }

        calcClicksPerTick(ret);
        calculatePurchasableUpgrades(ret);

        dex.calculateChances(ret.generation, ret);
    }

    return ret;
}

function loadData(state, data) {
    let newState;
    try {
        newState = JSON.parse(data);
    } catch(e) {
        console.error(e);
        return state;
    }

    newState.money = new Decimal(newState.money);
    newState.moneyPerTick = new Decimal(newState.moneyPerTick);

    if(newState.saved) {
        //let saved = new Date(newState.saved);
        delete newState.saved;        
    }

    migrateVersion(newState);

    dex.calculateChances(newState.generation, newState);
    calculatePurchasableUpgrades(newState);
    calcClicksPerTick(newState);

    return newState;
}

function saveData(state) {
    let data = { ...state };

    data.saved = Date.now();
    delete data.purchaseableUpgrades;
    delete data.purchasedUpgrades;
    delete data.availableUpgrades;

    data = JSON.stringify(data);

    localStorage.pokeClicker = data;

    return state;
}

function purchaseUpgrade(state, id) {
    let ret = state;

    let okay = true;
    let upgrade = upgrades[id];

    if(okay && upgrade.reqTrainer && state.trainer[upgrade.reqTrainer] < upgrade.reqLevel) {
        okay = false;
    }

    if(okay && upgrade.reqPokemon && state.pokemonCount < upgrade.reqPokemon) {
        okay = false;
    }

    if(okay && upgrade.reqUpgrade && !state.upgrade[upgrade.reqUpgrade]) {
        okay = false;
    }

    if(okay && state.money.compare(upgrade.cost) < 0) {
        okay = false;
    }

    if(okay) {
        ret = {
            ...state,
            money: state.money.minus(upgrade.cost),
            upgrade: {
                ...state.upgrade,
                [id]: true
            }
        }

        dex.calculateChances(ret.generation, ret);
        calcClicksPerTick(ret);
        calculatePurchasableUpgrades(ret);
    }

    return ret;
}

function levelTrainer(state, id, max) {
    let ret = state;
    let cost;
    let num;

    if(max) {
        let c = trainers.calcMaxCost(id, ret.trainer[id], ret.money);
        cost = c[0];
        num = c[1] - ret.trainer[id];
    } else {
        cost = trainers.calcCost(id, ret.trainer[id]);
        num = 1;
    }

    if(num > 0 && ret.money.compare(cost) >= 0) {
        ret = {
            ...state,
            money: ret.money.minus(cost),
            trainer: {
                ...state.trainer,
                [id]: state.trainer[id] + num
            }
        };

        calcClicksPerTick(ret);
        calculatePurchasableUpgrades(ret);
    }

    return ret;
}

function tick(state) {
    //let ret = {...state, owned: {...state.owned}};
    let ret = { ...state};

    if(!ret.lastTick) {
        ret.lastTick = Date.now() - 1000;
    }

    let nDate = Date.now();
    let nTicks = (nDate - ret.lastTick) / 1000;
    ret.lastTick = nDate;

    let tick = (nTicks * state.clicksPerTick) + state.partialTick;

    if(ret.moneyPerTick.compare(0) > 0) {
        ret.money = ret.money.add(ret.moneyPerTick * nTicks);
    }

    if(tick > 1) {
        ret.owned = {...state.owned};
    }
    ret.partialTick = catchNPokemon(ret, tick);
    
    calcClicksPerTick(ret);
    calculatePurchasableUpgrades(ret);

    if(ret.manualClicks || ret.manualClicksPerTick) {
        ret.manualClicksPerTick = ret.manualClicks / nTicks;
        ret.manualClicks = 0;
    }

    return ret;
}

function setOption(state, option, value) {
    if(state.options[option] !== value) {
        state = {...state, options: {...state.options}};
        state.options[option] = value;
    }
    return state;
}

function migrateVersion(state) {
    if(!state.version) {
        state.prestigePoints = Math.floor(state.prestiges * 1.5);
        state.prestigeUpgrade = {};
        state.version = 1;
    }
}

function purchasePrestigeUpgrade(state, id) {
    if(!prestigeUpgrades.purchasable(id, state))
        return state;

    state = {...state, prestigeUpgrade: {...state.prestigeUpgrade}};

    let cost = prestigeUpgrades.cost(id, state.prestigeUpgrade[id] || 0);

    state.prestigeUpgrade[id] = (state.prestigeUpgrade[id] || 0) + 1;
    state.prestigePoints -= cost;

    dex.calculateChances(state.generation, state);
    calcClicksPerTick(state);

    return state;
}