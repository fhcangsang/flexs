import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class  Edit extends Component{
constructor(props){
    super(props);
    this.state={
        id:props.location.state,
        advertisement:{},
        photo:{}
    }
}

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                axios.put(`https://movie.lc1017.com/api/admin/v1/advertisements/${this.state.id}`,values).then(()=>{
                    this.props.history.push("/guang_gao")
                })
            }
        });
    };

    componentWillMount(){
        // console.log(this.state.id);
        axios.get(`https://movie.lc1017.com/api/admin/v1/advertisements/${this.state.id}/edit`).then((res)=>{
            // console.log(res.data.data);
            this.setState({
                advertisement:res.data.data.advertisement,
                photo:res.data.data.photo
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="广告名"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your 广告名!' }],
                        initialValue:this.state.advertisement.name
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    label="排序"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('sort', {
                        rules: [{ required: true, message: 'Please input your 排序!' }],
                        initialValue:this.state.advertisement.sort
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="网址"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('url', {
                        rules: [{ required: true, message: 'Please input your 网址!' }],
                        initialValue:this.state.advertisement.url
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="图片id"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('photo_id', {
                        rules: [{ required: true, message: 'Please input your 图片id!' }],
                        initialValue:this.state.photo.id
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="advertisement_id"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('advertisement_node_id', {
                        rules: [{ required: true, message: 'Please input your advertisement_id!' }],
                        initialValue:this.state.advertisement.advertisement_node_id
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="描述"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('desc', {
                        rules: [{ required: true, message: 'Please input your desc' }],
                        initialValue:this.state.advertisement.desc
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12, offset: 5 }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const eidt = Form.create()(Edit);
export default eidt