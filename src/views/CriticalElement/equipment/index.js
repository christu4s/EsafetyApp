import { Row, Col, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';
import alert from '../../../assets/alert@3x.png';
import image from '../../../assets/image.png';
import arrow from '../../../assets/left-arrow@3x.png';
import { PlusCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import fire from '../../../assets/fire-1@3x.png';
import warning from '../../../assets/triangular-warning-sign@3x.png';
import { Timeline } from 'antd';
export * from './prevention';


export const CriticalEquipment = () => {
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
            <a href="/#/safety-critical" style={{color:'#282828'}}>
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
                                <img width='28' src={alert} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header' style={{marginTop:5}}>
                                <p>Risk Assessment</p>
                                <h2>Safety Critical Equipment</h2>
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

                    <Row style={{marginTop:30}}>
                        <Timeline>
                            <Timeline.Item>
                                <div className='timeline--box timeline--box--withimage'>
                                    <p> <img width="37" src ={warning}/> Hazards</p>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                            <div className='timeline--box timeline-bg-blue'>
                                    <p>  Prevention</p>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                            <div className='timeline--box timeline-bg-blue'>
                                    <p>Detection</p>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                            <div className='timeline--box timeline-bg-blue '>
                                    <p>Control</p>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                            <div className='timeline--box timeline-bg-blue '>
                                    <p>Mitigation</p>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                            <div className='timeline--box timeline-bg-blue '>
                                    <p>Emergency Response</p>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                            <div className='timeline--box timeline-bg-blue '>
                                    <p>Incident</p>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                                <div className='timeline--box timeline--box--withimage'>
                                    <p> <img width="37" src ={fire}/> Hazards</p>
                                </div>
                            </Timeline.Item>
                        </Timeline></Row>
                </Col>

            </Row>


        </div>
    );
}