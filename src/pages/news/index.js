import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';


const NewsIndex = () =>{
    const [form] = Form.useForm();
    const [, forceUpdate] = useState(); // To disable submit button at the beginning.

    useEffect(() => {
      forceUpdate({});
    }, []);

    const onFinish = values => {
      console.log('Finish:', values);
    };
    return (
      <div>
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item name="username">
            <Input placeholder="新闻标题" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                搜索
              </Button>
            )}
          </Form.Item>
        </Form>
        <ul>
          <li onClick={()=>{this.props.history.push("/news/details?id=1&title=新闻详情1")}}>新闻标题1</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=2&title=新闻详情2")}}>新闻标题2</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=3&title=新闻详情3")}}>新闻标题3</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=4&title=新闻详情4")}}>新闻标题4</li>
        </ul>
      </div>
    )
}

export default NewsIndex;
