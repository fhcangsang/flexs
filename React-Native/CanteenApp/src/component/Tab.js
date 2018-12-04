import React from 'react';
import {View, Text,TouchableOpacity,Image,StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

class Tab extends React.Component{

    render(){

        const category = this.props.TabBarSelect === "category"?
            <Image style={style.image} source={require('../images/coffeeS.png')}/> :
            <Image style={style.image} source={require('../images/coffee.png')}/>;

        const order = this.props.TabBarSelect === "order"?
            <Image style={style.image} source={require('../images/orderS.png')}/> :
            <Image style={style.image} source={require('../images/order.png')}/>;

        const cart = this.props.TabBarSelect === "cart"?
            <Image style={style.image} source={require('../images/cartS.png')}/> :
            <Image style={style.image} source={require('../images/cart.png')}/>;

        const my = this.props.TabBarSelect === "my"?
            <Image style={style.image} source={require('../images/myS.png')}/> :
            <Image style={style.image} source={require('../images/my.png')}/>;

        return(
            <View style={style.container}>
                <View style={style.center}>
                    <TouchableOpacity style={style.center} onPress={()=>{this.props.navigation.navigate('Category')}}>
                        {category}
                        <Text>首页</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.center}>
                    <TouchableOpacity style={style.center} onPress={()=>{this.props.navigation.navigate('Order')}}>
                        {order}
                        <Text>订单</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.center}>
                    <TouchableOpacity style={style.center} onPress={()=>{this.props.navigation.navigate('Cart')}}>
                        {cart}
                        <Text>购物车</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.center}>
                    <TouchableOpacity style={style.center} onPress={()=>{this.props.navigation.navigate('My')}}>
                        {my}
                        <Text>我的</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle:'solid',
        borderTopWidth: 1,
        borderTopColor:'#999',
        position: 'absolute',
        bottom:0,
        backgroundColor:'#fff'
    },
    center:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        width:28,
        height:25,
        marginBottom:5,
        marginTop:5
    }
});

export default withNavigation(Tab)