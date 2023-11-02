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
      title={item === null ? 'Tạo chủ đề mới' : 'Cập nhật chủ đề'}
      okText={item === null ? 'Thêm mới' : 'Cập nhật'}
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
          label='Tên chủ đề'
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên chủ đề!',
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
