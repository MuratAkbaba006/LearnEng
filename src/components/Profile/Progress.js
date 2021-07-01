import React from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const Progress = ({data}) => {
    return (
        <>   
      <View style={style.container}>
          <FlatList
            data={data.sort()}
            horizontal
            keyExtractor={(item)=>item}
            renderItem={({item})=>{
                return (
                <View style={{justifyContent:'center',alignItems:'center',margin:10}} >
                    <FontAwesome5  name="medal" size={50} color="black" />
                    <Text style={{fontWeight:'700'}}>
                        {item}
                    </Text>
                </View>
                )
            }}
          />
      </View>
      </>
    )
}



const style=StyleSheet.create({
    container:{
        marginLeft:30,
        borderWidth:1,
        borderRadius:10,
        width:300,
        height:100,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,


        

    }
})

export default Progress
