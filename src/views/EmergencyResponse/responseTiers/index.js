import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input, Form, Space } from 'antd';
import React, { useState, useEffect } from 'react';

import image from '../../../assets/06107-f-28-fig-3@3x.png';

import arrow from '../../../assets/left-arrow@3x.png';

import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, InboxOutlined, CloudUploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import ajax from '../../../ajax';
export const ResponseTiers = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ tiers_desc: '', tiers_image: '' });
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    //const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    useEffect(() => {
        ajax.get('/emergency_response_tiers').then(res => res && setContent(res));
        ajax.get('/response_tiers_add').then(res => res && setData(res.data));
    }, []);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleAddOk = () => {
        setIsAddModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleAddCancel = () => {
        setIsAddModalVisible(false);
    };
    const props = {
        beforeUpload: () => false,
    };
    async function saveData() {
        var { tiers_desc, tiers_image } = form.getFieldsValue();
        await ajax.post('/emergency_response_tiers', { tiers_desc: tiers_desc ? tiers_desc : null, tiers_image: tiers_image ? tiers_image.file : null }).then(res => res && setContent(res));
        setEditMode(!editMode);
    }
    function submit() {
        var { title, desc, team_activation } = form.getFieldsValue();
        ajax.post('/response_tiers_add', { title: title ? title : null, desc: desc ? desc : null, team_activation: team_activation ? team_activation : null }).then(res => {
            res && setData(res.data);
        });
    }
    const { Meta } = Card;


    return (
        <div className='facility--wrapper'>

            <a href="/#/emergency-response" style={{ color: '#282828' }}>
                <Row>
                    <Col span={1}>
                        <div className=''>
                            <ArrowLeftOutlined />
                        </div>
                    </Col>
                    <Col span={23}>
                        <div className=''>
                            <p>Back
                            </p>
                        </div>
                    </Col>
                </Row>
            </a>


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
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h2 style={{ marginTop: 25 }}>Emergency Response Tiers</h2>
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
                                        {editMode ? <Form.Item name="tiers_desc"><Input.TextArea defaultValue={content.tiers_desc} /></Form.Item> : <p>{content.tiers_desc}</p>}
                                    </Form>
                                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. */}
                                </p>
                            </div>
                        </Col>
                    </Row>
                    {editMode &&
                        <Row>
                            <Col span={6}>
                                <Button type="primary" icon={<CloudUploadOutlined />} onClick={showModal}>
                                    Upload Image
                                </Button>
                                <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                    <h3 className='modal--title text-center'>Upload Files</h3>
                                    <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
                                    <Form form={form}>
                                        <Form.Item name="tiers_image">
                                            <Dragger {...props}>
                                                <p className="ant-upload-drag-icon">
                                                    <img width='50' src={computing} />
                                                </p>
                                                <p className="ant-upload-hint">
                                                    Drag or drop your files here OR <span> browse </span>
                                                </p>
                                            </Dragger>
                                        </Form.Item>
                                        {/* <div className='area--form'>
                                        <label>Name of File</label>
                                        <Form.Item name="title">
                                            <Input />
                                        </Form.Item>
                                    </div> */}
                                    </Form>

                                    <Button type="primary" onClick={saveData}>Upload Image</Button>
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
                            <img width='100%' src={content.tiers_image ? content.tiers_image[0].src : image} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <div className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
                                <Row gutter={20}>
                                    <Col span={5}>
                                        <h3>Emergency Response Tier</h3>
                                    </Col>
                                    <Col span={6} push={4}>
                                        <h3>Definition</h3>
                                    </Col>
                                    <Col span={6} push={6}>
                                        <h3>Team Activation</h3>
                                    </Col>
                                </Row>
                                <hr />


                                <Row gutter={16}>
                                    <Col span={6}>
                                        <h5>Level 1</h5>
                                    </Col>
                                    <Col span={9}>
                                        <Input placeholder="1" />

                                    </Col>
                                    <Col span={9}>
                                        <Input placeholder="10" />
                                    </Col>

                                </Row>

                                <hr />

                                <Row gutter={16}>
                                    <Col span={6}>
                                        <h5>Level 2</h5>
                                    </Col>
                                    <Col span={9}>
                                        <Input placeholder="1" />

                                    </Col>
                                    <Col span={9}>
                                        <Input placeholder="10" />
                                    </Col>

                                </Row>
                                <hr />
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <h5>Level 3</h5>
                                    </Col>
                                    <Col span={9}>
                                        <Input placeholder="1" />

                                    </Col>
                                    <Col span={9}>
                                        <Input placeholder="10" />
                                    </Col>
                                    <Row className='addmore--button'>
                                        <Col>
                                            <Button type="default" icon={<PlusCircleOutlined />} onClick={showAddModal}>
                                                Add More
                                            </Button>

                                            <Modal title="" className='upload--modal' visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
                                                <Form form={form}>
                                                    <div className='area--form'>
                                                        <label>Name of Level</label>
                                                        <Form.Item name="title">
                                                            <Input />
                                                        </Form.Item>
                                                        <label>Definition</label>
                                                        <Form.Item name="desc">
                                                            <Input />
                                                        </Form.Item>
                                                        <label>Team Activation</label>
                                                        <Form.Item name="team_activation">
                                                            <Input />
                                                        </Form.Item>
                                                    </div>
                                                </Form>

                                                <Button type="primary" onClick={submit}>Add file</Button>
                                            </Modal>
                                        </Col>
                                    </Row>
                                </Row>
                                <hr />
                            </div>
                        </Col>
                    </Row>

                </Col>


            </Row>


        </div>
    );
}