import React, { Component } from 'react'
import {View, Text,StyleSheet } from 'react-native'
import { FontAwesome} from '@expo/vector-icons'
import Progress from '../components/Profile/Progress';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            finishlevel:[],
            userid:0
        }
    }


    render() {     
        return (
        <View style={{backgroundColor:'white', height:575}}>         
            <View style={styles.backStage}>
                <View style={styles.profileIcon}>
                    <FontAwesome name="user-circle" size={70} color="black"  />
                </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
                <View style={styles.username_area}>
                    <Text style={styles.label}>Username:</Text>
                    <Text style={styles.text}>{this.props.username}</Text>
                </View>
                <View style={styles.email_area}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.text}>{this.props.email}</Text>
                </View>
                </View>

            {(this.props.data.length===0) ? <View></View>: 
            <View style={{marginTop:30}}>
            <Text style={{marginLeft:30,fontWeight:'700'}}>Başarımlar</Text>
            <Progress data={this.props.data}/>   
            </View>    
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileIcon:{
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:135
    },
    backStage:{
        backgroundColor:'#E1E1E1',
        borderBottomLeftRadius:450,
        borderBottomRightRadius:450,
        height:200,
    
    },
    information_area:{
        margin:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        borderWidth:2,

    },
    label:{
        fontSize:18,
        fontWeight:'700',
        flexDirection:'row',
        width:90,
        marginLeft:5,
        textAlign:'center',
        justifyContent:'flex-start',
        textAlign:'start'

    },
    text:{
        fontSize:18,
        fontWeight:'700',
        flexDirection:'row',
        justifyContent:'flex-end',
        textAlign:'start',
        width:220,
        margin:5
    },
    username_area:{
        flexDirection:'row',
        width:300,
        height:40,
        borderRadius:10,
        borderWidth:2,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

    },
    email_area:{
        flexDirection:'row',
        width:300,
        height:40,
        borderRadius:10,
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

    }
   
})
