import React from 'react';

import './Trainer.css';

import trainers from '../trainers.js';
import Button from './Button';
import { formatNumber, formatMoney } from '../util';

export default class Trainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            quote: Math.floor(Math.random() * trainers[props.id].quotes.length)
        };
    }
    render() {
        let decimals = this.props.trainerMultTemp > 1 ? 2 : 0;
        return (
            <li className="trainer">
                <img className="image" src={trainers[this.props.id].image} alt="" />
                <div className="name">{trainers[this.props.id].name}{this.props.level ? " Lv " + formatNumber(this.props.level) : ""}</div>
                <div className="effect">Clicks {formatNumber(this.props.power, decimals)} times per second</div>
                <div>
                    <Button onClick={this.props.hireTrainer} disabled={!this.props.canLevel}>{this.props.level ? "Lv +1" : "Hire"} ({formatMoney(this.props.cost)})</Button>
                    {(this.props.level && this.props.maxCost[1] > this.props.level + 1) ? <Button onClick={this.props.maxTrainer} disabled={!this.props.canLevel}>Lv +{this.props.maxCost[1] - this.props.level} ({formatMoney(this.props.maxCost[0])})</Button> : null}
                </div>
                <div className="quote">{trainers[this.props.id].quotes[this.state.quote]}</div>
            </li>
        )
    }
}