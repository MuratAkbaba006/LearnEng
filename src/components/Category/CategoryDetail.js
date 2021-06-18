import React, { Component } from 'react'
import {SafeAreaView,View,Text, FlatList} from 'react-native'
import ChapterItem from '../Chapter/ChapterItem';
import jwt_decode from "jwt-decode";
import {inject} from 'mobx-react'
import axios from 'axios'
import { API_URL } from '../../config/config'
@inject('AuthenticateStore')

export default class CategoryDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[],
            Chapter:[],
            categoryName:[],
            progress:[],
            
            userid:0
        }
    }

    componentDidMount(){
        const token=this.props.AuthenticateStore.token;
        const userid=parseInt(jwt_decode(token).nameid);
        const data=this.props.navigation.getParam('data');
        const categoryName =this.props.navigation.getParam('category_name');
        const Chapter=[];
        const levelid=[];
        data.map((a)=>{
            if(!Chapter.includes(a.chapter) && a.level===categoryName.name){
                Chapter.push({chapter_name:a.chapter,chapter_image:a.chapter_image,chapter_level:a.levelId});
            }
        })
       this.setState({data});
       this.setState({categoryName})
        this.setState({userid})

    const progresses=[];

        axios.get(`${API_URL}/Progress`).then(res=>{
            res.data.map(e=>{
                if(e.userId===this.state.userid){
                    progresses.push(e.levelId)          
                }
            })
    
        })
        
        this.setState({progress:progresses});

            setTimeout(() => {
                function removeDuplicates(originalArray, prop) {
                    var newArray = [];
                    var lookupObject  = {};
               
                    for(var i in originalArray) {
                       lookupObject[originalArray[i][prop]] = originalArray[i];
                    }
               
                    for(i in lookupObject) {
                        newArray.push(lookupObject[i]);
                    }
                     return newArray;
                }
               
               var uniqueArray = removeDuplicates(Chapter, "chapter_name");
               console.log(typeof uniqueArray);
             this.setState({Chapter:uniqueArray})
      
            }, 200);
     
      

              
         

            
          
        
        
    
    }
    
    
   
    renderItem = ({item}) =>{
      
        
        return <ChapterItem chapter={item}  user_id={this.state.userid} progress={this.state.progress} category_name={this.state.categoryName} data={this.state.data}/>
          
    }

    render() {
        return (
            <SafeAreaView style={{justifyContent:'center',alignItems:'center'}}>
                <FlatList
                    key={this.state.Chapter.chapter_level}
                    style={{flex:1,padding:5}}
                    data={this.state.Chapter}
                    renderItem={this.renderItem}
                    horizontal={false}
                ></FlatList>
            </SafeAreaView>
        )
    }
}

