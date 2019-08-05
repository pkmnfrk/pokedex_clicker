import React from 'react';

import * as ADNotations from "@antimatter-dimensions/notations";

import yen from './images/pokebuck.gif';

import './util.css';

const mixedScientific = new ADNotations.MixedScientificNotation();
//const pureScientific = new ADNotations.ScientificNotation();

export function formatPercent(v) {
    return Math.floor(v * 1000000) / 10000;
}

export function formatNumber(n, decimals = 0) {
    let ret = mixedScientific.format(n, 2, decimals);
    //console.log(n, " -> ", ret);
    //return pureScientific.format(n, 2, decimals);
    return ret;
}

export function formatMoney(n, decimals = 0) {
    return (<><img src={yen} alt="$" className="pokebuck" />{formatNumber(n, decimals)}</>);
}

export function multiplierForPrestiges(state) {
    return Math.pow(1.2, state.prestiges);
}