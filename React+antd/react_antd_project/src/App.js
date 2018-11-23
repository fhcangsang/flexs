import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';
import Home from './component/Home';
import Product from './component/product/Product';
import Product_add from './component/product/Product_add';
import Product_edit from './component/product/Product_edit';
import Category from './component/category/Category';
import Category_add from './component/category/Category_add';
import Category_edit from './component/category/Category_edit';
import Customer from './component/customer/Customer';
import Order from './component/order/Order';
import { Layout } from 'antd';
import { Menu, Icon, } from 'antd';

const SubMenu = Menu.SubMenu;

const { Header, Sider, Content } = Layout;

class App extends Component {

    render() {
    return (
        <BrowserRouter>
          <Layout>
              <Header>
                  <Icon type="dingding" /> 王子文的小卖部·后台管理系统
              </Header>
              <Layout>
                  <Sider>
                      <Menu
                          defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          mode="inline"
                          theme="light"
                      >
                          <Menu.Item key="1">
                              <Link to='/'>
                              <Icon type="home" />
                              <span>首页</span>
                              </Link>
                          </Menu.Item>

                          <SubMenu key="sub1" title={<span><Icon type="shopping-cart" /><span>小卖部管理</span></span>}>
                              <Menu.Item key="2">
                                  <Link to='/product'>
                                  <Icon type="gift" /><span>商品管理</span>
                                  </Link>
                              </Menu.Item>
                              <Menu.Item key="3">
                                  <Link to='/category'>
                                  <Icon type="table" /><span>货架管理</span>
                                  </Link>
                              </Menu.Item>
                              <Menu.Item key="4">
                                  <Link to='/customer'>
                                  <Icon type="user" /><span>会员管理</span>
                                  </Link>
                              </Menu.Item>
                              <Menu.Item key="5">
                                  <Link to='/order' >
                                  <Icon type="audit" /><span>订单管理</span>
                                  </Link>
                              </Menu.Item>
                              <Menu.Item key="6"><Icon type="car" /><span>进货管理</span></Menu.Item>
                          </SubMenu>
                      </Menu>
                  </Sider>
                  <Layout>
                      <Content>
                          <Route exact path='/' component={Home} />
                          <Route exact path='/product' component={Product} />
                          <Route exact path='/product_add' component={Product_add} />
                          <Route exact path='/product_edit' component={Product_edit} />
                          <Route exact path='/category' component={Category} />
                          <Route exact path='/category_add' component={Category_add} />
                          <Route exact path='/category_edit' component={Category_edit} />
                          <Route exact path='/customer' component={Customer} />
                          <Route exact path='/order' component={Order} />
                      </Content>
                  </Layout>
              </Layout>
          </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
