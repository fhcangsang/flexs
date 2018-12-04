import React from 'react';
import {View, Text,} from 'react-native';
import Tab from './component/Tab';

export default class My extends React.Component{
    state={
        TabBarSelect:''
    };

    componentWillMount(){
        this.setState({
            TabBarSelect:'my'
        })
    }
    render(){
        return(
            <View style={{position: 'relative',height:'100%'}}>
                <Text>
                    我的
                </Text>
                <Tab TabBarSelect={this.state.TabBarSelect}/>
            </View>
        )
    }
}