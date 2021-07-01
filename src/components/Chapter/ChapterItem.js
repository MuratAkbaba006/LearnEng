import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import NavigationService from '../../config/NavigationService'
import {BarIndicator} from 'react-native-indicators'

const Loading=()=>(
    <View >
      <BarIndicator animationDuration={2000} color={'black'}/>
    </View>
  )

const ChapterItem = ({chapter,category_name,data,user_id,progress}) => {    
    
   if(chapter.length===0){
       return <Loading/>
   }
    return (
        <TouchableOpacity  onPress={()=>{
            NavigationService.navigate('ChapterDetail',{
                chapter_name:chapter.chapter_name,
                data:data,
                category_name,
                level_id:chapter.chapter_level
                
            })
        }}>
            <View style={[style.chapter,
                {backgroundColor:progress.includes(chapter.chapter_level.toString())?'#62F8C2':'#83F9F4'}]}>             
            <Image source={{uri:chapter.chapter_image,width:80,height:80}} 
                style={{flexDirection:'row',borderRadius:30,opacity:.9}}></Image>            
                <Text style={style.chapter_name} >
                    {chapter.chapter_name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChapterItem

const style = StyleSheet.create({
    chapter:{
        padding:30, 
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center', 
        margin:10,
        width:300,
        height:100,
        borderRadius:15,
        flexDirection:'row',
        flex:1,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:.3,
        shadowRadius:20,
    },
    chapter_name:{
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center',
        color:'#4A4A4A',
        fontSize:17,
        fontWeight:'700',
        flexDirection:'row',
        width:80,
        marginLeft:80
    }
})