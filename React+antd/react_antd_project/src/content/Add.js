import React, {Component} from "react";
import axios from 'axios';
import { Form, Input, Button } from 'antd';


const FormItem = Form.Item;

class App extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                axios.post(`https://movie.lc1017.com/api/admin/v1/advertisements`,values).then(res=>{
                    this.props.history.push("/guang_gao")
                })
            }
        });
    };

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

const add = Form.create()(App);
export default add