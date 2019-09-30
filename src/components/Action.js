import React from 'react'
import randomize from 'randomatic'
import pokemon from 'pokemon'

export default class Action extends React.Component {
    handleAction = (passwords) => this.props.handleSetting('passwords', passwords)
    handleRandomize = () => {
        if (!this.props.difficult) {
            const word = pokemon.random().split('').filter((char) => char.match(/[A-Z]/i)).join('')
            const number = randomize('0', (word.length >= 10 ? 1 : 10 - word.length))
            return word + number
        } else if (this.props.special) {
            return randomize('*', this.props.length, { exclude: '0oOiIlL1\'`~' })
        } else {
            return randomize('Aa0', this.props.length, { exclude: '0oOiIlL1' })
        }
    }
    handleGeneratePasswords = () => {
        const passwords = []
        for (let i = 0; i < this.props.amount; i++) {
            passwords.push(this.handleRandomize())
        }
        this.handleAction(passwords)
    }
    render() {
        return (
            <button className="action" onClick={this.handleGeneratePasswords}>Generuj</button>
        )
    }
}
