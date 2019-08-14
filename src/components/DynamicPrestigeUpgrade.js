
import {connect} from 'react-redux';
import PrestigeUpgrade from './PrestigeUpgrade';
import prestigeUpgrades from '../prestigeUpgrades';

function mapStateToProps(state) {
    return {
        prestigeUpgrade: state.prestigeUpgrade,
        prestigePoints: state.prestigePoints,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        purchaseUpgrade: function(id) {
            dispatch({
                type: "purchase_prestige",
                id: id
            });
        }
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    let id = ownProps.id;
    let upgrade = prestigeUpgrades[id];
    let level = stateProps.prestigeUpgrade[id] || 0;

    return {
        ...ownProps,
        ...dispatchProps,
        purchaseUpgrade: () => dispatchProps.purchaseUpgrade(id),
        level: level,
        cost: prestigeUpgrades.cost(id, level),
        eligible: prestigeUpgrades.eligible(id, stateProps),
        purchasable: prestigeUpgrades.purchasable(id, stateProps)
    };
}

const DynamicPrestigeUpgrade = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
) (PrestigeUpgrade);

export default DynamicPrestigeUpgrade;