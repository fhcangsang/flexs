import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Home from './src/Home';
import Category from './src/Category';
import Calendar from './src/Calendar';
import User from './src/User';
import Login from './src/Login';

export default createStackNavigator({
    Home,
    Category,
    Calendar,
    User,
    Login
})

Home.navigationOptions = {
    header:null
};
Category.navigationOptions = {
    header:null
};
Calendar.navigationOptions = {
    header:null
};
User.navigationOptions = {
    header:null
};
Login.navigationOptions = {
    header:null
};