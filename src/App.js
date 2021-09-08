import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Tabs,  Table, Tag, Space, Input, Button, Modal, Select, Drawer, Avatar } from 'antd';
import { 
  FolderOpenOutlined, 
  ShoppingCartOutlined, 
  FileProtectOutlined,
  SearchOutlined,
  FilterOutlined,
  SortDescendingOutlined,
  PlusOutlined,
  UserOutlined,
  BellOutlined,
  EditOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Column } = Table;
const { Header, Content, Sider } = Layout;
const { Option } = Select;


function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [visible, setVisible] = useState(false);
 
  const data = [
    {
      key: '1',
      refNo: 'JD-123245-446',
      company: 'Blyte',
      amount: '56,700',
      status: 'Completed',
    },
    {
      key: '2',
      refNo: 'JD-234532-345',
      company: 'Krygstan Inc.',
      amount: '32,800',
      status: 'Pending',
    },
    {
      key: '3',
      refNo: 'JD-86554-098',
      company: 'Jester Price',
      amount: '86,542',
      status: 'Pending',
    },
    {
      key: '4',
      refNo: 'JD-7779-456',
      company: 'RyZen Corp.',
      amount: '56,700',
      status: 'Completed',
    },
    {
      key: '5',
      refNo: 'JD-56758-067',
      company: 'Ge-Force Edge',
      amount: '62,435',
      status: 'Completed',
    },
    {
      key: '6',
      refNo: 'JD-1234-543',
      company: 'Nano Edge',
      amount: '67,542',
      status: 'Pending',
    },
  ];

  const showModal = (data) => {
    setIsModalVisible(true);
    setModalData(data)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Layout>
        <Layout>
          <Sider width={200} className="site-layout-background" style={{position: 'fixed', height: '100vh', left: 0}}>
            <div className='comp-container'>
              <div className='comp-logo'><img src='image/comp.jpg'/></div>
              <div className='comp-name'>CrowdStage</div>
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1" icon={<FolderOpenOutlined />}>Transactions</Menu.Item>
              <Menu.Item key="2" icon={<ShoppingCartOutlined />}>Orders</Menu.Item>
              <Menu.Item key="3" icon={<FileProtectOutlined />}>Maintenance</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px', overflow: 'initial'}}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                marginLeft: 200
              }}
            >
              <div className='header-container'>
                <div className='cont-title'>Transactions</div>
                <div className='header-user'>
                  <div style={{marginRight:'12px'}}><BellOutlined /></div>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  <div className="user">
                    Jemimah Rontos
                  </div>
                </div>
              </div>
              
              <div className='cont-body'>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="All" key="1">
                  <div className='filter-container'>
                  <Modal title="Edit Transaction" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <div className='modal-lbl'>Amount</div><Input value ={modalData && modalData.amount} placeholder='Amount'/>
                    <div className='modal-lbl'>Status</div>
                    <Select defaultValue={modalData && modalData.status} style={{ width: '100%' }}>
                      <Option value="Completed">Completed</Option>
                      <Option value="Pending">Pending</Option>
                    </Select>
                  </Modal>
                    <div>
                      <Input placeholder="Search" prefix={<SearchOutlined />} />
                    </div>
                    <div>
                      <Button icon={ <SortDescendingOutlined />}>
                        Sort
                      </Button>
                      <Button icon={<FilterOutlined />}>
                        Filter
                      </Button>
                    </div>
                  </div>
                  <Table dataSource={data}>
                    <Column title="ID" dataIndex="refNo" key="refNo" />
                    <Column title="COMPANY" dataIndex="company" key="company" />
                    <Column
                      title="STATUS"
                      dataIndex="status"
                      key="status"
                      render={tags => (
                        <Tag color={tags == 'Completed' ? "green" :"orange" } key={tags}>
                          {tags}
                        </Tag>
                      )}
                    />
                    <Column title="AMOUNT" dataIndex="amount" key="amount" render={amount => (<div style={{textAlign: 'right'}}>P {amount}</div>)}/>
                    
                    <Column
                      title="ACTION"
                      key="action"
                      render={(text, record) => (
                        <div className='cont-actions' onClick={() => showModal(text)}> 
                          <Space size="middle">
                            <EditOutlined />
                          </Space>
                        </div>
                        
                      )}
                    />
                  </Table>
                 
                  </TabPane>
                  <TabPane tab="Pending" key="2">
                    Pending
                  </TabPane>
                  <TabPane tab="Completed" key="3">
                    Completed
                  </TabPane>
                </Tabs>
              
              </div>
              <div className='btn-footer'>
                <Button type="primary" ghost icon={<PlusOutlined />} onClick={showDrawer}> Add Transaction</Button>
              </div>
            </Content>
            <Drawer title="Add Transaction" placement="right" onClose={onClose} visible={visible} size={'default'}>
              <div className='drw-lbl'>Company</div>
              <Input  placeholder='Amount'/>
              <div className='drw-lbl'>Amount</div>
              <Input  placeholder='Amount'/>
              <div className='drw-lbl'>Status</div>
              <Select defaultValue={'Completed'} style={{ width: '100%' }}>
                <Option value="Completed">Completed</Option>
                <Option value="Pending">Pending</Option>
              </Select>
              <div className='drw-submit-btn'>
                <Button type="primary"> Submit</Button>
              </div>
             
            </Drawer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
