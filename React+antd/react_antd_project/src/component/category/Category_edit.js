import React, {Component} from "react";
import axios from 'axios';
import {Form, Input, Button, InputNumber} from 'antd';


const FormItem = Form.Item;

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:props.location.state
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                axios.put(`http://canteen.test/api/admin/categories/${this.state.data.id}`,values).then(res=>{
                    // console.log(res);
                    this.props.history.push("/category")
                })
            }
        });
    };

    render() {
        // console.log(this.state.id)
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
                        initialValue:this.state.data.name
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
                        initialValue:this.state.data.sort
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

const category_edit = Form.create()(Edit);
export default category_edit