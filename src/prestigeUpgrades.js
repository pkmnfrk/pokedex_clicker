let prestigeUpgrades = {
    multPrestigePoints: {
        x: 4,
        y: 1,
        name: "Multiply Prestige Points earned by x2",
        cost: 1,
        costScale: 5,
        repeatable: true,
        maxLevel: 5
    },
    test1: {
        x: 3,
        y: 2,
        name: "Test 1",
        req: ["multPrestigePoints"],
    },
    test2: {
        x: 5,
        y: 2,
        name: "Test 2",
        req: ["multPrestigePoints"],
    },
    
    test3: {
        x: 1,
        y: 2,
        name: "Test 3",
        req: ["multPrestigePoints"],
    },
    _list: [
        "multPrestigePoints", "test1", "test2", "test3"
    ]
};

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