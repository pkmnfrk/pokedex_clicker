import {connect} from 'react-redux';
import App from './App';

function mapStateToProps(state) {
    return {
        tab: state.tab,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTick: () => {
            dispatch({
                type: "tick"
            });
        },
        onSave: () => {
            dispatch({
                type: "save"
            })
        }
    };
}


const DynamicApp = connect(
    mapStateToProps,
    mapDispatchToProps
) (App);

export default DynamicApp;