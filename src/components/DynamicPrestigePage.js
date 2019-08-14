
import {connect} from 'react-redux';
import PrestigePage from './PrestigePage';

function mapStateToProps(state) {
    return {
        prestiges: state.prestiges,
        prestigePoints: state.prestigePoints
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

const DynamicPrestigePage = connect(
    mapStateToProps,
    mapDispatchToProps
) (PrestigePage);

export default DynamicPrestigePage;