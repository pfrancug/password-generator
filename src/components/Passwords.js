import React from 'react'
import Password from './Password'

export default class Passwords extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                {this.props.passwords.map((password) => {
                    return (
                        <Password
                            key={password}
                            password={password}
                        />
                    )
                })}
            </div>
        )
    }
}
