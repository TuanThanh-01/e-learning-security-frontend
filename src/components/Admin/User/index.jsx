import React, { useEffect, useState } from 'react';
import { Avatar, Button, Spin, Table, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import CollectionCreateForm from './collectionCreateForm';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8082/api/v1/user/all`);
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateUser = () => {
    setItem(null);
    setOpenModal(true);
  };

  const sendDataCreateUser = async (data) => {
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('studentIdentity', data.studentIdentity);
    formData.append('image', data.image);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/user/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await getUserData();
      message.success('Create user success!', 3);
      return true;
    } catch (error) {
      message.error('An error occur!');
      return false;
    }
  };

  const sendUpdateUser = async (data, id) => {
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('studentIdentity', data.studentIdentity);
    if (data.image !== undefined) {
      formData.append('image', data.image);
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/user/update/${id}`,
        formData
      );
      await getUserData();
      message.success('Update user success!', 3);
      return true;
    } catch (error) {
      message.error('An error occur!');
      setIsLoading(false);
      return false;
    }
  };

  const onCreate = (values) => {
    if (values.image !== undefined) {
      values.image = values.image[0].originFileObj;
    }
    if (item === null) {
      sendDataCreateUser(values);
    } else {
      sendUpdateUser(values, item.id);
    }
    setOpenModal(false);
  };

  const deleteUserById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/user/${id}`
      );
      await getUserData();
      message.success('Delete user success', 3);
      return true;
    } catch (error) {
      message.error('An error occur!');
      return false;
    }
  };

  const handleDeleteUserById = (topicId) => {
    if (deleteUserById(topicId)) {
      setIsLoading(true);
    }
  };

  const handleUpdateUser = (record) => {
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
              placeholder='Enter firstname, lastname, email, student identity'
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
                onClick={handleCreateUser}
              >
                Add
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
                title: 'Avatar',
                dataIndex: 'avatar',
                render: (imageUrl) => (
                  <Avatar
                    shape='square'
                    size='large'
                    src={`http://localhost:8082${imageUrl}`}
                    icon
                  />
                ),
              },
              {
                title: 'First Name',
                dataIndex: 'firstname',
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return (
                    String(record.firstname)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase()) ||
                    String(record.lastname)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase()) ||
                    String(record.student_identity)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase()) ||
                    String(record.email)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase())
                  );
                },
              },
              {
                title: 'Last Name',
                dataIndex: 'lastname',
              },
              {
                title: 'Student Identity',
                dataIndex: 'student_identity',
              },
              {
                title: 'Email',
                dataIndex: 'email',
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
                        handleUpdateUser(record);
                      }}
                    />
                    <Button
                      type='primary'
                      size='small'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDeleteUserById(record.id);
                      }}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={userData}
          />
        </div>
      )}
    </div>
  );
};

export default User;
