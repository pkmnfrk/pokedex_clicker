
import {connect} from 'react-redux';
import OptionsPage from './OptionsPage';

function mapStateToProps(state) {
    return {
        pinPokeball: state.options.pinPokeball,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSaveClick: () => {
            dispatch({
                type: "save"
            })
        },
        onResetClick: () => {
            // eslint-disable-next-line no-restricted-globals
            if(confirm("If you reset, you will lose ALL of your progress. This cannot be undone!")) {
                dispatch({
                    type: "reset"
                })
            }
        },
        onCheatMoney: () => {
            dispatch({
                type: "cheat_money"
            })
        },
        onCheatDex: () => {
            dispatch({
                type: "cheat_dex"
            })
        },
        onCheatPP: () => {
            dispatch({
                type: "cheat_pp"
            })
        },
        onCheatGen: () => {
            dispatch({
                type: "complete_pokedex",
                isCheat: true
            })
        },

        onImport: (save) => {
            dispatch({
                type: "load",
                data: save
            });
        },
        
        togglePinPokeball: (to) => {
            dispatch({
                type: "set_option",
                option: "pinPokeball",
                value: to,
            });
        }

    };
}

const DynamicOptionsPage = connect(
    mapStateToProps,
    mapDispatchToProps
) (OptionsPage);

export default DynamicOptionsPage;