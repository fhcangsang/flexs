import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'
import { Table, Divider } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';

export default class Category extends Component{

    state = {
        category_list:[],
        columns:[{
            title: '分类',
            dataIndex: 'name',
            key: 'name',
        },
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
                render:(res,data,index)=>(
                    <div onBlur={this.sortChange.bind(this,res,data,index)}>
                        <Input defaultValue={res} style={{width:"100px"}} />
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
      <Link to={{pathname:"/category_edit",state:data}}>编辑</Link>
      <Divider type="vertical" />
      <span onClick={this.category_delete.bind(this,value,data,index)}>删除</span>
    </span>
                ),
            }]
    };

    componentWillMount(){
        this.init()
    }

    init(){
        axios.get("http://canteen.test/api/admin/categories").then(res=>{
            // console.log(res.data.categories);
            this.setState({
                category_list:res.data.categories
            })
        })
    }

    sortChange=(res,data,index)=>{
        console.log(res,data,index)
    };

    category_delete=(value,data,index)=>{
        // console.log(value,data,index);
        axios.delete(`http://canteen.test/api/admin/categories/${value.id}`).then(res=>{
            this.state.category_list.splice(index,1);
            this.setState({
                category_list:this.state.category_list
            })
        })
    };

    products=(res)=>{
        if(res.products == ''){return <div style={{textAlign:'center',fontSize:20,color:'red'}}>还没有商品哦！</div>}
        let name = res.products.map(item =>{
            return <p>{item.name}</p>
        });
        return name
    };

    render(){
        return(
            <div>
                <Link to="/category_add">
                    <Button type="primary" style={{margin:"10px"}}>新增</Button>
                </Link>
                <Table
                    rowKey="id"
                    columns={this.state.columns}
                    dataSource={this.state.category_list}
                    expandedRowRender={res =>this.products(res)}
                />
            </div>
        )
    }
}