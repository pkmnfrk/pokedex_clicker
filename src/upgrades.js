import shorts from './images/shorts.png';
import scarf from './images/scarf.png';
import scope_lens from './images/scope_lens.png';
import charcoal from './images/charcoal.png';
import safety_goggles from './images/safety_goggles.png';
import rose_incense from './images/rose_incense.png';
import lum_berry from './images/lum_berry.png';
import expert_belt from './images/expert_belt.png';
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
    charcoal: {
        name: "Charcoal",
        description: "Increases Bernie's click rate by 3x.",
        flavour: "A combustible fuel that boosts the power of Fire.",
        reqTrainer: "bernie",
        reqLevel: 10,
        image: charcoal,
        cost: 1e12,
    },
    scope_lens: {
        name: "Scope Lens",
        description: "Increases Edwin's click rate by 3x.",
        flavour: "It's a lens for scoping out weak points.",
        reqTrainer: "edwin",
        reqLevel: 10,
        image: scope_lens,
        cost: 1e15,
    },
    safety_goggles: {
        name: "Safety Goggles",
        description: "Increases Dusty's click rate by 3x.",
        flavour: "These goggles protect the wearer from weather effects.",
        reqTrainer: "dusty",
        reqLevel: 10,
        image: safety_goggles,
        cost: 1e18,
    },
    rose_incense: {
        name: "Rose Icense",
        description: "Increases Brianna's click rate by 3x.",
        flavour: "It is an exotic-smelling incense that boosts the Grass type.",
        reqTrainer: "brianna",
        reqLevel: 10,
        image: rose_incense,
        cost: 1e21,
    },
    lum_berry: {
        name: "Lum Berry",
        description: "Increases Catherine's click rate by 3x.",
        flavour: "A miracle berry that can cure any status condition.",
        reqTrainer: "catherine",
        reqLevel: 10,
        image: lum_berry,
        cost: 1e24,
    },
    expert_belt: {
        name: "Expert Belt",
        description: "Increases Makayla's click rate by 3x.",
        flavour: "It's a well-worn belt that slightly boosts one's power",
        reqTrainer: "makayla",
        reqLevel: 10,
        image: expert_belt,
        cost: 1e27,
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
        "charcoal",
        "scope_lens",
        "safety_goggles",
        "rose_incense",
        "lum_berry",
        "expert_belt",
        "great_ball",
        "ultra_ball",
        "master_ball"
    ],
};

export default upgrades;