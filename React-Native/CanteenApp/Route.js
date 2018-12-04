import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Category from './src/Category';
import Order from './src/Order';
import Cart from './src/Cart';
import My from './src/My';

export default createStackNavigator({
    Category,
    Order,
    Cart,
    My
})

Category.navigationOptions = {
    header:null
};