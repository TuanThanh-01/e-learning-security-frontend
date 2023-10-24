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
      title='Tạo mới Topic'
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
          name='name'
          label='Tên Topic'
          rules={[
            {
              required: true,
              message: 'Hãy điền tên topic!',
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
