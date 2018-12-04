import React from 'react';
import {View, Text,} from 'react-native';
import Tab from './component/Tab';

export default class Cart extends React.Component{
    state={
        TabBarSelect:''
    };

    componentWillMount(){
        this.setState({
            TabBarSelect:'cart'
        })
    }
    render(){
        return(
            <View style={{position: 'relative',height:'100%'}}>
                <Text>
                    购物车
                </Text>
                <Tab TabBarSelect={this.state.TabBarSelect}/>
            </View>
        )
    }
}