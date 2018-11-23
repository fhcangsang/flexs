import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'
import { Table, Divider } from 'antd';
import { Input ,} from 'antd';
import { Button } from 'antd';

export default class Product extends Component{

    state = {
        search_name:'',
        search_category:'',
        pagination:{
            current:1,
            pageSize:10,
            total:10
        },
        product_list:[],
        category_list:[],
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
      <Link to={{pathname:"/product_edit",state:data}}>编辑</Link>
      <Divider type="vertical" />
      <span onClick={this.product_delete.bind(this,value,data,index)}>删除</span>
    </span>
                ),
            }]
    };

    componentWillMount(){
        this.init();
        this.category()
    }

    init(){
        axios.get(`http://canteen.test/api/admin/products?page=${this.state.pagination.current}
        &name=${this.state.search_name}&category_id=${this.state.search_category}`).then(res=>{
            // console.log(res.data.products);
            this.setState({
                product_list:res.data.products.data,
                pagination:{
                    current:res.data.products.current_page,
                    pageSize:res.data.products.per_page,
                    total:res.data.products.total
                }
            })
        })
    }

    category(){
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

    stockChange=(res,data,index)=>{
        console.log(res,data,index)
    };

    product_delete=(value,data,index)=>{
        // console.log(value,data,index);
        axios.delete(`http://canteen.test/api/admin/products/${value.id}`).then(res=>{
            this.state.product_list.splice(index,1);
            this.setState({
                product_list:this.state.product_list,
            })
        })
    };

    pageChange=(value)=>{
        // console.log(value.current);
        this.setState({
            pagination:{
                current:value.current,
                pageSize:this.state.pagination.pageSize,
                total:this.state.pagination.total
            }
        });
        setTimeout(()=>{
           this.init()
        },0)
    };

    search=()=>{
        let search_name = document.getElementById('search_name').value;
        this.setState({
            search_name:search_name,
            pagination:{
                current:1,
                pageSize:this.state.pagination.pageSize,
                total:this.state.pagination.total
            }
        });
        setTimeout(()=>{
            this.init()
        },0)
    };

    categoryChange=()=>{
        let search_category = document.getElementById('search_category').value;
        this.setState({
            search_category:search_category,
            pagination:{
                current:1,
                pageSize:this.state.pagination.pageSize,
                total:this.state.pagination.total
            }
        });
        setTimeout(()=>{
            this.init()
        },0)
    };

    render(){
        const category_id = this.state.category_list.map(res=>
            <option key={res.id} value={res.id}>{res.name}</option>
        );

        return(
            <div>
                <Link to="/product_add">
                    <Button type="primary" style={{margin:"15px",display:'inlineBlock'}}>新增</Button>
                </Link>
                <Input id='search_name' style={{margin:"15px",display:'inlineBlock',width:120}} />
                <select id='search_category' onChange={this.categoryChange} style={{ width: 120,height:30,padding:4,borderRadius:5}}>
                    <option value=''>请选择</option>
                    {category_id}
                </select>
                <Button type="" style={{margin:"15px",display:'inlineBlock'}} onClick={this.search}>搜索</Button>
                <Table
                    rowKey="id"
                    columns={this.state.columns}
                    dataSource={this.state.product_list}
                    pagination={this.state.pagination}
                    onChange={this.pageChange}
                />
            </div>
        )
    }
}