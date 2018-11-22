import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'
import { Table, Divider } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';

export default class customer extends Component{

    state = {
        customer_list:[],
        columns:[{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
            {
                title: '图片',
                dataIndex: 'photos',
                render:(res,data,index)=>(
                    <div>
                        <img style={{width:50,height:45}} src={data.photos.image} alt='图片' />
                    </div>
                )
            },
            {
                title: '分类',
                dataIndex: 'categories.name',
                key: 'categories.name',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '条形码',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
                render:(res,data,index)=>(
                    <div onBlur={this.sortChange.bind(this,res,data,index)}>
                        <Input defaultValue={res} style={{width:"60px"}} />
                    </div>
                )
            },
            {
                title: '库存',
                dataIndex: 'stock',
                key: 'stock',
                render:(res,data,index)=>(
                    <div onBlur={this.stockChange.bind(this,res,data,index)}>
                        <Input defaultValue={res} style={{width:"60px"}} />
                    </div>
                )
            },{
                title: '日期',
                dataIndex: 'created_at',
                key: 'created_at',
            },{
                title: '操作',
                key: 'action',
                render: (value,data,index) => (
                    <span style={{color:"blue",cursor:"pointer"}}>
      <Link to={{pathname:"/customer_edit",state:data}}>编辑</Link>
      <Divider type="vertical" />
      <span onClick={this.customer_delete.bind(this,value,data,index)}>删除</span>
    </span>
                ),
            }]
    };

    componentWillMount(){
        this.init()
    }

    init(){
        axios.get("http://canteen.test/api/admin/customers").then(res=>{
            console.log(res.data.customers);
            this.setState({
                customer_list:res.data.customers.data
            })
        })
    }

    sortChange=(res,data,index)=>{
        console.log(res,data,index)
    };

    stockChange=(res,data,index)=>{
        console.log(res,data,index)
    };

    customer_delete=(value,data,index)=>{
        // console.log(value,data,index);
        axios.delete(`http://canteen.test/api/admin/customers/${value.id}`).then(res=>{
            this.state.customer_list.splice(index,1);
            this.setState({
                customer_list:this.state.customer_list
            })
        })
    };

    render(){
        return(
            <div>
                <Link to="/customer_add">
                    <Button type="primary" style={{margin:"10px"}}>新增</Button>
                </Link>
                <Table rowKey="id" columns={this.state.columns} dataSource={this.state.customer_list} />
            </div>
        )
    }
}