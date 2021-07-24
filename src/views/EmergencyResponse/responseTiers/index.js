import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';

import image from '../../../assets/06107-f-28-fig-3@3x.png';

import arrow from '../../../assets/left-arrow@3x.png';

import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';

export const ResponseTiers = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
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


    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={1}>
                    <div className='area--img'>
                        <a href="/#/emergency-response">
                            <img width='38' src={arrow} />
                        </a>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={extinguisher} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header'>

                                <h2>Emergency Response Tiers</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23}>
                            <div className='box--facility area--box--facility'>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                            </div>
                        </Col>
                    </Row>
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
                    <Row>
                        <Col span={12}>
                            <h2>File uploaded</h2>
                        </Col>
                        <Col span={12}>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <img width='100%' src={image} />
                        </Col>
                    </Row>
                </Col>
                <Row>
                    <Col span={23}>
                        <div className='box--facility area--box--facility manning--box--facility'>
                            <Row>
                                <Col span={4}>
                                    <h3>Emergency Response Tier</h3>
                                </Col>
                                <Col span={6} push={6}>
                                    <h3>Definition</h3>
                                </Col>
                                <Col span={6} push={6}>
                                    <h3>Team Activation</h3>
                                </Col>
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
                                        <Button type="secondary" icon={<PlusCircleOutlined />} onClick={showModal}>
                                            Add More
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

            </Row>


        </div>
    );
}