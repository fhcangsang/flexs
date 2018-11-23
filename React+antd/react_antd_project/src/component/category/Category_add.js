import React, {Component} from "react";
import axios from 'axios';
import {Form, Input, Button, InputNumber} from 'antd';


const FormItem = Form.Item;

class Add extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                axios.post(`http://canteen.test/api/admin/categories`,values).then(res=>{
                    // console.log(res);
                    this.props.history.push("/category")
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
                        <InputNumber min={1} max={99} />
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

const category_add = Form.create()(Add);
export default category_add