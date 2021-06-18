import React, { Component } from 'react'
import {View} from 'react-native'
import {inject} from 'mobx-react'
@inject("AuthenticateStore")

export class AuthRedirect extends Component {
    componentDidMount(){
       this.props.AuthenticateStore.getToken();
    }
    render() {
        return (
            <View>

            </View>
        )
    }
}

export default AuthRedirect