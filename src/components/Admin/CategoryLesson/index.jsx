import React, { useEffect, useState } from 'react';
import { Button, Input, Spin, Table } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

const CategoryLesson = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryLessonData, setCategoryLessonData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
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
  }, []);

  const data = [];
  for (let i = 0; i < categoryLessonData.length; i++) {
    data.push({
      key: i,
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

  const handleCreateCategory = () => {};

  const handleOnChange = (e) => {
    const currentValue = e.target.value;
    console.log(currentValue);
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
          <Table
            rowSelection={rowSelection}
            columns={[
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
