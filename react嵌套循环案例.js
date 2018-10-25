import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import './order_home.css'


class order_home extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders:[],
            nameOfStatus:[
                "待付款","待发货","配货中","待收货","交易成功"
            ],
            colorOfStatus:[
                "color1","color2","color3","color4","color5"
            ],
            page:{
                total: 0,
                pageSize: 0,
                current_page: 1
            }
        };
        // this.product_li = this.product_li.bind(this)
    }

    componentWillMount(){
        this.init();
    }

    product_li=()=>{
        let li = this.state.orders.map((order,key)=>{
            let img = 0;
            let name = 0;
            let num = 1;
            order.order_products.map((res,key)=>{
                img = res.product.image;
                name = res.product.name;
                num = res.num
            });
           return <div className={`product_li ${this.state.colorOfStatus[order.status - 1]}`} key={key}>
                <div className={`order_status ${this.state.colorOfStatus[order.status - 1]}`}>{this.state.nameOfStatus[order.status - 1]}</div>
                <div className="order_info">
                    <span>{order.created_at}</span>
                    <span>电话（<a href={`tel:${order.address.tel}`}>{order.address.tel}</a>）</span>
                    <span>订单号：<a href="###">{order.id}</a></span>
                    <span>订单金额: <span className="price">{order.total_price}</span>元</span>
                </div>
                <div className="product_info">
                    <div>
                        <a href="###">
                            <img src={`http://images.canon4ever.com/${img}`} alt=""/>
                            <span>{name} &nbsp;&nbsp;&nbsp;&nbsp;数量： {num}</span>
                        </a>
                    </div>
                    <Button type="primary">订单详情</Button>
                </div>
            </div>
        });
        return li
    };

    init(){
        axios.get(`http://localhost:8000/admin/shop/orders?page=${this.state.page.current_page}`).then(response => {
            let orders = response.data.data.orders;
            console.log(orders.data);
            this.setState({
                orders: orders.data,
                page: {
                    total: orders.total,
                    pageSize: orders.per_page,
                    current_page: orders.current_page
                }
            });
        })
    }

    render(){
        return(
            <div className="container">
                <this.product_li />
            </div>
        )
    }
}

export default order_home