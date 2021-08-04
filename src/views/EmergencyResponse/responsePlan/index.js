import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input, Steps, Form, Space } from 'antd';
import React, { useState, useEffect } from 'react';

import image from '../../../assets/screen-shot@3x.png';

import arrow from '../../../assets/left-arrow@3x.png';

import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, InboxOutlined, CloudUploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import ajax from '../../../ajax';
export const ResponsePlan = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ reponse_plan_desc: '', erp_flow_chat: '' });
    const [form] = Form.useForm();
    const [erp_flow_chat, setPlans] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        ajax.get('/response_plan').then(res => res && setContent(res));
    }, []);
    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };
    const props = { beforeUpload: () => false, };

    const { Meta } = Card;
    async function saveData() {
        var values = form.getFieldsValue();
        await ajax.post('/response_plan', values).then(res => res && setContent(res));
        setEditMode(!editMode);
    }
    function addmore() { setPlans([...erp_flow_chat, '']); }
    function editPlan(index, value) {
        erp_flow_chat[index] = value;
        setPlans([...erp_flow_chat]);
    }

    return (
        <div className='facility--wrapper'>
            <a href="/#/emergency-response" style={{ color: '#282828' }}>
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
                                <img width='28' src={extinguisher} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header mt-5'>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h2 style={{ marginTop: 25 }}>Emergency Response Plan</h2>
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
                                        {editMode ? <Form.Item name="reponse_plan_desc"><Input.TextArea defaultValue={content.reponse_plan_desc} /></Form.Item> : <p>{content.reponse_plan_desc}</p>}
                                    </Form>
                                </p>
                            </div>
                        </Col>
                    </Row>


                </Col>
            </Row>
            <Row>
                <Col span={30}>
                    <div className='box--facility area--box--facility manning--box--facility'>
                        <Steps progressDot direction="vertical">
                            {erp_flow_chat.map((plan, index) => <Steps.Step
                                title={plan}
                                description={editMode && <Input value={plan} onChange={e => editPlan(index, e.target.value)} />} />
                            )}
                        </Steps>
                        {/* <Row>
                            <Col span={30} >
                                <h3>Raise the Alarm</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                <Input placeholder="" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30} >
                                <h3>Muster at Muster Point</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                <Input placeholder="" />
                            </Col>

                        </Row>
                        <Row>
                            <Col span={30} >
                                <h3>Activate ERT</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30}>
                                <Input placeholder="" />
                            </Col>

                        </Row>
                        <Row>

                            <Col span={30} >
                                <h3>Decision to Abandon Ship</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={30} >
                                <Input placeholder="" />
                            </Col>
                        </Row> */}
                        <Row className='addmore--button'>
                            <Col>
                                <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
                                    Add More
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>




        </div >
    );
}