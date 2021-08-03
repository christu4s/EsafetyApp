import { Row, Col, Card, Button, Modal, Upload, message, Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';

import trimage from '../../assets/ft-cb-crs-img@3x.png';

import { DownloadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';
import './index.css';
import ajax from '../../ajax';
export const SafetyManagement = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ safety_management_desc: '' });
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    //const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    useEffect(() => {
        ajax.get('/safety_management').then(res => res && setContent(res));
        ajax.get('/safety_manage_commit').then(res => res && setData(res.data));

    }, []);
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
    async function saveData() {
        var values = form.getFieldsValue();
        await ajax.post('/safety_management', values).then(res => res && setContent(res));
        setEditMode(!editMode);
    }
    const { Meta } = Card;

    return (
        <div className='facility--wrapper management--wrapper'>
            <Row>
                <Col span={16}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img' >
                                <img width='28' src={extinguisher} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header '>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h2>Safety Management System</h2>
                                    </div>

                                    <div>
                                        {!editMode ? <Button type="primary" size="small" onClick={() => setEditMode(!editMode)}>Edit</Button> :
                                            <Space>
                                                <Button type="primary" size="small" danger onClick={() => setEditMode(!editMode)}>Cancel</Button>
                                                <Button type="primary" size="small" onClick={saveData}>Save</Button>
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
                                    <Form form={form}>
                                        {editMode ? <Form.Item name="safety_management_desc"><Input.TextArea defaultValue={content.safety_management_desc} /></Form.Item> : <p>{content.safety_management_desc}</p>}
                                    </Form>
                                    {/* {editMode ? <Input.TextArea defaultValue={content} /> : <p>{content}</p>} */}
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={23}>
                            <div className='divider' style={{ marginBottom: 20 }}></div>
                        </Col>
                    </Row>

                    <Row>
                        <Col><h2 style={{ marginTop: 0, paddingTop: 0, fontSize: 18 }}>Management Commitment</h2>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        {data.map((v, i) => <Col key={i} span={12}>
                            <div className="blue--box">
                                <h3>
                                    {/* Safety Policy */}
                                    <Meta title={v.title} />
                                </h3>
                                <p>
                                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. */}
                                    <Meta title={v.desc} />
                                </p>

                                <Button type='default' icon={<DownloadOutlined />}>Download Button</Button>

                            </div>
                        </Col>)}



                    </Row>
                </Col>

            </Row>


        </div>
    );
}