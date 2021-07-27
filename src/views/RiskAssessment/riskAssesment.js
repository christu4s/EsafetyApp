import { Row, Col, Card, Button, Space, Input } from 'antd';
import React, { useState } from 'react';
import image from '../../assets/image.png';
import danger from '../../assets/danger-sing@3x.png';

export const RiskAssessment = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    
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
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <h2 style={{ marginTop: 25 }}>Risk Assessment</h2>
                                </div>
                                
                                <div>
                            {!editMode ? <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Edit</Button> : 
                            <Space>
                                <Button type="primary" size="small" danger onClick={()=> setEditMode(!editMode) }>Cancel</Button>
                                <Button type="primary" size="small" success onClick={()=> setEditMode(!editMode) }>Save</Button>
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
                                    {editMode ? <Input.TextArea defaultValue={content} /> : <p>{content}</p>}
                                </p>
                            </div>
                        </Col>
                    </Row>




                </Col>

                <Col span={23}>
                <Row>
                        {Array(8).fill(0).map((v,i)=><Col key={i} span={6}>
                      
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