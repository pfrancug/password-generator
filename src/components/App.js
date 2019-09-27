import React from 'react'
import Header from './Header'
import Settings from './Settigns'
import Action from './Action'
import Passwords from './Passwords'
import Footer from './Footer'

export default class App extends React.Component {
    state = {
        difficult: true,
        length: 16,
        special: true,
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
                    special={this.state.special}
                    handleSetting={this.handleSetting}
                />
                <div className="container">
                    <div className="widget">
                        <Action
                            difficult={this.state.difficult}
                            length={this.state.length}
                            special={this.state.special}
                            amount={this.state.passwordsAmount}
                            handleSetting={this.handleSetting}
                        />
                        <Passwords
                            passwords={this.state.passwords}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
