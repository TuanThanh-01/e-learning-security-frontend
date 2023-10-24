import React, { useEffect, useState } from 'react';
import { Button, Spin, Table, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import CollectionCreateForm from './collectionCreateForm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const CategoryLesson = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryLessonData, setCategoryLessonData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getCategoryLessonData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/category-lesson/all`
      );
      setCategoryLessonData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryLessonData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateCategory = () => {
    setItem(null);
    setOpenModal(true);
  };

  const sendDataCreateCategoryLesson = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/category-lesson/create`,
        data
      );
      await getCategoryLessonData();
      message.success('Thêm mới danh mục bài học thành công!', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra!');
      return false;
    }
  };

  const sendUpdateTopic = async (data, id) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/category-lesson/update/${id}`,
        data
      );
      await getCategoryLessonData();
      message.success('Cập nhật danh mục bài học thành công!', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra!');
      setIsLoading(false);
      return false;
    }
  };

  const onCreate = (values) => {
    console.log(values);
    if (item === null) {
      sendDataCreateCategoryLesson(values);
    } else {
      sendUpdateTopic(values, item.id);
    }
    setOpenModal(false);
  };

  const deleteCategoryLessonById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/category-lesson/delete/${id}`
      );
      await getCategoryLessonData();
      message.success('Xóa danh mục bài học thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra!');
      return false;
    }
  };

  const handleDeleteCategoryLessonById = (categoryLessonId) => {
    if (deleteCategoryLessonById(categoryLessonId)) {
      setIsLoading(true);
    }
  };

  const handleUpdateCategoryLesson = (record) => {
    setOpenModal(true);
    setItem(record);
  };

  return (
    <div style={{ height: '100vh' }}>
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          size='large'
        />
      ) : (
        <div>
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Search
              placeholder='Nhập tên category lesson'
              allowClear
              style={{ width: '20rem' }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />

            <div>
              <Button
                className='mr-3'
                type='primary'
                style={{ background: '#008170', width: '8rem' }}
                onClick={handleCreateCategory}
              >
                Thêm
              </Button>
            </div>
          </div>
          <CollectionCreateForm
            open={openModal}
            item={item}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
          ></CollectionCreateForm>
          <Table
            rowKey={(record) => record.id}
            columns={[
              { title: 'ID', dataIndex: 'id' },
              {
                title: 'Category Name',
                dataIndex: 'category_name',
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return String(record.category_name)
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase());
                },
              },
              {
                title: 'Description',
                dataIndex: 'description',
              },
              {
                title: 'Created At',
                dataIndex: 'created_at',
              },
              {
                title: 'Updated At',
                dataIndex: 'updated_at',
              },
              {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (record) => (
                  <div>
                    <Button
                      type='primary'
                      size='small'
                      icon={<EditOutlined />}
                      className='mr-2'
                      onClick={() => {
                        handleUpdateCategoryLesson(record);
                      }}
                    />
                    <Button
                      type='primary'
                      size='small'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDeleteCategoryLessonById(record.id);
                      }}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={categoryLessonData}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryLesson;
