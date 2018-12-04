import React from 'react';
import {View, Text,} from 'react-native';
import Tab from './component/Tab';

export default class Order extends React.Component{
    state={
        TabBarSelect:''
    };

    componentWillMount(){
        this.setState({
            TabBarSelect:'order'
        })
    }
    render(){
        return(
            <View style={{position: 'relative',height:'100%'}}>
                <Text>
                    订单
                </Text>
            <Tab TabBarSelect={this.state.TabBarSelect}/>
            </View>
        )
    }
}