import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

const CollectionCreateForm = ({ open, onCreate, onCancel, item }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item !== null) {
      form.setFieldValue('categoryName', item.category_name);
      form.setFieldValue('description', item.description);
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      open={open}
      title={
        item === null ? 'Create New Category Lesson' : 'Update Category Lesson'
      }
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
          name='categoryName'
          label='Category Name'
          rules={[
            {
              required: true,
              message: 'Please enter category name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[
            {
              required: true,
              message: 'Please enter description!',
            },
          ]}
        >
          <Input type='textarea' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
