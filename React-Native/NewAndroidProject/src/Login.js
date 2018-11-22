import React from 'react';
import {View, Text, TextInput, Button,AsyncStorage} from 'react-native';
import LoginComponent from "../component/LoginComponent";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login:1,
            sex:0,
            userName:'',
            password:''
        }
}

    login_component=()=>{
        if(this.state.login == 1){
            return <View>
                <Text>电子邮件</Text>
                <TextInput placeholder={'66666'} onChangeText={(text)=>this.setState({userName:text})}/>
                <Text>密码</Text>
                <TextInput secureTextEntry={true} onChangeText={(text)=>this.setState({password:text})}/>
                <Button title='登录' onPress={this.login_submit.bind(this)}/>
            </View>
        }else{
            return <View>
                <Text>姓</Text>
                <TextInput/>
                <Text>名</Text>
                <TextInput/>
                <Text>请实名登记您的信息</Text>
                <Text>电子邮件</Text>
                <TextInput/>
                <Text>密码</Text>
                <TextInput/>
                <Text>性别</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={{padding: 5,marginLeft: 5,marginRight: 5,color:'#fff',
                            backgroundColor:this.state.sex ==0?'green':'blue'}}
                        onPress={this.boy.bind(this)}>
                        男
                    </Text>
                    <Text
                        style={{padding: 5,marginLeft: 5,marginRight: 5,color:'#fff',
                            backgroundColor:this.state.sex ==1?'green':'blue'}}
                        onPress={this.girl.bind(this)}>
                        女
                    </Text>
                </View>
                <Button title='注册' onPress={()=>this.props.navigation.navigate('User')}/>
            </View>
        }
    };

    login_submit=()=>{
        fetch('https://itfun.tv/oauth/token',{
            method:'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grant_type: 'password',
                client_id: 'c60de69e571fae852bea53e347a2be36503ebba84247a054cb7eb6549d161ac9',
                client_secret: 'd8491d666ee8749bc348eb25035ed0195dbd6cff586327ba9304013eb0d92734',
                username: this.state.userName,
                password: this.state.password
            })
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                AsyncStorage.setItem('access_token', response.access_token);
                this.props.navigation.navigate('Login_transition')
            })
    };

    login=()=>{
        this.setState({
            login:1
        })
    };

    register=()=>{
        this.setState({
            login:0
        })
    };

    boy=()=>{
        this.setState({
            sex:0
        })
    };
    girl=()=>{
        this.setState({
            sex:1
        })
    };

    render(){
        console.log(this.state.password);

        const login = <View style={{flexDirection: 'row'}}>
            <Text
                style={{padding: 5,marginLeft: 5,marginRight: 5,color:'#fff',
                    backgroundColor:this.state.login ==1?'green':'blue'}}
                onPress={this.login.bind(this)}>
                登录
            </Text>
            <Text
                style={{padding: 5,marginLeft: 5,marginRight: 5,color:'#fff',
                    backgroundColor:this.state.login ==0?'green':'blue'}}
                onPress={this.register.bind(this)}>
                注册
            </Text>
        </View>;

        return(
            <View
                style={{
                    height:'100%',
                    position: 'relative'
                }}
            >
                <LoginComponent login={login} />

                {this.login_component()}

            </View>
        )
    }
}
