import { Row, Col, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';
import alert from '../../../assets/alert@3x.png';
import ellipse from '../../../assets/ellipse@3x.png';
import arrow from '../../../assets/left-arrow@3x.png';

import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';


export const CriticalPersonnel = () => {
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
                        <a href="/#/safety-critical">
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
                                <img width='38' src={alert} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header'>
                                <p>Safety Critical Element</p>
                                <h2>Safety Critical Personnel</h2>
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
                        <Col span={23}>
                            <div className='box--facility area--box--facility'>
                                <p>
                                    <div className=''>
                                        <img width='80' src={ellipse} />

                                    </div>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    {/* <Row>
                        {Array(3).fill(0).map((v, i) => <Col key={i} span={8}>
                            <Card className='custom--card' hoverable style={{ width: 200 }} cover={<img alt="example" src={image} />}>
                                <Meta title="Europe Street beat" />
                            </Card>
                        </Col>)}
                    </Row> */}

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
                </Col>

            </Row>


        </div>
    );
}