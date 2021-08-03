import { Row, Col, Card, Button, Modal, Upload, message, Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';
import download from '../../assets/direct-download@3x.png';


import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';
import ajax from '../../ajax';

export const WrittenSafetyCase = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ safety_desc: '', safety_file: '' });
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    //const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    useEffect(() => { ajax.get('/written_safety_case').then(res => res && setContent(res)); }, []);
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
        await ajax.post('/written_safety_case', values).then(res => res && setContent(res));
        setEditMode(!editMode);
    }

    const { Meta } = Card;
    // const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

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
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h2 style={{ marginTop: 25 }}>Written Safety Case</h2>
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
                                        {editMode ? <Form.Item name="safety_desc"><Input.TextArea defaultValue={content.safety_desc} /></Form.Item> : <p>{content.safety_desc}</p>}
                                    </Form>
                                    {/* {editMode ? <Input.TextArea defaultValue={content} /> : <p>{content}</p>} */}

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
                            <img width='100%' src={content.safety_file} />
                        </Col>
                    </Row>
                </Col>
                <Row>

                    <Col span={30}>
                        <div className='box--facility area--box--facility manning--box--facility'>
                            <Row>
                                <Col span={1}>

                                </Col>
                                <Col span={4} push={1}>
                                    <h3>File Name</h3>
                                </Col>
                                {/* <Col span={4} push={1}>
                                    <h3>Action</h3>
                                </Col>
                                <Col span={4} push={5}>
                                    <h3>Actionee</h3>
                                </Col>
                                <Col span={4} push={6}>
                                    <h3>Status </h3>
                                    <p>(as of date of E-SC development)</p>
                                </Col> */}
                            </Row>
                            <hr />
                            {/* <Row gutter={16}>
                                <Col span={6}>
                                </Col>
                                <Col span={6}>
                                    <h5>Manager</h5>
                                </Col>
                                <Col span={6}>
                                    <h5>Operator</h5>
                                </Col>
                                <Col span={6}>
                                    <h5>Admin</h5>
                                </Col>
                            </Row> */}


                            <Row gutter={40}>
                                <Col span={1}>
                                    <h5>1</h5>
                                </Col>
                                <Col span={16}>

                                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h5>

                                </Col>

                                <Col span={6}>
                                    <img width='38' src={download} />
                                </Col>

                            </Row>

                            <hr />

                            <Row gutter={40}>
                                <Col span={1}>
                                    <h5>2</h5>
                                </Col>
                                <Col span={16}>
                                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h5>

                                </Col>

                                <Col span={6}>
                                    <img width='38' src={download} />
                                </Col>

                            </Row>
                            <hr />
                            <Row gutter={40}>
                                <Col span={1}>
                                    <h5>3</h5>
                                </Col>
                                <Col span={16}>
                                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h5>

                                </Col>

                                <Col span={6}>
                                    <img width='38' src={download} />
                                </Col>

                            </Row>
                            <hr />
                        </div>
                    </Col>
                </Row>
            </Row>


        </div>
    );
}