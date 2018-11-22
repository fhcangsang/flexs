import React from 'react';
import {View, Text,Button,AsyncStorage} from 'react-native';
import Tab from '../component/Tab'
import Header from "../component/Header";


export default class User extends React.Component{
constructor(props){
    super(props);
    this.state = {
        access_token:'',
        url:''
    }
}

    componentWillMount(){
        this.getStorage();
        this.setState({url:'my'})
    }

    init=()=>{
            fetch('https://itfun.tv/api/v1/users/me.json', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${this.state.access_token}`
                }
            }).then(response => response.json())
                .then(response => {
                    console.log(response);
                }).catch((response)=>{
                console.log(response);
            })
    };

    getStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('access_token');
                this.setState({
                    access_token:value
                });
                this.init()
        } catch (error) {
            console.log(error);
        }
    };

    quit = async ()=>{
            try {
                await AsyncStorage.removeItem('access_token');
                this.props.navigation.navigate('Login_transition')
            } catch (error) {
                console.log(error)
            }
    };

    render(){

        const name = <Text>我的</Text>;

        if(this.state.access_token){
                return <View
                    style={{
                        height:'100%',
                        position: 'relative'
                    }}
                >
                    <Header name={name}/>
                    <Text>
                        {this.state.access_token}
                    </Text>
                    <Text style={{fontSize:30,color:'red'}} onPress={()=>this.quit()}>
                        退出登录
                    </Text>
                    <Tab url={this.state.url}/>
                </View>
            }else {
                return <View
                    style={{
                        height:'100%',
                        position: 'relative'
                    }}
                >
                    <Header name={name}/>
                    <Button title='登录' onPress={()=>this.props.navigation.navigate('Login')}/>
                    <Text>
                        您必须登录后才能访问
                    </Text>
                    <Tab url={this.state.url}/>
                </View>
        }
    }
}