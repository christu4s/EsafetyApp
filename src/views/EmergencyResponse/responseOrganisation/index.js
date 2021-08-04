import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input, Form, Space } from 'antd';
import React, { useState, useEffect } from 'react';

import image from '../../../assets/screen-shot@3x.png';

import arrow from '../../../assets/left-arrow@3x.png';

import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, InboxOutlined, CloudUploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import ajax from '../../../ajax';
export const ResponseOrganisation = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ organisation_desc: '', organisation_image: '' });
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    useEffect(() => {
        ajax.get('/emergency_response_organisation').then(res => res && setContent(res));
        //ajax.get('/response_tiers_add').then(res => res && setData(res.data));
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
        var { organisation_desc, organisation_image } = form.getFieldsValue();
        await ajax.post('/emergency_response_organisation', { organisation_desc: organisation_desc ? organisation_desc : null, organisation_image: organisation_image ? organisation_image.file : null }).then(res => res && setContent(res));
        setEditMode(!editMode);
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
                            {/* <div className='area--header' style={{ marginTop: 15 }}>

                                <h2></h2>
                            </div> */}
                            <div className='area--header mt-5'>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h2 style={{ marginTop: 25 }}>Emergency Response Organisation</h2>
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
                                        {editMode ? <Form.Item name="organisation_desc"><Input.TextArea defaultValue={content.organisation_desc} /></Form.Item> : <p>{content.organisation_desc}</p>}
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
                                        <Form.Item name="organisation_image">
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
                            <img width='100%' src={content.organisation_image ? content.organisation_image[0].src : image} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <div className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
                                <Row>
                                    {/* <Col span={4}>
                                    <h3>Emergency Response Tier</h3>
                                </Col> */}
                                    <Col span={12} >
                                        <h3>Team Member</h3>
                                    </Col>
                                    <Col span={12}>
                                        <h3>Roles and Responbilities</h3>
                                    </Col>
                                </Row>
                                <hr />
                                <Row gutter={16}>

                                    <Col span={12}>
                                        <Input placeholder="1" />

                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="10" />
                                    </Col>
                                </Row>
                                <hr />
                                <Row gutter={16}>

                                    <Col span={12}>
                                        <Input placeholder="1" />

                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="10" />
                                    </Col>
                                </Row>
                                <hr />
                                <Row gutter={16}>

                                    <Col span={12}>
                                        <Input placeholder="1" />
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="10" />
                                    </Col>
                                    <Row className='addmore--button'>
                                        <Col>
                                            <Button type="default" icon={<PlusCircleOutlined />} onClick={showAddModal}>
                                                Add More
                                            </Button>

                                            <Modal title="" className='upload--modal' visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
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
                                                    <label>Name of Area</label>
                                                    <Input placeholder="Lorem ipsum dolor sit amet" />
                                                </div>

                                                <Button type="primary" icon={<CloudUploadOutlined />}>
                                                    Upload Image
                                                </Button>
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