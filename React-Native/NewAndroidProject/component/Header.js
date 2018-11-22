import React from 'react';
import {View,Text,Image} from 'react-native';
import { withNavigation } from 'react-navigation';

class Header extends React.Component{
    render(){
        return(
            <View
                style={{
                    width:'100%',
                    height:40,
                    flexDirection: 'row',
                    backgroundColor:'#fff',
                    borderBottomStyle:'solid',
                    borderBottomWidth: 1,
                    borderBottomColor:'#999'
                }}
            >
                <View
                    style={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image style={{width:20,height:20}} source={require('../src/images/news.png')} />
                </View>
                <View
                    style={{
                        flex:5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {this.props.name}
                </View>
                <View
                    style={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image style={{width:20,height:20}} source={require('../src/images/search.png')} />
                </View>
                <View
                    style={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image style={{width:20,height:20}} source={require('../src/images/more.png')} />
                </View>
            </View>
        )
    }
}

export default withNavigation(Header)