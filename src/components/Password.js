import React from 'react'

export default class Password extends React.Component {
    handleCopy = (e) => {
        const pass = document.getElementById(this.props.password)
        pass.select()
        document.execCommand('copy')
    }
    render() {
        return (
            <div className="list-item">
                <input id={this.props.password} value={this.props.password} readOnly></input>
                <button className="button button--text" onClick={this.handleCopy}>Kopiuj</button>
            </div>
        )
    }
}
