import React from 'react';
import {View, Text,FlatList,Image} from 'react-native';
import Tab from '../component/Tab'
import Header from "../component/Header";


export default class Calendar extends React.Component{
constructor(props){
    super(props);
    this.state = {
        courses:[],
        url:''
    }
}


    componentDidMount(){
        this.init();
        this.setState({url:'date'})
    }

    init(){
        fetch("https://itfun.tv/api/v1/calendar.json",{
            method:'GET'
        })
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                this.setState({
                    courses:response.courses
                })
            })
    }

    render(){

        const name = <Text>课程日历</Text>;

        const main = ({item})=><View>
                                    <Image style={{width:100,height:100}} source={{uri:item.photo}}/>
                                    <Text>
                                        {item.name}
                                    </Text>
                                </View>;


        return(
            <View
                style={{
                    height:'100%',
                    position: 'relative'
                }}
            >
                <Header name={name}/>

                <View>
                    <Text
                        style={{
                            fontSize:24,
                            color:'#279',
                            marginTop: 15,
                            marginBottom: 15
                        }}
                    >
                        课程日历
                    </Text>
                </View>

                <FlatList
                    data={this.state.courses}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={main}
                />

                <Tab url={this.state.url}/>
            </View>
        )
    }
}