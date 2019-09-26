import React from 'react'
import Header from './Header'
import Settings from './Settigns'
import Action from './Action'
import Password from './Password'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        // this.handleDifficultPassword = this.handleDifficultPassword.bind(this)
    }
    state = {
        difficult: true,
        length: 16,
        passwordsAmount: 5,
        passwords: []
    }
    handleSetting = (setting, value) => {
        this.setState({ [setting]: value })
    }
    render() {
        return (
            <div>
                <Header />
                <Settings
                    difficult={this.state.difficult}
                    length={this.state.length}
                    handleSetting={this.handleSetting}
                />
                <Action
                    difficult={this.state.difficult}
                    length={this.state.length}
                    amount={this.state.passwordsAmount}
                    handleSetting={this.handleSetting}
                />
                <Password
                    passwords={this.state.passwords}
                />
            </div>
        )
    }
}