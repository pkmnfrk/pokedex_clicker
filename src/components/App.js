import React from 'react';

import './App.css';
import DynamicClicker from './DynamicClicker';
import DynamicListOfPokemon from './DynamicListOfPokemon';
import DynamicListOfTrainers from './DynamicListOfTrainers';
import DynamicOptionsPage from './DynamicOptionsPage';
import DynamicHelp from './DynamicHelp';
import Footer from './Footer';
import DynamicPrestigePage from './DynamicPrestigePage';

export default class App extends React.PureComponent {
    componentDidMount() {
        if(window.timer) {
            clearInterval(window.timer);
            window.timer = null;
        }
        if(window.saveTimer) {
            clearInterval(window.saveTimer);
            window.saveTimer = null;
        }
        window.timer = setInterval(this.onTick.bind(this), 1000);
        window.saveTimer = setInterval(this.onSave.bind(this), 3000);
    }

    componentWillUnmount() {
        if(window.timer) {
            clearInterval(window.timer);
            window.timer = null;
        }
        if(window.saveTimer) {
            clearInterval(window.saveTimer);
            window.saveTimer = null;
        }
    }

    onTick() {
        this.props.onTick();
    }

    onSave() {
        this.props.onSave();
    }

    render() {
        return (
            <div id="App" className={"tab_" + this.props.tab} onTouchStart={() => false}>
                <DynamicClicker />
                <DynamicListOfPokemon />
                <DynamicListOfTrainers />
                <DynamicOptionsPage />
                <DynamicPrestigePage />
                <DynamicHelp />
                <Footer />
            </div>
        );
    }
}

