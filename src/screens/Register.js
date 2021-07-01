import React, { Component } from 'react'
import {View,SafeAreaView,Text,TouchableOpacity,StyleSheet,TextInput,Image} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import {Formik} from 'formik'
import * as Yup from 'yup'
import {API_URL} from '../config/config'
import axios from 'axios'
import {inject} from 'mobx-react'
@inject("AuthenticateStore")

export default class Register extends Component {
    constructor(){
        super();
        this.state={
            checkbox:false,
            hidePassword:false
        }
    }

    _handleSubmit = (values)=>{
        axios.post(`${API_URL}/Auth/register/`,{
            username:values.name,
            email:values.email,
            password:values.password
        }).then((res)=>{
            if(res.status===200){
                alert('Kayıt işlemi başarılı');
            }
         this.props.AuthenticateStore.saveToken(res.data.token);
        }).catch((err)=>{
             alert('Kayıt işlemi başarısız')
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={{backgroundColor:'white',flex:1,paddingVertical:50,alignItems:'center'}}>  
                    <View style={{alignItems:'center'}} >
                        <Text style={style.hero}>LearnEng Ailesine Katıl</Text>
                            <View style={{marginTop:10}}>
                                <Image style={{width:120,height:120}} source={require("../../assets/LearnEng.jpg")}/>
                            </View>
                    </View>
                    <Formik 
                        initialValues={{
                            name:'',
                            email:'',
                            password:''
                        }} 
                        onSubmit={this._handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                email:Yup.string().email().required('Email address is required'),
                                password:Yup.string().required('Password is required')
                            })
                        }>

                        {
                            ({values,handleSubmit,isValid,isSubmitting,errors,handleChange})=>(
                        
                    <View style={style.form}>
                        <TextInput 
                            placeholder={"Name"} 
                            style={style.input} 
                            placeholderTextColor={'#302D4C'}
                            value={values.name}
                            onChangeText={handleChange('name')}/>
                        {(errors.name) && <Text style={style.error}>{errors.name}</Text>}                 

                        <TextInput 
                            style={style.input} 
                            placeholder={"Email"} 
                            keyboardType={'email-address'}
                            placeholderTextColor={'#302D4C'}
                            value={values.email} 
                            onChangeText={handleChange('email')}/>
                        {(errors.email) && <Text style={style.error}>{errors.email}</Text>}                 
                        <View>
                            <TextInput 
                                style={style.input} 
                                placeholder={"Password"} 
                                placeholderTextColor={'#302D4C'} 
                                secureTextEntry={this.state.hidePassword} 
                                value={values.password}
                                onChangeText={handleChange('password')}/>
                            {(errors.password && <Text style={style.error}>{errors.password}</Text>)}
                            <TouchableOpacity  onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} 
                                                style={{position:'absolute',right:20,top:15}}>
                                <Entypo name={this.state.hidePassword?'eye':'eye-with-line'} size={24} color="black" />
                            </TouchableOpacity>            
                        </View>
                        <View style={style.checkbox_area}>
                            <TouchableOpacity onPress={()=>this.setState({checkbox:!this.state.checkbox})} style={style.checkbox}>
                                {this.state.checkbox && <Text style={{fontSize:30}}>✓</Text>}
                            </TouchableOpacity>
                            <View style={{flex:1,flexWrap:'nowrap',paddingLeft:5,justifyContent:'center',alignItems:'center'}}>
                                <Text style={style.checkbox_text}>By creating your account you have to agree with our Terms and Conditions</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                            disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}
                            style={style.button}>
                             <Text style={style.button_text}>Sign up My Account</Text>
                        </TouchableOpacity>
                        <View style={style.bottom}>
                            <Text style={{fontSize:17,color:'#302D4C'}}>Already have an account? </Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                <Text style={{fontSize:18,fontWeight:'bold',color:'#010101'}}>
                                Sign In</Text></TouchableOpacity>
                        </View>
                    </View>
                            )}
                    </Formik>
                </View>
             </SafeAreaView>)}}


const style=StyleSheet.create({
    hero:{color:'#1C1939',fontWeight:'600',fontSize:30,textAlign:'center'},
    form:{flex:1,marginTop:8,justifyContent:'center',alignItems:'center'},
    input:{backgroundColor:'#F7F7F7',
            padding:15,
            width:300,
            height:50,
            borderRadius:10,
            paddingHorizontal:25,
            marginBottom:10
            },
    forgot:{flexDirection:'row',justifyContent:'flex-end',marginTop:10,color:'#706E83'},
    button:{backgroundColor:'#010101',
            padding:15,
            marginTop:15,
            borderRadius:10,
            justifyContent:'center',
            alignItems:'center'},
    button_text:{color:'white',fontWeight:'600',fontSize:18,textAlign:'center'},
    bottom:{flexDirection:'row',
alignItems:'center',justifyContent:'center',marginTop:20}, 
error:{color:'red'},
    checkbox:{width:34,
              height:34, 
              backgroundColor:'rgba(113,101,227,0.2)',
              borderColor:'#7165E3',
              borderRadius:7,
              borderWidth:1,
              justifyContent:'center',
              alignItems:'center'}, 
    checkbox_area:{flexDirection:'row',alignItems:'center',marginLeft:30},
    checkbox_text:{color:'#656379'},
    error:{color:'red'}      
})



