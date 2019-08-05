import {connect} from 'react-redux';
import Clicker from './Clicker';

function mapStateToProps(state) {
    let ballKind = "";

    for(let b of ["master_ball", "ultra_ball", "great_ball"]) {
        if(state.upgrade[b]) {
            ballKind = b;
            break;
        }
    }

    return {
        clicksPerTick: state.clicksPerTick,
        manualClicksPerTick: state.manualClicksPerTick,
        money: state.money,
        moneyPerTick: state.moneyPerTick,
        tab: state.tab,
        generation: state.generation,
        ballKind: ballKind,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => {
            dispatch({
                type: "button_click"
            });
        },

        onTabChange: (id) => {
            dispatch({
                type: "change_tab",
                tab: id,
            });
        },
    };
}


const DynamicClicker = connect(
    mapStateToProps,
    mapDispatchToProps
) (Clicker);

export default DynamicClicker;