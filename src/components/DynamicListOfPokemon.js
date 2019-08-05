import {connect} from 'react-redux';
import ListOfPokemon from './ListOfPokemon';
import dex from '../pokedex';

function mapStateToProps(state) {
    return {
        pokemon: dex.gen[state.generation],
        canTradeAll: state.canTradeAll,
        canCompleteDex: state.canCompleteDex,
        caught: state.owned,
        traded: state.traded,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTradeAll: () => {
            dispatch({
                type: "trade_all"
            });
        },
        onCaughtAll: () => {
            dispatch({
                type: "complete_pokedex"
            })
        }
    };
}


const DynamicListOfPokemon = connect(
    mapStateToProps,
    mapDispatchToProps
) (ListOfPokemon);

export default DynamicListOfPokemon;