import { Row, Col, Radio , Card , Button , Modal , Upload, message , Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import group from '../../../assets/group@3x.png';
import process from '../../../assets/process@3x.png';
import { PlusCircleOutlined, InboxOutlined , CloudUploadOutlined   } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { BoxFacilities, FacilitiesButtons } from '../components';
import ajax from '../../../ajax';

export const FacilityProcess = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    //const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    const [content, setContent] = useState({ process_desc: '', process_image: '' });
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    
    useEffect(() => {
        ajax.get('/facilities_process').then(res => res && setContent(res));
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
        await ajax.post('/facilities_process', values).then(res => res && setContent(res));
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
                <Col span={16}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={process} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header'>
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <p>Facilities Overview</p>
                                <h2>Process</h2>
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
                                        {editMode ? <Form.Item name="process_desc"><Input.TextArea defaultValue={content.process_desc} /></Form.Item> : <p>{content.process_desc}</p>}
                                    </Form>
                                </p>
                            </div>
                            {editMode && 
                        <Row>
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
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span={12}>
                            <h2>File uploaded</h2>
                        </Col>
                        <Col span={12}>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <img width='100%' src= {image} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8} push={2}  style={{marginTop:35}} ><FacilitiesButtons /></Col>

            </Row>


        </div>
    );
}