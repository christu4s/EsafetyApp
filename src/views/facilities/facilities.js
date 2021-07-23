import { Row, Col, Modal, Button, Upload, message, Input, Space } from 'antd';
import React, { useState } from 'react';
import { FacilitiesButtons } from './components';
import { CloudUploadOutlined  } from '@ant-design/icons';

import area from '../../assets/area.png';
import process from '../../assets/process@3x.png';
import group from '../../assets/group@3x.png';
import computing from '../../assets/cloud-computing@3x.png';
import image from '../../assets/image.png';


export const Facilities = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log(info.fileList );
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const boxContent = [
        { title: 'Area', img: area, active: true },
        { title: 'Process', img: process, active: false },
        { title: 'Manning', img: group, active: false }
    ]

    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={16}>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <h2>Facilities Overview</h2>
                        <div>
                            {!editMode ? <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Edit</Button> : 
                            <Space>
                                <Button type="primary" size="small" danger onClick={()=> setEditMode(!editMode) }>Cancel</Button>
                                <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Save</Button>
                            </Space>}
                        </div>
                    </div>
                    <div className='box--facility'>
                        {editMode ? <Input.TextArea defaultValue={content} /> : <p>{content}</p>}
                    </div>
                    {editMode && 
                        <Row>
                            <Col span={6}>
                                <Button type="primary" icon={<CloudUploadOutlined />} onClick={showModal}>
                                    Upload Image
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
                                    <Button type="primary" icon={<CloudUploadOutlined />}>
                                            Upload Image
                                    </Button>
                                </Modal>
                            </Col>
                            <Col span={12}>
                                <h4>File size not more than 2 MB</h4>
                            </Col>
                        </Row>
                    }

                    <Row>
                        <Col span={12}>
                            <h2>File uploaded</h2>
                        </Col>
                        <Col span={12}>
                      
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <img width='100%' src= {image} />
                        </Col>
                    </Row>



                </Col>
                <Col span={8} push={2}  style={{marginTop:35}} >
                    <Row>
                        <FacilitiesButtons />
                    </Row>
                </Col>
            </Row>
        </div>
    );
}