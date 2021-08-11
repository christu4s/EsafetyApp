import { Row, Col, Card, Button, Modal, Upload, message, Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import alert from '../../../assets/alert@3x.png';
import image from '../../../assets/image.png';
import arrow from '../../../assets/left-arrow@3x.png';
import { PlusCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import fire from '../../../assets/fire-1@3x.png';
import warning from '../../../assets/triangular-warning-sign@3x.png';
import { Timeline } from 'antd';
import { Link } from 'react-router-dom';
import ajax from '../../../ajax';

export const CriticalEquipment = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ equipment_desc: '' });
    const [form] = Form.useForm();

    useEffect(() => {
        ajax.get('/criticalEquipment').then(res => res && setContent(res));
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

    async function saveData() {
        var values = form.getFieldsValue();
        await ajax.post('/criticalEquipment', values).then(res => res && setContent(res));
        setEditMode(!editMode);
    }

    const { Meta } = Card;
    const innerPages = [
        { title: 'Prevention', url: '/safety-critical/equipment/prevention' },
        { title: 'Detection', url: '/safety-critical/equipment/detection' },
        { title: 'Control', url: '/safety-critical/equipment/control' },
        { title: 'Mitigation', url: '/safety-critical/equipment/mitigation' },
        { title: 'Emergency Response', url: '/safety-critical/equipment/emergencyResponse' },
        { title: 'Incident', url: '/safety-critical/equipment/incident' },
    ]
    return (
        <div className='facility--wrapper'>
            <Link to={'/safety-critical'} style={{ color: '#282828' }}>
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
            </Link>

            <Row>

                <Col span={16}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='28' src={alert} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header' >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <p>Safety Critical Element</p>
                                        <h2 >Safety Critical Equipment</h2>
                                    </div>
                                    <div>
                                        {!editMode ? <Button type="primary" size="small" onClick={() => setEditMode(!editMode)}>Edit</Button> :
                                            <Space>
                                                <Button type="primary" size="small" danger onClick={() => setEditMode(!editMode)}>Cancel</Button>
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
                                        {editMode ? <Form.Item name="equipment_desc"><Input.TextArea defaultValue={content.equipment_desc} /></Form.Item> : <p>{content.equipment_desc}</p>}
                                    </Form>
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 30 }}>
                        <Timeline>
                            <Timeline.Item>
                                <div className='timeline--box timeline--box--withimage'>
                                    <p> <img width="37" src={warning} /> Hazards</p>
                                </div>
                            </Timeline.Item>
                            {innerPages.map((page, i) => <Timeline.Item>

                                <div className='timeline--box timeline-bg-blue'>
                                    <Link to={page.url}>
                                        <p style={{color:'#fff'}}> {page.title}</p>
                                    </Link>
                                </div>
                            </Timeline.Item>)}
                            <Timeline.Item>
                                <div className='timeline--box timeline--box--withimage'>
                                    <p> <img width="37" src={fire} /> Hazards</p>
                                </div>
                            </Timeline.Item>
                        </Timeline></Row>
                </Col>

            </Row>


        </div >
    );
}