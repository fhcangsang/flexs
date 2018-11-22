import React from 'react';
import {View, Text,} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../component/ScrollableTabBar';
import Courses from '../component/Course';
import Tab from "../component/Tab";
import Header from "../component/Header";


export default class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            url:''
        }
    };

    componentWillMount(){
        this.init();
        this.setState({url:'category'})
    }

    init(){
        fetch("https://itfun.tv/api/v1/categories.json",{
            method:'GET'
        })
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                this.setState({
                    categories:response.categories,
                });
            })
    }

    render(){

        const name = <Text>分类</Text>;

        const Page = this.state.categories.map((item) => (
            <Courses key={item.id.toString()} tabLabel={item.name} slug={item.slug}/>
            )
        );

        return(
            <View
                style={{
                    height:'100%',
                    position: 'relative'
                }}
            >
                <Header name={name}/>

                <View
                    style={{flex: 1}}
                >
                    <ScrollableTabView
                        initialPage={0}
                        renderTabBar={() => <ScrollableTabBar/>}
                    >
                        {Page}
                    </ScrollableTabView>
                </View>

                <Tab url={this.state.url}/>
            </View>
        )
    }
}