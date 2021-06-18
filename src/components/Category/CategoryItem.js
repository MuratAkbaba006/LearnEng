import React,{Component} from 'react'
import {SafeAreaView,View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import NavigationService from '../../config/NavigationService'

const CategoryItem = ({category_name,data}) => {
    
    return (
        <TouchableOpacity onPress={()=>{
            NavigationService.navigate('CategoryDetail',{
                data:data,
                category_name
            })
        }}>
       <View style={style.category}>
           <Text style={style.category_text}>
                {category_name}

           </Text>
        </View>
        </TouchableOpacity>
    )
}

export default CategoryItem

const style=StyleSheet.create({
    category:{
        padding:30, 
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center', 
        margin:10,
        backgroundColor:'#f1c40f',
        width:320,
        height:150,
        borderRadius:15
     },
     category_text:{
         justifyContent:'center',
         textAlign:'center',
         alignItems:'center',
         color:'blue',
         fontSize:17,
         fontWeight:'700',
         
         
 
     }
})
