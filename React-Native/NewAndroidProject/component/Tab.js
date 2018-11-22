import React from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';


class Tab extends React.Component{

    render(){

        const home = this.props.url == 'home' ?
            <Image style={{width:25,height:25}} source={require('../src/images/home1.png')} />:
            <Image style={{width:25,height:25}} source={require('../src/images/home.png')} />;

        const category = this.props.url == 'category' ?
            <Image style={{width:25,height:25}} source={require('../src/images/category1.png')} />:
            <Image style={{width:25,height:25}} source={require('../src/images/category.png')} />;

        const date = this.props.url == 'date' ?
            <Image style={{width:25,height:25}} source={require('../src/images/date1.png')} />:
            <Image style={{width:25,height:25}} source={require('../src/images/date.png')} />;

        const my = this.props.url == 'my' ?
            <Image style={{width:25,height:25}} source={require('../src/images/my1.png')} />:
            <Image style={{width:25,height:25}} source={require('../src/images/my.png')} />;

        const style = {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        };

        return(
            <View
            style={{
                position: 'absolute',
                bottom:0,
                width:'100%',
                flexDirection: 'row',
                backgroundColor:'#fff',
                borderTopStyle:'solid',
                borderTopWidth: 1,
                borderTopColor:'#999'
            }}
            >
                <View
                    style={{flex:1}}
                >
                    <TouchableOpacity style={style} onPress={() =>{
                        this.props.navigation.navigate('Home');
                    }}>
                        {home}
                        <Text>
                            发现
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{flex:1}}
                >
                    <TouchableOpacity style={style} onPress={() =>{
                        this.props.navigation.navigate('Category');
                    }}>
                    {category}
                    <Text>
                        分类
                    </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{flex:1}}
                >
                    <TouchableOpacity style={style} onPress={() => this.props.navigation.navigate('Calendar')}>
                    {date}
                    <Text>
                        课程日历
                    </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{flex:1}}
                >
                    <TouchableOpacity style={style} onPress={() => this.props.navigation.navigate('User')}>
                    {my}
                    <Text>
                        我的
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default withNavigation(Tab)