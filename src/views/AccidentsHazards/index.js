import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import area from '../../assets/area.png';
import image from '../../assets/image.png';
import group from '../../assets/group@3x.png';
import process from '../../assets/process@3x.png';
import fire from '../../assets/fire@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';
import ajax from '../../ajax';


export const AccidentsHazard = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ mah_desc: '', mah_image: '' });
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    
    useEffect(() => {
        ajax.get('/major_accident_hazards').then(res => res && setContent(res));
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
        await ajax.post('/major_accident_hazards', values).then(res => res && setContent(res));
        setEditMode(!editMode);
    }

    const { Meta } = Card;
    const boxContent = [
        { title: 'SEPERATOR AREA', img: image, active: true },
        { title: 'COMPRESSOR AREA', img: image, active: false },
        { title: 'LIVING QUATERS', img: image, active: false }
    ]
    const boxContentIcon = [
        { title: 'Area', img: area, active: true },
        { title: 'Process', img: process, active: false },
        { title: 'Manning', img: group, active: false }
    ]
    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={17}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={fire} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header mt-5'>
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <h2 style={{ marginTop: 25 }}>Major Accidents Hazards</h2>
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
                                    {editMode ? <Form.Item name="mah_desc"><Input.TextArea defaultValue={content.mah_desc} /></Form.Item> : <p>{content.mah_desc}</p>}
                                </Form>
                            </p>
                            </div>
                        </Col>
                    </Row>


                    {editMode && 
                    <Row className=''>
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
}
                    <Row>
                        <Col span={12}>
                            <h2>File uploaded</h2>
                        </Col>
                        <Col span={12}>

                        </Col>
                    </Row>

                    <Row>
                        <Col span={23}>
                            <img width='100%' src={image} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <h2 style={{ marginTop: 35 }}>Major Accidents Hazards</h2>
                        </Col>
                        <Col span={8}>
                            <Card className='custom--card'
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={image} />}
                            >
                                <Meta title="Europe Street beat" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className='custom--card'
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={image} />}
                            >
                                <Meta title="Europe Street beat" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className='custom--card'
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={image} />}
                            >
                                <Meta title="Europe Street beat" />
                            </Card>
                        </Col>
                    </Row>

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

                <Col span={7}   style={{marginTop:80}} >
                    <div className='accident--box bg--white'>
                        <div className='accident--box--content'>
                            <h4>Prevention</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        <div className='accident--box--content'>
                            <h4>Detection</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        <div className='accident--box--content'>
                            <h4>Control</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        <div className='accident--box--content'>
                            <h4>Mitigation</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        <div className='accident--box--content'>
                            <h4>Emergency Response</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        

                    </div>
                </Col>

            </Row>


        </div>
    );
}