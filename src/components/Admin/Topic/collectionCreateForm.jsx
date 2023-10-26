import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

const CollectionCreateForm = ({ open, onCreate, onCancel, item }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item !== null) {
      form.setFieldValue('name', item.name);
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      open={open}
      title={item === null ? 'Create New Topic' : 'Update Topic'}
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
          name='name'
          label='Topic Name'
          rules={[
            {
              required: true,
              message: 'Please enter topic name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
