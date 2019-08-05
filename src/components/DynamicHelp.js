import {connect} from 'react-redux';
import Help from './Help';

function showPrestige(state) {
    return state.prestiges > 0 ||
        (state.generation === 7 && state.pokemonCount == 807);
}

function mapStateToProps(state) {
    return {
        showPrestige: showPrestige(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

const DynamicHelp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Help);

export default DynamicHelp;