import {connect} from 'react-redux';
import Pokemon from './Pokemon';

function mapStateToProps(state) {
    return {
        generation: state.generation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTradePokemon: function(id) {
            dispatch({
                type: "trade_pokemon",
                id: id
            });
        }
    };
}

const DynamicPokemon = connect(
    mapStateToProps,
    mapDispatchToProps
) (Pokemon);

export default DynamicPokemon;