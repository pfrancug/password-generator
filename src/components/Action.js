import React from 'react'
import randomize from 'randomatic'

export default class Action extends React.Component {
    handleAction = () => {
        const generate = (amount) => {
            const passwords = []

            for (let i = 0; i < amount; i++) {

                // const password = randomize('Aa0', this.props.length, { exclude: '0oOiIlL1' })
                const password = randomize('AA') + randomize('00') + randomize('aa') + randomize('00')

                passwords.push(password)
            }
            console.log(passwords)

            return passwords
        }
        this.props.handleSetting('passwords', generate(this.props.amount))
    }
    render() {
        return (
            <button onClick={this.handleAction}>Generuj</button>
        )
    }
}