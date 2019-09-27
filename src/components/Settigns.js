import React from 'react'

export default class Settings extends React.Component {

    handleCheck = (e) => this.props.handleSetting(e.target.name, e.target.checked)
    handleValue = (e) => {
        const value = (e.target.value >= 8 && e.target.value % 1 === 0) ? e.target.value : 8
        this.props.handleSetting(e.target.name, value)
    }
    render() {
        return (
            <div className="settings">
                <div className="settings__container">
                    <div className="settings__options">
                        <label className="checkbox">
                            <input name="difficult" type="checkbox" defaultChecked={this.props.difficult} onClick={this.handleCheck}></input>
                            Trudne hasła
                        </label>
                    </div>
                    {this.props.difficult && (
                        <div className="settings__options">
                            <label className="checkbox">
                                <input name="special" type="checkbox" checked={this.props.special} onChange={this.handleCheck}></input>
                                Znaki specjalne
                            </label>
                            <label className="checkbox">Ilość znaków
                                <input name="length" className="input" type="number" min="8" value={this.props.length} onChange={this.handleValue}></input>
                            </label>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
