import React from 'react'

export default class Settings extends React.Component {

    handleDifficultPassword = (e) => this.props.handleSetting(e.target.name, !this.props.difficult)
    handleLength = (e) => this.props.handleSetting(e.target.name, e.target.value)
    render() {
        return (
            <div>
                <div>
                    <button name="difficult" onClick={this.handleDifficultPassword}>Trudne hasło</button>
                </div>
                {this.props.difficult && (
                    <div>
                        <p>Ilość znaków: </p>
                        <input name="length" type="number" min="8" value={this.props.length} onChange={this.handleLength}></input>
                    </div>
                )}
            </div>
        )
    }
}