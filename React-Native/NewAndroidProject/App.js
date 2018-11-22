import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import Route from './Route';
import Login_transition from './component/Login_transition';

export default createSwitchNavigator({
    Main:Route,
    Login_transition:Login_transition
})

