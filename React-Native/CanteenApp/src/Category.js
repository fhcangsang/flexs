import React from 'react';
import {View, Text,ScrollView,StyleSheet,Image} from 'react-native';
import axios from 'axios';
import Tab from './component/Tab';

export default class Category extends React.Component{
    constructor(props){
        super(props);
        this.state={
            TabBarSelect:'',     //底部Tab选中状态；
            category:[],
            categoryId:1,         //样式高亮；
        };
    }

    componentWillMount(){
        this.setState({
            TabBarSelect:'category'
        })
    }

    componentDidMount(){
        this.init()
    }

    init(){
        axios.get(`http://114.67.72.94/api/admin/categories`).then(res=>{
            // console.log(res.data.categories);
            this.setState({
                category:res.data.categories
            })
        }).catch(res=>{
            console.log("访问失败了")
        })
    }

    //锚点导航，样式高亮；
    categoryId(id){
        console.log(id);
        this.setState({
            categoryId:id
        });
        if(id === 1){
            this.ScrollView.scrollTo({x:0,y:0,animated: false})
        }else{
            this.ScrollView.scrollTo({x:0,y:this.scrollHeight()[id-2] + 10 ,animated: false})
        }
    }
    //锚点导航，样式高亮；

    //高度计算；
    scrollHeight(){
        let products = this.state.category.map(res=>{
            return res.products.length
        });
        let scroll = [];
        for (let i = 0; i < products.length; i++) {
            let b = products[i] * 88 + 10;
            scroll.push(b)
        }
        for (let i = 1; i < scroll.length; i++) {
            scroll[i] = scroll[i - 1] + scroll[i]
        }
        // console.log(scroll);
        return scroll
    }
    //高度计算；

    //滚动监听；
    scroll(even){
        console.log(even.nativeEvent.contentOffset.y);
        let y = even.nativeEvent.contentOffset.y;
        for (let i = 0; i < this.scrollHeight().length - 1; i++) {
            if (y > this.scrollHeight()[i] && y < this.scrollHeight()[i+1]){
                this.setState({
                    categoryId: i + 2
                })
            }
            if (y < this.scrollHeight()[0]){
                this.setState({
                    categoryId: 1
                })
            }
        }
    };
    //滚动监听；

    //添加商品；
    product_add=(id)=>{
        console.log(id);
    };
    //添加商品；

    render(){
        const category = this.state.category.map(res=>{
            return <Text
                style={res.id === this.state.categoryId?styleClass.categoryNameStyleSelect:styleClass.categoryNameStyle}
                key={res.id} onPress={()=>this.categoryId(res.id)}>{res.name}</Text>
        });

        const products = this.state.category.map(res=>{
            let product = res.products.map(item=>{
                return <View key={item.id} style={styleClass.products}>
                            <View style={{flex:1}}>
                                <Image style={{width:'100%',height:60,borderRadius:5}} source={{uri:item.photos.image}}/>
                            </View>
                            <View style={{flex:2,justifyContent: 'center'}}>
                                <Text style={{fontSize:12}}>{item.name}</Text>
                                <Text style={{color:'red'}}>￥ {item.price}</Text>
                            </View>
                            <Text style={styleClass.add} onPress={()=>{this.product_add(item.id)}}>+</Text>
                        </View>
            });
            return <View key={res.id} style={styleClass.product_list}>
                        <Text style={styleClass.product_title}>{res.name}</Text>
                        {product}
                    </View>
        });

        return(
            <View style={{position: 'relative',height:'100%'}}>
                <View
                    style={styleClass.container}
                >
                    <View
                        style={styleClass.leftCategory}
                    >
                        {category}
                    </View>
                    <View
                        style={styleClass.rightContent}
                    >
                        <ScrollView
                            ref = {(ref)=>this.ScrollView=ref}    //获取dome对象;
                            onScroll={(even)=>this.scroll(even)}
                        >
                            {products}
                            <View style={{height:600}}></View>
                        </ScrollView>
                    </View>
                </View>
                <Tab TabBarSelect={this.state.TabBarSelect}/>
            </View>
        )
    }
}

const styleClass = StyleSheet.create({
    container:{
        height:'100%',
        display:'flex',
        flexDirection: 'row'
    },
    leftCategory:{
        flex: 1,
        height:'100%',
        backgroundColor:'#f1eeee',
        fontSize: 14
    },
    rightContent:{
        flex:3,height:'100%',
        backgroundColor:'#fff'
    },
    categoryNameStyle:{
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'center'
    },
    categoryNameStyleSelect : {
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor:'#fff',
        textAlign: 'center'
    },
    product_list:{},
    product_title:{
        padding:10,
        color: 'blue'
    },
    products:{
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    add:{
        borderRadius: 25,
        backgroundColor: 'red',
        textAlign: 'center',
        width: 25,
        height: 25,
        lineHeight: 20,
        color: '#fff',
        fontSize: 20,
        fontWeight: "700",
        marginRight: 3,
        marginLeft: 3
    }
});