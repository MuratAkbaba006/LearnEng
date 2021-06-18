import React, { Component } from 'react'
import {SafeAreaView,View,Text} from 'react-native'
import Game from '../../screens/Game'
export default class ChapterDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            questions:[],
            message:""
        }
    }
    static navigationOptions = ({navigation})=>{
        return {
            title:<Text style={{textAlign:'center',justifyContent:'center'}}>Game</Text>,
           
        }
    }

   

    componentDidMount(){
        const data=this.props.navigation.getParam('data');
        const categoryName=this.props.navigation.getParam('category_name');
        const chapterName=this.props.navigation.getParam('chapter_name');
        const levelid=this.props.navigation.getParam('level_id');
        console.log(categoryName);
        console.log(chapterName);
        console.log(levelid);
        const questions=[];
        data.map((a)=>{
          if(a.level==categoryName.name && a.chapter==chapterName)
          {
              questions.push({question:a.question,answer:a.answer,clue:a.ipucu,levelid:a.levelId})
          }
        })
        this.setState({questions:questions})                                        
    
    }
    
    render() {
       const {questions}=this.state;
        return (
            
               <React.Fragment>
                   { questions.length !==0 &&
                       
                    <Game questions={questions} />
                   }
                </React.Fragment>
            
        )
    }
}
