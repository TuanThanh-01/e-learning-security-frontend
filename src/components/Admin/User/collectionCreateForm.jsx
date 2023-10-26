import { Form, Input, Modal, Upload, message } from 'antd';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const CollectionCreateForm = ({ open, onCreate, onCancel, item }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item !== null) {
      form.setFieldValue('firstname', item.firstname);
      form.setFieldValue('lastname', item.lastname);
      form.setFieldValue('email', item.email);
      form.setFieldValue('studentIdentity', item.student_identity);
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      open={open}
      title={item === null ? 'Create New User' : 'Update User'}
      okText={item === null ? 'Add' : 'Update'}
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name='firstname'
          label='First Name'
          rules={[
            {
              required: true,
              message: 'Please enter first name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='lastname'
          label='Last Name'
          rules={[
            {
              required: true,
              message: 'Please enter Last Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='studentIdentity'
          label='Student Identity'
          rules={[
            {
              required: true,
              message: 'Please enter student identity!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {item === null ? (
          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please enter password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: 'Please enter email!',
            },
            {
              type: 'email',
              message: 'Email not valid',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Avatar'
          valuePropName='fileList'
          name='image'
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[{ required: false }]}
        >
          <Upload
            maxCount={1}
            listType='picture-card'
            accept='image/png, image/jpeg'
            beforeUpload={(file) => {
              if (file.size > 9000000) {
                reject('File size exceeded');
              } else {
                resolve('Success');
              }
            }}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload Avatar</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
