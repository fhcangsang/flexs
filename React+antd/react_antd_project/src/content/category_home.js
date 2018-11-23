import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'
import { Button } from 'antd';
import { Table, Divider } from 'antd';
import { Input } from 'antd';


class category_home extends Component{
    state = {
        category_list:[],
        columns:[{
            title: '广告名',
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

    sortChange(res,data,index){       //排序；
        // console.log(res,data,index);
        let input = document.getElementsByClassName("ant-input")[index];
        let value = input.value;
        let sort = {
            id:data.id,
            sort:value
        };
        if(value !== res){         //如果value不等于res;
            // console.log(sort);
            axios.patch(`https://movie.lc1017.com/api/admin/v1/advertisement_nodes`,sort).then(()=>{
                this.init()
            })
        }
    }

    init(){
        axios.get("https://movie.lc1017.com/api/admin/v1/advertisement_nodes").then(res=>{
            // console.log(res.data.data);
            this.setState({
                category_list:res.data.data
            })
        })
    }

    category_delete(value,data,index) {      //bind(this,res)传参；
        // console.log(value,data,index);
        axios.delete(`https://movie.lc1017.com/api/admin/v1/advertisement_nodes/${data.id}`).then(()=>{
            this.state.category_list.splice(index,1);     //页面假删除；
            this.setState({
                category_list:this.state.category_list         //刷新；
            })
        })
    }

    render(){
        return (
            <div>
                <Link to="/category_add">
                    <Button type="primary" style={{margin:"10px"}}>新增</Button>
                </Link>
                <Table rowKey="id" columns={this.state.columns} dataSource={this.state.category_list} />
            </div>
        )
    }
}

export default category_home;