import React from 'react';
import {Text} from 'react-native';
import {withNavigation} from 'react-navigation';

class Login_transition extends React.Component{

    componentWillMount(){
        this.props.navigation.navigate('User')
    }
    render(){
        return(
            <Text>
                666
            </Text>
        )
    }

}

export default withNavigation(Login_transition)