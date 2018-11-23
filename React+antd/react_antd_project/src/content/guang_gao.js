import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'
import { Button } from 'antd';
import { Table, Divider } from 'antd';


class guang_gao extends Component{
    state = {
        ad_list:[],
        columns:[{
            title: '广告名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Photo',
            dataIndex: "photo.image",
            key: 'photo',
            render:(res)=>(
                <img src={res} alt="图" style={{width:"30px",height:"30px"}}/>
            )
        }, {
            title: '图片id',
            dataIndex: 'photo_id',
            key: 'photo_id',
        },{
            title: 'advertisement_id',
            dataIndex: 'advertisement_node_id',
            key: 'advertisement_node_id',
        }, {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
        },{
            title: '网址',
            dataIndex: 'url',
            key: 'url',
        },{
            title: '操作',
            key: 'action',
            render: (value,data,index) => (
                <span style={{color:"blue",cursor:"pointer"}}>
      <Link to={{pathname:"/eidt",state:data.id}}>编辑</Link>
      <Divider type="vertical" />
      <span onClick={this.ad_delete.bind(this,value,data,index)}>删除</span>
    </span>
            ),
        }]
    };

    init(){
        axios.get("https://movie.lc1017.com/api/admin/v1/advertisements").then(res=>{
            // console.log(res.data.data);
            this.setState({
                ad_list:res.data.data
            })
        })
    }

    ad_delete(value,data,index) {      //bind(this,res)传参；
        // console.log(value,data,index);
        axios.delete(`https://movie.lc1017.com/api/admin/v1/advertisements/${data.id}`).then(()=>{
            this.state.ad_list.splice(index,1);     //页面假删除；
            this.setState({
                ad_list:this.state.ad_list         //刷新；
            })
        })
    }

    componentWillMount(){
        this.init()
    }

    render(){
        return (
            <div>
                <Link to="/add">
                <Button type="primary" style={{margin:"10px"}}>新增</Button>
                </Link>
                <Table rowKey="id" columns={this.state.columns} dataSource={this.state.ad_list} />
            </div>
        )
    }
}

export default guang_gao;