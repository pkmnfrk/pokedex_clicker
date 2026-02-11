import {connect} from 'react-redux';
import Pokemon from './Pokemon';

function mapStateToProps(state) {
    return {
        multiplier: Math.pow(2, state.prestigeUpgrade.boostMoneyRate || 0) * Math.pow(3, state.generation - 1),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTradePokemon: function(id) {
            dispatch({
                type: "trade_pokemon",
                id: id,
            });
        }
    };
}

const DynamicPokemon = connect(
    mapStateToProps,
    mapDispatchToProps
) (Pokemon);

export default DynamicPokemon;