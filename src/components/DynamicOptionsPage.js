
import {connect} from 'react-redux';
import OptionsPage from './OptionsPage';

function mapStateToProps(state) {
    return {};
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
        }
    };
}

const DynamicOptionsPage = connect(
    mapStateToProps,
    mapDispatchToProps
) (OptionsPage);

export default DynamicOptionsPage;