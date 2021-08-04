import { Row, Col, Card, Button, Space, Input, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import image from '../../assets/image.png';
import danger from '../../assets/danger-sing@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';
import ajax from '../../ajax';


export const RiskAssessment = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ mah_desc: '', mah_image: '' });
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    
    useEffect(() => {
        ajax.get('/risk_assessment').then(res => res && setContent(res));
    }, []);
    
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
        beforeUpload: () => false,
    };
    async function saveData() {
        var values = form.getFieldsValue();
        await ajax.post('/risk-assessment', values).then(res => res && setContent(res));
        setEditMode(!editMode);
    }

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
                                <Button type="primary" size="small" success onClick={saveData}>Save</Button>
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
                                    {editMode ? <Form.Item name="risk_desc"><Input.TextArea defaultValue={content.risk_desc} /></Form.Item> : <p>{content.risk_desc}</p>}
                                </Form>
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