import React, { Component } from 'react'
import {View,SafeAreaView,Text,TouchableOpacity,StyleSheet,TextInput,Image} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import {API_URL} from '../config/config'
import {inject} from 'mobx-react'
@inject('AuthenticateStore')

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            hidePassword:false
        }
    }
    
    _handleSubmit= (values)=>{
       axios.post(`${API_URL}/auth/login/`,{
           username:values.username,
           password:values.password
       }).then((res)=>{
           if(res.status===200){
               this.props.AuthenticateStore.saveToken(res.data.token);
               alert('Giriş işlemi başarılı');
           }
       }).catch((err)=>{
            alert('Kullanıcı adı/şifre hatalı')
       })
    }
    
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={{backgroundColor:'white',flex:1,paddingVertical:50,alignItems:'center'}}>  
                    <View style={{alignItems:'center'}} >
                        <Text style={style.hero}>LearnEng</Text>
                            <View style={{marginTop:8}}>
                                <Image style={{width:120,height:120}} source={require("../../assets/LearnEng.jpg")}/>
                            </View>
                        <Text style={style.hero_description}>Sign in to continue</Text>
                    </View>
                    <Formik 
                        initialValues={{
                            username:'',
                            password:''
                        }} 
                        onSubmit={this._handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                username:Yup.string().required('Username is required'),
                                password:Yup.string().required('Password is required')
                            })
                        }>

                        {
                            ({values,handleSubmit,isValid,isSubmitting,errors,handleChange})=>(
                    <View style={style.form}>
                        <TextInput 
                            style={style.input} 
                            placeholder={"Username"}
                            placeholderTextColor={'#302D4C'}
                            value={values.username}
                            onChangeText={handleChange('username')}     
                        />

                        {(errors.username) && <Text style={style.error}>{errors.username}</Text>}                 
                        <View>
                        <TextInput 
                            style={style.input} 
                            placeholder={"Password"} 
                            placeholderTextColor={'#302D4C'}
                            value={values.password}
                            secureTextEntry={this.state.hidePassword}
                            onChangeText={handleChange('password')}    
                        />
                        <TouchableOpacity  onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} style={{position:'absolute',right:10,top:20}}>
                                    <Entypo name={this.state.hidePassword?'eye':'eye-with-line'} size={24} color="black" />
                                </TouchableOpacity>
                        {(errors.password && <Text style={style.error}>{errors.password}</Text>)}
                        </View>       
                        <TouchableOpacity style={style.forgot}>
                            <Text>Forgot Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={style.button}
                            disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}    
                        >
                             <Text style={style.button_text}>Sign in My Account</Text>
                        </TouchableOpacity>
                        <View style={style.bottom}>
                            <Text style={{fontSize:17,color:'#302D4C'}}>
                                Don't have an account? </Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                                <Text style={{fontSize:18,fontWeight:'bold',color:'#302D4C'}}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                            )}
                    </Formik>        
                </View>
            </SafeAreaView>
        )
    }
}


const style=StyleSheet.create({
    hero:{color:'#1C1939',fontWeight:'600',fontSize:40},
    hero_description:{color:'rgba(26,25,57,0.8)',fontSize:17,marginTop:8,fontWeight:'500'},
    form:{flex:1,marginTop:10},
    input:{backgroundColor:'#F7F7F7',
            padding:13,
            width:300,
            height:50,
            borderRadius:10,
            paddingHorizontal:25,
            marginBottom:10
            },
    forgot:{flexDirection:'row',justifyContent:'flex-end',marginTop:10,color:'#706E83'},
    button:{backgroundColor:'#010101',
            padding:15,
            marginTop:35,
            borderRadius:10,
            justifyContent:'center',
            alignItems:'center'},
    button_text:{color:'white',fontWeight:'600',fontSize:18,textAlign:'center'},
    bottom:{flexDirection:'row',
alignItems:'center',justifyContent:'center',marginTop:20}, 
error:{color:'red'},

})


