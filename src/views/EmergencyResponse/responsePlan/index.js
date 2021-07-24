import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';

import image from '../../../assets/screen-shot@3x.png';

import arrow from '../../../assets/left-arrow@3x.png';

import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';

export const ResponsePlan = () => {
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

                                <h2>Emergency Response Plan</h2>
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


                </Col>


            </Row>


        </div>
    );
}