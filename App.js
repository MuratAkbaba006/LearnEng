import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Route from './src/Route'
import Store from './src/store/index'
import {Provider} from 'mobx-react'
import NavigationService from './src/config/NavigationService';




export class  App extends React.Component {
 
  
render(){
  return (
    <Provider {...Store}>
    <Route ref={navigatorRef=>{
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
    
    />
    </Provider>
  );
}
  
}

export default App
