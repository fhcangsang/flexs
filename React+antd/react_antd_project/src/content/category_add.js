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
                axios.post(`https://movie.lc1017.com/api/admin/v1/advertisement_nodes`,values).then(res=>{
                    this.props.history.push("/category_home")
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="分类"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your 分类!' }],
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

const category_add = Form.create()(App);
export default category_add