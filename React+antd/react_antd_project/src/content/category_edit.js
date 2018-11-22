import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class  Edit extends Component{
    constructor(props){
        super(props);
        this.state={
            id:props.location.state,
            category:{},
            photo:{}
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                axios.put(`https://movie.lc1017.com/api/admin/v1/advertisement_nodes/${this.state.id.id}`,values).then(()=>{
                    this.props.history.push("/category_home")
                })
            }
        });
    };

    componentWillMount(){
        // console.log(this.state.id);
        this.setState({
            category:this.state.id
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="分类名"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your 分类名!' }],
                        initialValue:this.state.category.name
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
                        initialValue:this.state.category.sort
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

const category_edit = Form.create()(Edit);
export default category_edit