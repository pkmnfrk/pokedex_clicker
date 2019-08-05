import {connect} from 'react-redux';

import upgrades from '../upgrades';
import Upgrade from './Upgrade';

function mapStateToProps(state) {
    return {
        trainer: state.trainer,
        upgrade: state.upgrade,
        money: state.money,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        purchaseUpgrade: function(id) {
            dispatch({
                type: "purchase_upgrade",
                id: id
            });
        }
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    let upgrade = upgrades[ownProps.id];

    let ret = {
        ...dispatchProps,
        ...ownProps,

        purchaseUpgrade: () => { dispatchProps.purchaseUpgrade(ownProps.id) },
        purchased: stateProps.upgrade[ownProps.id],
        canBuy: stateProps.money.compare(upgrade.cost) >= 0
    };

    return ret;
}


const DynamicUpgrade = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
) (Upgrade);

export default DynamicUpgrade;