import {connect} from 'react-redux';
import ListOfTrainers from './ListOfTrainers';

function mapStateToProps(state) {
    return {
        trainers: state.visibleTrainers,
        upgrades: state.purchaseableUpgrades,
        purchasedUpgrades: state.purchasedUpgrades,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


const DynamicListOfTrainers = connect(
    mapStateToProps,
    mapDispatchToProps
) (ListOfTrainers);

export default DynamicListOfTrainers;