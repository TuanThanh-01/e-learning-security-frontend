import { FlagOutlined, UploadOutlined, FireOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';

const CollectionCreateForm = ({ open, onCreate, onCancel, item }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item !== null) {
      form.setFieldValue('title', item.title);
      form.setFieldValue('content', item.content);
      form.setFieldValue('level', item.level);
      form.setFieldValue('tag', item.tag);
      form.setFieldValue('hint', item.hint);
      form.setFieldValue('flag', item.flag);
      form.setFieldValue('point', item.point);
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      open={open}
      title={
        item === null ? 'Create New Challenge CTF' : 'Update Challenge CTF'
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
          name='title'
          label='Title'
          rules={[
            {
              required: true,
              message: 'Please enter title',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='content'
          label='Content'
          rules={[
            {
              required: true,
              message: 'Please enter content!',
            },
          ]}
        >
          <TextArea rows={2} />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item
            style={{ width: '45%' }}
            name='level'
            label='Level'
            rules={[
              {
                required: true,
                message: 'Please choose level!',
              },
            ]}
          >
            <Select>
              <Select.Option value='easy'>Easy</Select.Option>
              <Select.Option value='medium'>Medium</Select.Option>
              <Select.Option value='hard'>Hard</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ width: '45%' }}
            name='tag'
            label='Tag'
            rules={[
              {
                required: true,
                message: 'Please choose tag!',
              },
            ]}
          >
            <Select>
              <Select.Option value='web'>Web</Select.Option>
              <Select.Option value='forensics'>Forensics</Select.Option>
              <Select.Option value='binary'>Binary</Select.Option>
              <Select.Option value='reverse engineering'>
                Reverse Engineering
              </Select.Option>
              <Select.Option value='cryptography'>Cryptography</Select.Option>
              <Select.Option value='miscellaneous'>Miscellaneous</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item name='hint' label='Hint'>
          <TextArea rows={2} />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item
            style={{ width: '45%' }}
            name='flag'
            label='Flag'
            rules={[
              {
                required: true,
                message: 'Please enter flag',
              },
            ]}
          >
            <Input
              addonBefore={<FlagOutlined style={{ color: '#362FD9' }} />}
            />
          </Form.Item>
          <Form.Item
            name='point'
            label='Point'
            style={{ width: '45%' }}
            rules={[
              {
                required: true,
                message: 'Please enter point',
              },
            ]}
          >
            <InputNumber
              min={10}
              max={100}
              style={{ width: '100%' }}
              addonBefore={<FireOutlined style={{ color: '#C70039' }} />}
            />
          </Form.Item>
        </div>
        <Form.Item
          label='File'
          valuePropName='fileList'
          name='file'
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[{ required: false }]}
        >
          <Upload
            maxCount={1}
            beforeUpload={(file) => {
              if (file.size > 9000000) {
                reject('File size exceeded');
              } else {
                resolve('Success');
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
