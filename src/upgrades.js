import shorts from './images/shorts.png';
import scarf from './images/scarf.png';
import great_ball from './images/great_ball.png';
import ultra_ball from './images/ultra_ball.png';
import master_ball from './images/master_ball.png';

let upgrades = {
    shorts: {
        name: "Shorts",
        description: "Increases Joey's click rate by 3x.",
        flavour: "Comfy, and easy to wear.",
        reqTrainer: "joey",
        reqLevel: 10,
        image: shorts,
        cost: 1e6,
    },
    scarf: {
        name: "Silk Scarf",
        description: "Increases Irene's click rate by 3x.",
        flavour: "A sumptuous scarf",
        reqTrainer: "irene",
        reqLevel: 10,
        image: scarf,
        cost: 1e9,
    },
    great_ball: {
        name: "Great Ball",
        description: "Increases the player's click rate x10",
        flavour: "A good, high-performance Poké Ball that provides a higher catch rate.",
        image: great_ball,
        cost: 1e5,
    },
    ultra_ball: {
        name: "Ultra Ball",
        description: "Increases the player's click rate x100",
        flavour: "An ultra-high performance Poké Ball that provides a higher catch rate.",
        image: ultra_ball,
        cost: 1e10,
        reqUpgrade: "great_ball"
    },
    master_ball: {
        name: "Master Ball",
        description: "Increases the player's click rate x1000",
        flavour: "The best Poké Ball with the ultimate level of performance.",
        image: master_ball,
        cost: 1e15,
        reqUpgrade: "ultra_ball"
    },
    _list: [
        "shorts",
        "scarf",
        "great_ball",
        "ultra_ball",
        "master_ball"
    ],
};

export default upgrades;