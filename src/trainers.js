import Decimal from 'break_infinity.js';

import youngster from './images/youngster.png';
import picnicker from './images/picnicker.png';
import collector from './images/collector.png';
import lady from './images/lady.png';
import ruin_maniac from './images/ruin_maniac.png';
import ranger from './images/ranger_f.png';
import kindler from './images/kindler.png';
import expert from './images/expert_f.png';

let trainers = {
    joey: {
        name: "Youngster Joey",
        image: youngster,
        quotes: [
            "My Rattata is in the top percentage of all Rattata!",
            "I like shorts, they're comfy and easy to wear!"
        ],
        baseCost: 1e2,
        basePower: 1,
        upgrades: {
            shorts: 3
        }
    },
    irene: {
        name: "Picnicker Irene",
        image: picnicker,
        quotes: [
            "Have you made your Pokémon evolve much?",
            "Me, I'm not just a pretty face!"
        ],
        baseCost: 2e4,
        basePower: 4,
        upgrades: {
            scarf: 3,
        }
    },
    bernie: {
        name: "Kindler Bernie",
        image: kindler,
        quotes: [
            "If you're lighting a campfire, make sure you have water handy!",
            "Play with fire, and be burned..."
        ],
        baseCost: 4e6,
        basePower: 16,
    },
    edwin: {
        name: "Collector Edwin",
        image: collector,
        quotes: [
            "Could I see your Pokémon? Just one look, please?",
            "When I see a Pokémon I don't know, my passion is ignited!"
        ],
        baseCost: 8e8,
        basePower: 64,
    },
    dusty: {
        name: "Ruin Maniac Dusty",
        image: ruin_maniac,
        quotes: [
            "For thirty years I have searched for ancient ruins!",
            "I'm convinced that the sea keeps secrets from us."
        ],
        baseCost: 16e10,
        basePower: 256,
    },
    brianna: {
        name: "Lady Brianna",
        image: lady,
        quotes: [
            "Giggle... Your grim look is so charming!",
            "We must have been fated to meet."
        ],
        baseCost: 32e12,
        basePower: 1024,
    },
    catherine: {
        name: "Ranger Catherine",
        image: ranger,
        quotes: [
            "Accidents happen when you're not prepared!",
            "Who has the knowledge and the technique for survival? Pokémon Rangers!"
        ],
        baseCost: 64e14,
        basePower: 4096,
    },
    makayla: {
        name: "Expert Makayla",
        image: expert,
        quotes: [
            "I must have battled thousands of times. I've lost count.",
            "If you can mesh your heart with those of your Pokémon, you should be able to achieve great things!"
        ],
        baseCost: 128e16,
        basePower: 16384,
    },
    _list: [
        "joey",
        "irene",
        "bernie",
        "edwin",
        "dusty",
        "brianna",
        "catherine",
        "makayla",
    ],
    calcCost: function(id, level) {
        return Decimal.pow(2.3, level).mul(trainers[id].baseCost);
    },
    power: function(id, state, assumeAtLeastOne) {
        let trainerMult = 1;
        let trainer = trainers[id];
        let n = state.trainer[id];
        if(assumeAtLeastOne && !n) {
            n = 1;
        }
        let thisTrainer = trainer.basePower * n * trainerMult;

        if(trainer.upgrades) {
            for(let key in trainer.upgrades) {
                if(state.upgrade[key]) {
                    thisTrainer *= trainer.upgrades[key];
                }
            }
        }

        return thisTrainer;
    }
};

export default trainers;