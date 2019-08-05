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
import old_sea_map from './images/old_sea_map.png';
import gs_ball from './images/gs_ball.png';
import aurora_ticket from './images/aurora_ticket.png';
import member_card from './images/member_card.png';
import oaks_letter from './images/oaks_letter.png';
import azure_flute from './images/azure_flute.png';

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
    old_sea_map: {
        name: "Old Sea Map",
        description: "Increases the odds of catching Mew.",
        flavour: "A faded sea chart that shows the way to a far away island.",
        image: old_sea_map,
        cost: 1e17,
        reqPokemon: 100,
    },
    gs_ball: {
        name: "GS Ball",
        description: "Increases the odds of catching Celebi.",
        flavour: "A mysterious ball colored Gold and Silver.",
        image: gs_ball,
        cost: 1e15,
        reqPokemon: 150,
        reqGen: 2
    },
    aurora_ticket: {
        name: "Aurora Ticket",
        description: "Increases the odds of catching Deoxys.",
        flavour: "A strange glowing ticket to Birth Island.",
        image: aurora_ticket,
        cost: 1e16,
        reqPokemon: 300,
        reqGen: 3
    },
    member_card: {
        name: "Member Card",
        description: "Increases the odds of catching Darkrai.",
        flavour: "A card needed for entering a certain inn. Oddly, the last date marked is 50 years ago.",
        image: member_card,
        cost: 1e17,
        reqPokemon: 350,
        reqGen: 4
    },
    oaks_letter: {
        name: "Oak's Letter",
        description: "Increases the odds of catching Shaymin",
        flavour: "A letter from Prof. Oak about a curious floral region.",
        image: oaks_letter,
        cost: 1e18,
        reqPokemon: 400,
        reqGen: 4
    },
    azure_flute: {
        name: "Azure Flute",
        description: "Increases the odds of catching Arceus",
        flavour: "A flute that puts out echoing sounds that do not seem to be of this world.",
        image: azure_flute,
        cost: 1e19,
        reqPokemon: 450,
        reqGen: 4
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
        "master_ball",
        "old_sea_map",
        "gs_ball",
        "aurora_ticket",
        "member_card",
        "oaks_letter",
        "azure_flute",
    ],
};

export default upgrades;