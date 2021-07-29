import { Row, Col, Card, Button, Modal, Upload, message, Input, Space } from 'antd';
import React, { useState } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';

import trimage from '../../assets/ft-cb-crs-img@3x.png';

import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';
import "./index.css";

export const RemedialAction = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    
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
                console.log(info.fileList);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const { Meta } = Card;
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={16}>
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
                                <h2 style={{ marginTop: 25 }}>Remedial Action Plan</h2>
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
                        <div>
                            {!editMode ? <Button type="primary" size="small" onClick={() => setEditMode(!editMode)}>Edit</Button> :
                                <Space>
                                    <Button type="primary" size="small" danger onClick={() => setEditMode(!editMode)}>Cancel</Button>
                                    <Button type="primary" size="small" success onClick={() => setEditMode(!editMode)}>Save</Button>
                                </Space>}
                        </div>
                    </Row>

                    <Row>
                        <Col span={23}>
                            <div className='box--facility area--box--facility'>
                                <p>
                                    {editMode ? <Input.TextArea defaultValue={content} /> : <p>{content}</p>}
                                </p>
                            </div>
                        </Col>
                    </Row>


                </Col>
            </Row>

            <Row style={{ marginTop: 30 }}>
                <Col span={15}>
                    <div className='divider'></div>
                </Col>
            </Row>

            <Row>

                <Col span={24}>
                    <h2>Table</h2>
                </Col>



                <Col span={24}>
                    <div style={{ marginTop: 5 }} className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
                        <Row>
                            <Col span={1}>

                            </Col>
                            <Col span={4} push={1}>
                                <h5>Source</h5>
                            </Col>
                            <Col span={4} push={1}>
                                <h5>Action</h5>
                            </Col>
                            <Col span={4} push={5}>
                                <h5>Actionee</h5>
                            </Col>
                            <Col span={4} push={6}>
                                <h5>
                                    Status
                                    <span> (as of date of E-SC development)</span>
                                </h5>
                            </Col>
                        </Row>
                        <hr />

                        <Row gutter={40}>
                            <Col span={1}>
                                <h5>1</h5>
                            </Col>
                            <Col span={4}>
                                <Input readOnly value="HAZIP" />

                            </Col>
                            <Col span={8}>
                                <Input placeholder="10" />
                            </Col>
                            <Col span={5}>
                                <Input placeholder="10" />
                            </Col>
                            <Col span={5}>
                                <Input readOnly value="OPEN" />
                            </Col>

                        </Row>

                        <hr />

                        <Row gutter={40}>
                            <Col span={1}>
                                <h5>2</h5>
                            </Col>
                            <Col span={4}>
                                <Input readOnly value="ESSA" />

                            </Col>
                            <Col span={8}>
                                <Input placeholder="10" />
                            </Col>
                            <Col span={5}>
                                <Input placeholder="10" />
                            </Col>
                            <Col span={5}>
                                <Input readOnly value="CLOSE" />
                            </Col>

                        </Row>
                        <hr />
                        <Row gutter={40}>
                            <Col span={1}>
                                <h5>3</h5>
                            </Col>
                            <Col span={4}>
                                <Input readOnly value="QRA" />

                            </Col>
                            <Col span={8}>
                                <Input placeholder="10" />
                            </Col>
                            <Col span={5}>
                                <Input placeholder="10" />
                            </Col>
                            <Col span={5}>
                                <Input placeholder="" />
                            </Col>

                        </Row>
                        <hr />
                    </div>
                </Col>
            </Row>



        </div>
    );
}