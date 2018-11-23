import React, {Component} from "react";
import axios from 'axios';
import {Form, Input, Button, InputNumber, Upload, Icon} from 'antd';
import { Select } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
            category_list:[],
            loading: false,
            photo_id:''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                axios.post(`http://canteen.test/api/admin/products`,values).then(res=>{
                    // console.log(res);
                    this.props.history.push("/product")
                })
            }
        });
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

    handleChange = (info) => {
        if(info.file.status === "done"){
            // console.log(info.file.response.photo_id);
            this.setState({
                photo_id:(info.file.response.photo_id)
            })
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const category = this.state.category_list.map(res=>{
            return <Option key={res.id} value={res.id}>{res.name}</Option>
        });

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <div style={{marginLeft:250}}>
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="http://canteen.test/api/admin/photos"
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
                </div>

            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="名称"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your 名称!' }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    label="价格"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Please input your 价格!' }],
                    })(
                        <InputNumber min={0} max={100} />
                    )}
                </FormItem>
                <FormItem
                    label="库存"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('stock', {
                        rules: [{ required: true, message: 'Please input your 库存!' }],
                    })(
                        <InputNumber min={0} max={100} />
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
                    label="分类"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('category_id', {
                        rules: [{ required: true, message: 'Please input your 分类!' }],
                    })(
                        <Select style={{ width: 120 }}>
                            {category}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="图片"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('photo_id', {
                        rules: [{ required: true, message: 'Please input your 图片!' }],
                        initialValue:this.state.photo_id
                    })(
                        <InputNumber min={1} max={99} disabled={true} />
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
            </div>
        );
    }
}

const product_add = Form.create()(Add);
export default product_add