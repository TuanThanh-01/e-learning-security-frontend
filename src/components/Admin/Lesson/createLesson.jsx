import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './createLessonStyle.css';

const CreateLesson = ({ open, onCreate, onCancel, item, categoryLesson }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const reactQuillRef = useRef < ReactQuill > null;
  useEffect(() => {
    setValue('');
    if (item !== null) {
      console.log('hadfas');
      form.setFieldValue('title', item.title);
      form.setFieldValue('description', item.description);
      form.setFieldValue('lstCategoryLessonName', item.category_lesson);
      // setValue(item.content);
      // form.setFieldValue('content', item.content);
    } else {
      console.log('call reset field');
      form.resetFields();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      centered
      title={item === null ? 'Tạo mới bài học' : 'Cập nhật bài học'}
      okText={item === null ? 'Thêm mới' : 'Cập nhật'}
      cancelText='Hủy'
      onCancel={onCancel}
      width='100vw'
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
      <Row style={{ height: '100%' }} className='border'>
        <Col
          span={12}
          className='container main-container'
          style={{
            overflowY: 'auto',
            height: '100vh',
          }}
        >
          <Form form={form} layout='vertical' name='basic' className='p-2'>
            <Form.Item
              label='Tiêu đề'
              name='title'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tiêu đề bài học',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Mô tả'
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mô tả cho bài học',
                },
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
            <Row>
              <Col span={15}>
                <Form.Item
                  label='Danh mục bài học'
                  name='lstCategoryLessonName'
                  rules={[
                    {
                      required: true,
                      message: 'Hãy chọn danh mục cho bài học',
                    },
                  ]}
                >
                  <Select
                    mode='multiple'
                    style={{ width: '90%' }}
                    allowClear
                    options={categoryLesson}
                  />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label='Ảnh bìa'
                  name='coverImage'
                  rules={
                    item === null
                      ? [
                          {
                            required: true,
                            message: 'Hãy chọn ảnh bìa',
                          },
                        ]
                      : [{ required: false }]
                  }
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
                      <div style={{ marginTop: 8 }}>Tải ảnh bìa</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label='Nội dung bài học'
              name='content'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mô tả cho bài học',
                },
              ]}
            >
              <ReactQuill
                ref={reactQuillRef}
                theme='snow'
                style={{ height: '40rem' }}
                className='mb-4'
                modules={{
                  toolbar: {
                    container: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ font: [] }],
                      [{ size: [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                      ],
                      ['link', 'image', 'video'],
                      ['code-block'],
                      ['clean'],
                    ],
                  },
                  clipboard: {
                    matchVisual: false,
                  },
                }}
                formats={[
                  'header',
                  'font',
                  'size',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'indent',
                  'link',
                  'image',
                  'video',
                  'code-block',
                ]}
                value={value}
                onChange={setValue}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} className='container border-left border-dark'>
          <div className='ql-snow'>
            <div
              className='ql-editor'
              dangerouslySetInnerHTML={{ __html: value }}
            ></div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateLesson;
