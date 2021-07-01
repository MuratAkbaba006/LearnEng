import React, { Component } from 'react'
import {View,Dimensions } from 'react-native'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { API_URL } from '../../config/config';
import {inject} from 'mobx-react'
import {BarIndicator} from 'react-native-indicators'
import ProfileScreen from '../../screens/ProfileScreen'


const Loading=()=>(
    <View >
      <BarIndicator animationDuration={2000} color={'black'}/>
    </View>
  )

@inject("AuthenticateStore")

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            finishlevel:[],
            userid:0,
            control:false
        }
    }

    componentDidMount(){

        const token=this.props.AuthenticateStore.token;
        const userid=parseInt(jwt_decode(token).nameid);
        axios.get(`${API_URL}/Users/${userid}`).then(res=>{
        this.setState({username:res.data.userName})
        this.setState({email:res.data.email})
        this.setState({userid:userid});
        });
        const progres=[];
        axios.get(`${API_URL}/Progress`).then(res=>res.data.map((p)=>{
            if(p.userId===userid){
                if(!progres.includes(p.level))
                {   
                    progres.push(p.level);
                }
            }
        }
        ));

        setTimeout(() => {
            this.setState({finishlevel:progres});
            
        }, 500);

        setTimeout(() => {
            this.setState({control:true});
            
        }, 1000);
    }


    render() {
        if(this.state.control === false){
            return <Loading/>
        }
        return (
        <ProfileScreen data={this.state.finishlevel} username={this.state.username} email={this.state.email}/>                  
        )
    }
   
}

