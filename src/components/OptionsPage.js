import React from 'react';

import './OptionsPage.css';
import Button from './Button';

export default class OptionsPage extends React.PureComponent {
    render() {
        return (
            <div id="OptionsPage">
                <h1>Options</h1>
                <p>
                <Button onClick={this.props.onExport}>Export Save</Button>
                <Button onClick={this.props.onImport}>Import Save</Button>
                </p>
                <p>
                    <Button bgcolor="red" color="white" onClick={this.props.onResetClick}>Reset</Button>
                </p>
                <p>
                    <Button bgcolor="blue" color="white" onClick={this.props.onCheatMoney}>Cheat Money</Button>
                    <Button bgcolor="blue" color="white" onClick={this.props.onCheatDex}>Cheat 'Dex</Button>
                </p>
            </div>
        )
    }
}