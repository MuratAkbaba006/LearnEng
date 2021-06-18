import { inject, observer } from 'mobx-react'
import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,Text} from 'react-native'
import {API_URL} from './config'

const apiConfig =inject("AuthenticateStore")(observer((props)=>{
    
    const getQuestion = async () =>{
    const token=this.props.AuthenticateStore.token;
    axios.get(`${API_URL}/Questions`,{
        headers: {"Authorization" : `Bearer ${token}`} 
    }).then(res=>{
        const questions=[];
        questions.push(res.data);
     
        console.log(questions);
      
    }).catch((err)=>{
        console.log(err);
    })
    return questions;
}}))

export default apiConfig