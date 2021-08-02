import { Row, Col, Card, Button, Modal, Upload, message, Input, Space, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';
import download from '../../assets/direct-download@3x.png';

import ajax from '../../ajax';

import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';


export const WrittenSafetyCase = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState({safety_desc: '', safety_image: ''});
    const [tableData, setTableData] = useState([]);
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

    useEffect(()=>{
        ajax.get('/written_safety_case').then(res=> res && setData(res));
        ajax.get('/writen-safety').then(res=> res && setTableData(res.data));
    },[]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const props = {};
      
    const columns = [
        {title: 'File Name', dataIndex: 'title',},
        {
            title: '', dataIndex: 'safety_case', 
            render: (value,row, index)=> value && value[0] && <a href={value[0].src} download><img width='20' src={download} /></a> 
        },
    ];

    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={1}>
                    <div className='area--img'>
                        <img width='28' src={extinguisher} />
                    </div>
                </Col>
                <Col span={23}>
                    <div className='area--header mt-5'>
                        <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <div>
                        <h2 style={{ marginTop: 25 }}>Written Safety Case</h2>
                        </div>
                        
                        <div>
                    {!editMode ? <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Edit</Button> : 
                    <Space>
                        <Button type="primary" size="small" danger onClick={()=> setEditMode(!editMode) }>Cancel</Button>
                        <Button type="primary" size="small" success onClick={()=> setEditMode(!editMode) }>Save</Button>
                    </Space>}
                </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span={23}>
                    <div className='box--facility area--box--facility'>
                        <p>
                            {editMode ? <Input.TextArea defaultValue={data.safety_desc} /> : <p>{data.safety_desc}</p>}
                        </p>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <div className="divider" style={{ marginBottom: 10 }}></div>
                </Col>
            </Row>


            {editMode &&
                <Row className='addmore--button'>
                    <Col>
                        <Button type="primary" icon={<CloudUploadOutlined />} onClick={showModal}>
                            Upload File
                        </Button>

                        <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <h3 className='modal--title text-center'>Upload Files</h3>
                            <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <img width='50' src={computing} />
                                </p>

                                <p className="ant-upload-hint">
                                    Drag or drop your files here OR <span> browse </span>
                                </p>
                            </Dragger>,
                            <div className='area--form'>
                                <label>Name of File</label>
                                <Input placeholder="Lorem ipsum dolor sit amet" />
                            </div>

                            <Button type="primary" icon={<CloudUploadOutlined />}>
                                Upload File
                            </Button>
                        </Modal>
                    </Col>
                </Row>

            }
            <div class="">
                <Table dataSource={tableData} columns={columns} />
            </div>
        </div>
    );
}