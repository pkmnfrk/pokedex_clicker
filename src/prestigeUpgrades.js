let prestigeUpgrades = {
    multPrestigePoints: {
        x: 4,
        y: 1,
        name: "Multiply Prestige Points earned by x2",
        cost: 1,
        costScale: 5,
        repeatable: true,
        boostScale: 2
    },
    boostCatchRate: {
        x: 2,
        y: 2,
        name: "Boost catch rate of rare Pokémon",
        req: ["multPrestigePoints"],
        cost: 1,
        costScale: 5,
        repeatable: true,
    },
    boostClickRate: {
        x: 6,
        y: 2,
        name: "Boost click rate of all trainers by x1.1",
        req: ["multPrestigePoints"],
        cost: 2,
        costScale: 4,
        repeatable: true,
        boostScale: 1.1,
    },
    boostMoneyRate: {
        x: 4,
        y: 3,
        name: "Boost earning rate of all Pokémon by x1.5",
        req: ["multPrestigePoints"],
        cost: 2,
        costScale: 3,
        repeatable: true,
        boostScale: 1.5,
    },
    startWithGreatBall: {
        x: 1,
        y: 4,
        name: "Start with the Great Ball unlocked.",
        req: ["boostCatchRate"],
        cost: 10
    },
    startWithUltraBall: {
        x: 1,
        y: 5,
        name: "Start with the Ultra Ball unlocked.",
        req: ["startWithGreatBall"],
        cost: 100
    },
    startWithMasterBall: {
        x: 1,
        y: 6,
        name: "Start with the Master Ball unlocked.",
        req: ["startWithUltraBall"],
        cost: 1000
    },
    startWithJoey: {
        x: 7,
        y: 4,
        name: "Start with Joey hired",
        req: ["boostClickRate"],
        cost: 10,
        costScale: 2,
        repeatable: true,
    },
    startWithIrene: {
        x: 7,
        y: 5,
        name: "Start with Irene hired",
        req: ["startWithJoey"],
        cost: 100,
        costScale: 2,
        repeatable: true,
    },
    startWithBernie: {
        x: 7,
        y: 6,
        name: "Start with Bernie hired",
        req: ["startWithIrene"],
        cost: 1000,
        costScale: 2,
        repeatable: true,
    },
    startWithEdwin: {
        x: 7,
        y: 7,
        name: "Start with Edwin hired",
        req: ["startWithBernie"],
        cost: 10000,
        costScale: 2,
        repeatable: true,
    }
    /*
    test1: {
        x: 1,
        y: 1,
        name: "Test",
        req: ["boostCatchRate", "boostClickRate"],
        cost: 1000000
    },
    */
};

prestigeUpgrades._list = Object.keys(prestigeUpgrades);

prestigeUpgrades.cost = function(id, level) {
    let ret = prestigeUpgrades[id].cost;

    if(prestigeUpgrades[id].repeatable) {
        ret = ret * Math.pow(prestigeUpgrades[id].costScale, level)
    }

    if(!ret) ret = 1;

    return ret;
}

prestigeUpgrades.eligible = function(id, state) {
    let up = prestigeUpgrades[id];

    if(up.req) {
        for(let req of up.req) {
            if(!state.prestigeUpgrade[req]) {
                return false;
            }
        }
    }

    return true;
}

prestigeUpgrades.purchasable = function(id, state) {
    if(!prestigeUpgrades.eligible(id, state))
        return false;

    let up = prestigeUpgrades[id];

    if(!up.repeatable && state.prestigeUpgrade[id])
        return false;

    if(up.maxLevel && state.prestigeUpgrade[id] >= up.maxLevel)
        return false;

    let cost = prestigeUpgrades.cost(id, state.prestigeUpgrade[id]);

    if(cost > state.prestigePoints)
        return false;

    return true;
}


export default prestigeUpgrades;