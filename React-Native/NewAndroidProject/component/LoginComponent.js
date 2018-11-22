import React from 'react';
import {View,Text} from 'react-native';
import { withNavigation } from 'react-navigation';

class LoginComponent extends React.Component{
    render(){

        const back = "<";
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
                    <Text>
                        {back}
                    </Text>
                </View>

                <View
                    style={{
                        flex:6,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {this.props.login}
                </View>

            </View>
        )
    }
}

export default withNavigation(LoginComponent)