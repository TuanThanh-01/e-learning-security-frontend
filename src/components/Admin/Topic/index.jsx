import React, { useEffect, useState } from 'react';
import { Button, Spin, Table, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import CollectionCreateForm from './collectionCreateForm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

const Topic = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [topicData, setTopicData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getTopicData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/topic/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.forEach((topic) => {
        if (topic.created_at !== null) {
          topic.created_at = convertISOToCustomFormat(topic.created_at);
        }
        if (topic.updated_at !== null) {
          topic.updated_at = convertISOToCustomFormat(topic.updated_at);
        }
      });
      setTopicData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopicData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateTopic = () => {
    setItem(null);
    setOpenModal(true);
  };

  const sendDataCreateTopic = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/topic/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getTopicData();
      message.success('Tạo chủ đề thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const sendUpdateTopic = async (data, id) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/topic/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getTopicData();
      message.success('Cập nhật chủ đề thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const onCreate = (values) => {
    console.log(values);
    if (item === null) {
      sendDataCreateTopic(values);
    } else {
      sendUpdateTopic(values, item.id);
    }
    setOpenModal(false);
  };

  const deleteTopicById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/topic/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getTopicData();
      message.success('Xóa chủ đề thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const handleDeleteTopicById = (topicId) => {
    if (deleteTopicById(topicId)) {
      setIsLoading(true);
    }
  };

  const handleUpdateTopic = (record) => {
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
              placeholder='Nhập tên chủ đề'
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
                onClick={handleCreateTopic}
              >
                Thêm mới
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
                title: 'Tên chủ đề',
                dataIndex: 'name',
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return String(record.name)
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase());
                },
              },
              {
                title: 'Thời gian tạo',
                dataIndex: 'created_at',
              },
              {
                title: 'Thời gian cập nhật',
                dataIndex: 'updated_at',
              },
              {
                title: '',
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
                        handleUpdateTopic(record);
                      }}
                    />
                    <Button
                      type='primary'
                      size='small'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDeleteTopicById(record.id);
                      }}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={topicData}
          />
        </div>
      )}
    </div>
  );
};

export default Topic;
