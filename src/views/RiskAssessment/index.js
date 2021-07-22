import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';
import area from '../../assets/area.png';
import image from '../../assets/image.png';
import group from '../../assets/group@3x.png';
import process from '../../assets/process@3x.png';
import fire from '../../assets/fire@3x.png';
import alert from '../../assets/alert@3x.png';
import danger from '../../assets/danger-sing@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';
export const RiskAssessment = () => {
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
    const { Meta } = Card;

    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={17}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={danger} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header mt-5'>
                                <h2 style={{ marginTop: 15 }}>Risk Assessment</h2>
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

                <Col span={23}>
                <Row>
                        {Array(12).fill(0).map((v,i)=><Col key={i} span={6}>
                      
                        <Card className='custom--card custom--card--risk' hoverable style={{ width: 230 }} cover={<img alt="example" src={image} />}>
                            <div className='card-content-risk'>
                                Hazard Identification Worksheets
                            </div>
                            <div className='card-actions-button'>
                            <Button type="primary" size='small'>
                                Edit 
                                </Button>
                                <Button type="danger"  size='small'>
                                    Delete
                                    </Button>
                            </div>
                        </Card>
                        </Col> )}                   
                    </Row>
                </Col>
                
            </Row>


        </div>
    );
}