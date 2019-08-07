import React from 'react';

import './OptionsPage.css';
import Button from './Button';

import pkg from '../../package.json';

export default class OptionsPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            saveFile: ""
        };

        this.onSaveFileChange = this.onSaveFileChange.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleImport = this.handleImport.bind(this);
    }

    onSaveFileChange(event) {
        this.setState({
            saveFile: event.target.value
        });
    }

    handleExport() {
        this.setState({
            saveFile: btoa(window.localStorage.pokeClicker)
        });
    }

    handleImport() {
        try {
            this.props.onImport(atob(this.state.saveFile));
        } catch(e) {
            console.error(e);
        }
    }
    
    render() {
        return (
            <div id="OptionsPage">
                <h1>Options</h1>
                <p>
                    <Button onClick={() => this.props.togglePinPokeball(!this.props.pinPokeball)}>
                        {this.props.pinPokeball ? "Pin Poké Ball to top" : "Keep Poké Ball on screen"}
                    </Button>
                </p>
                <p>
                    <Button onClick={this.handleExport}>Export Save</Button>
                    <Button onClick={this.handleImport}>Import Save</Button>
                </p>
                <p>
                    <textarea cols="80" rows="7" value={this.state.saveFile} onChange={this.onSaveFileChange}></textarea>
                </p>
                <p>
                    <Button bgcolor="red" color="white" onClick={this.props.onResetClick}>Reset</Button>
                </p>
                {process.env.NODE_ENV !== "production" ?
                    <p>
                        <Button bgcolor="blue" color="white" onClick={this.props.onCheatMoney}>Cheat Money</Button>
                        <Button bgcolor="blue" color="white" onClick={this.props.onCheatDex}>Cheat 'Dex</Button>
                        <Button bgcolor="blue" color="white" onClick={this.props.onCheatGen}>Cheat Generation</Button>
                    </p> 
                : null}
                <p>Version: {pkg.version}</p>
            </div>
        )
    }
}