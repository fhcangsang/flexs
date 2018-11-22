import React from 'react';
import {View, Text,FlatList,Image,ScrollView,StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import Tab from '../component/Tab';
import Header from '../component/Header';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            likes_courses:[],
            new_courses:[],
            recommended_courses:[],
            slide_courses:[],
            url:''
        };
    }

    componentWillMount(){
        this.init();
        this.setState({url:'home'})
    }

    init(){
        fetch("https://itfun.tv/api/v1/home.json",{
            method:'GET'
        })
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                this.setState({
                    likes_courses:response.likes_courses,
                    new_courses:response.new_courses,
                    recommended_courses:response.recommended_courses,
                    slide_courses:response.slide_courses
                })

            })
            .catch(error => {
                console.error(error);
            });
    }

    render(){

        const name = <Text>发现</Text>;

        let slider = null;
        let slide_courses =
            this.state.slide_courses.map((item)=><View style={styles.slide1} key={item.id.toString()}>
                                                        <Image
                                                            style={{width: 200, height: 100}}
                                                            source={{uri: item.photo}}/>
                                                        <Text>{item.created_at}</Text>
                                                        <Text>{item.name}</Text>
                                                        <Text>{item.desc}</Text>
                                                    </View>);
        if(this.state.slide_courses && this.state.slide_courses.length > 0){
            slider = <Swiper
                dotColor={'#999'}
                activeDotColor={'#1f99b0'}
                style={styles.wrapper}
                showsButtons={false}>
                {slide_courses}
            </Swiper>
        }

        const new_courses = ({item})=><View>
                                        <Image
                                            style={{width:180,height:160}}
                                            source={{uri: item.photo}} />
                                        <Text>{item.name}</Text>
                                        <Text>{item.desc}</Text>
                                        </View>;

        return(
            <View
                style={{
                    height:'100%',
                    position: 'relative',
                }}
            >

                <Header name={name}/>

                <ScrollView showsHorizontalScrollIndicator={false}>

                <View>
                    <Text
                        style={{
                            fontSize:24,
                            color:'#279',
                            marginTop: 15,
                            marginBottom: 15
                        }}
                    >
                        发现
                    </Text>

                </View>

                <View>
                    <Text style={{width:1500}}>
                        课程推荐
                    </Text>

                    <View style={{width:'100%',height:240}}>
                        {slider}
                    </View>
                </View>

                <View>
                    <Text style={{width:1500}}>
                        课程日历
                    </Text>
                    <FlatList
                        data={this.state.new_courses}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item=>item.id.toString()}
                        renderItem={new_courses}
                    />
                </View>

                <View>
                    <Text style={{width:1500}}>
                        喜欢的课程
                    </Text>
                    <FlatList
                        data={this.state.likes_courses}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item=>item.id.toString()}
                        renderItem={new_courses}
                    />
                </View>

                <View>
                    <Text style={{width:1500}}>
                        入门课程
                    </Text>
                    <FlatList
                        data={this.state.recommended_courses}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item=>item.id.toString()}
                        renderItem={new_courses}
                    />
                </View>

                </ScrollView>

                <Tab url={this.state.url}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
