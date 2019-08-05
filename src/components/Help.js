import React from 'react';

import './Help.css';
import Button from './Button';
import Pokemon from './Pokemon';

export default class Help extends React.PureComponent {
    render() {
        return (
            <div id="Help">
                <h1>Help</h1>
                <h2>Gameplay</h2>
                <p>This is a game about catching Pokémon! You immediate goal is to catch a bunch using the big Pokéball visible above this text. Every time you click on it, you catch a Pokémon. It's just that easy! As a bonus, for every Pokémon you catch, you start to earn some money. The amount varies by species, but generally the rarer they are, the more money they make you.</p>
                <p>An uncaught Pokémon looks like this:</p>
                <Pokemon id="1" caught={0} onTradePokemon={() => false}/>
                <p>A caught Pokémon looks like this:</p>
                <Pokemon id="1" caught="1" onTradePokemon={() => false} />
                <p>If you are lucky enough to catch 10 of a species, you can trade them in order to double the amount of money that species makes! Then they look like this:</p>
                <Pokemon id="1" caught={10} onTradePokemon={() => false} />
                <p>You can even do this multiple times, and the multipliers stack. However, the amount you need to trade will also increase. For convenience's sake, the <Button disabled="true">Trade all Pokémon</Button> button will automatically trade any eligible species for you.</p>
                <p>Finally, earning money happens even when you don't have the game open.</p>
                <p>Note that not all Pokémon are created equally. Some are rarer than others. You can see detailed statistics if you mouse over a Pokémon in your Pokédex. You will almost certainly need to catch many more Pokémon than there are species if you want to catch them all.</p>

                <h2>Trainers</h2>
                <p>Luckily, you aren't in this alone. You can hire other trainers to help you catch Pokémon. Each trainer you hire will contribute a different number of clicks each and every second. Even better, you can level them up to multiply the number of clicks they contribute.</p>
                <p>A big caveat is that trainers are incredibly lazy, and will not work if you are not around to bother them. So, while you have the game closed, they will not catch any new Pokémon for you.</p>

                <h2>Upgrades</h2>
                <p>A wide variety of upgrades will appear for you to buy using your hard earned money. Each upgrade has a specific effect that is beneficial to your progress. Some will make trainers more effective, others will make certain types of Pokémon easier to catch. There is never a reason not to get an upgrade!</p>
                <p>Some upgrades have conditions beyond just price to appear. Some require that you have caught a certain number of Pokémon, while others need you to level up trainers. Play around, see what happens!</p>

                <h2>Catching them all</h2>
                <p>Eventually, sooner than you think, you will finally have caught them all. Your Pokédex will be filled in, and a new <Button disabled="true">Complete Pokédex</Button> button will appear. When you press it, you will <strong>lose all your Pokémon, trainers, upgrades and money</strong>! However, you get some benefits in return.</p>
                <p>Each time you complete the Pokédex, you unlock a 3x multiplier on all Pokémon income. Additionally, you unlock the next generation of Pokémon to catch. Go from 151 Pokémon in generation 1 to 251 in generation 2, all the way up to 807 in generation 7.</p>
                <p>What happens when you complete generation 7? Well, that's a surprise... come back here when you're ready and find out!</p>

            {this.props.showPrestige ? <>
                <h2>Prestiging</h2>
                <p>Once you have truly caught them all, it's time to prestige. Completing the Pokédex on generation 7 will have the usual effect of clearing your progress. However, it will also return you back to generation 1, including resetting your Pokémon earning multipliers. However, as a bonus, you get a <strong>permanent</strong> 1.2x bonus to catch rate. That means that every time you click the Pokéball 5 times, you automatically catch an extra Pokémon. Even better, this applies to trainers as well.</p>
                <p>Also, it should go without saying that prestiging again will give you another 1.2x bonus, stacking on top, giving you a final 1.44x bonus, then 1.728x, etc.</p>
                <p>NOTE: This mechanic is WIP, and likely to be expanded on.</p>
                </> : null}
            </div>
        )
    }
}