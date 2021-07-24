import { Row, Col, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';

import trimage from '../../assets/ft-cb-crs-img@3x.png';

import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';


export const RemedialAction = () => {
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
                <Col span={16}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={extinguisher} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header'>
                                <h2>Remedial Action Plan</h2>
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
                    <hr />

                </Col>

                <Row>
                    <Row>
                        <Col>
                            <h2>Table</h2>                    </Col>
                    </Row>
                    <Col span={30}>
                        <div className='box--facility area--box--facility manning--box--facility'>
                            <Row>
                                <Col span={1}>

                                </Col>
                                <Col span={4} push={1}>
                                    <h3>Source</h3>
                                </Col>
                                <Col span={4} push={1}>
                                    <h3>Action</h3>
                                </Col>
                                <Col span={4} push={5}>
                                    <h3>Actionee</h3>
                                </Col>
                                <Col span={4} push={6}>
                                    <h3>Status </h3>
                                    <p>(as of date of E-SC development)</p>
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
            </Row>


        </div>
    );
}