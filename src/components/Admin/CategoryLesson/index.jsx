import React, { useEffect, useState } from 'react';
import { Button, Input, Spin, Table, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import convertISOToCustomFormat from '../../../utils/ConvertDate';
import CollectionCreateForm from './collectionCreateForm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const CategoryLesson = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryLessonData, setCategoryLessonData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [refreshTable, setRefreshTable] = useState(0);
  const getCategoryLessonData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/category-lesson/all`
      );
      setCategoryLessonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryLessonData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [refreshTable]);

  const data = [];
  for (let i = 0; i < categoryLessonData.length; i++) {
    data.push({
      key: i,
      id: categoryLessonData[i].id,
      category_name: categoryLessonData[i].category_name,
      description: categoryLessonData[i].description,
      created_at: convertISOToCustomFormat(categoryLessonData[i].created_at),
      updated_at: categoryLessonData[i].updated_at,
    });
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleCreateCategory = () => {
    setOpenModal(true);
  };

  const sendDataCreateCategoryLesson = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/category-lesson/create`,
        data
      );
      message.success('Thêm mới danh mục bài học thành công!', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra!');
      return false;
    }
  };

  const onCreate = (values) => {
    if (sendDataCreateCategoryLesson(values)) {
      setIsLoading(true);
      setRefreshTable((oldKey) => oldKey + 1);
    }
    setOpenModal(false);
  };

  const deleteCategoryLessonById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/category-lesson/delete/${id}`
      );
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
      setRefreshTable((oldKey) => oldKey + 1);
    }
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
              <span className='mr-3'>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>
              <Button
                className='mr-3'
                type='primary'
                style={{ background: '#008170' }}
                onClick={handleCreateCategory}
              >
                Thêm
              </Button>
              <Button type='primary' danger>
                Xóa
              </Button>
            </div>
          </div>
          <CollectionCreateForm
            open={openModal}
            onCreate={onCreate}
            onCancel={() => {
              setOpenModal(false);
            }}
          ></CollectionCreateForm>
          <Table
            rowSelection={rowSelection}
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
                    />
                    <Button
                      type='primary'
                      size='small'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteCategoryLessonById(record.id);
                      }}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={data}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryLesson;
