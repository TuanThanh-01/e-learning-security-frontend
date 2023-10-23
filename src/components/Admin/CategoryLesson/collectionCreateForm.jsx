import { Form, Input, Modal } from 'antd';
import React from 'react';

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title='Tạo mới Danh Mục Bài Học'
      okText='Thêm mới'
      cancelText='Hủy'
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
          label='Tên Danh Mục Bài Học'
          rules={[
            {
              required: true,
              message: 'Hãy điền tên danh mục bài học!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Mô tả'
          rules={[
            {
              required: true,
              message: 'Hãy điền mô tả danh mục bài học!',
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
