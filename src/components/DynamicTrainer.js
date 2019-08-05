import {connect} from 'react-redux';

import trainers from '../trainers.js';
import Trainer from './Trainer.js';

function mapStateToProps(state) {
    return {
        trainer: state.trainer,
        upgrade: state.upgrade,
        money: state.money,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hireTrainer: function(id) {
            dispatch({
                type: "level_trainer",
                id: id
            });
        },
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    let level = stateProps.trainer[ownProps.id];
    
    let ret = {
        ...dispatchProps,
        ...ownProps,

        cost: trainers.calcCost(ownProps.id, level),
        hireTrainer: () => { dispatchProps.hireTrainer(ownProps.id) },
        level: level,
        power: trainers.power(ownProps.id, stateProps, true)
    };

    ret.canLevel = stateProps.money.compare(ret.cost) >= 0;

    return ret;
}


const DynamicTrainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
) (Trainer);

export default DynamicTrainer;