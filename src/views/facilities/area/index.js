import { Row, Col, Card, Button, Modal, Upload, message, Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import { PlusCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../components';
import ajax from '../../../ajax';
import { Link } from 'react-router-dom';
import { CardHolder, DescField, EditButtons } from '../../../utils';

export * from './details';

export const FacilityArea = ({ history }) => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({description: ''});
    const [data, setData] = useState([]);
    const [loading, setLeading] = useState(true);
    const [form] = Form.useForm();
    const [formContent] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };

    // console.log(p);


    useEffect(() => {
        ajax.get('/facility_overview').then(res => res && setContent(res));
        ajax.get('/facility-overview/area').then(res => {
            res && setData(res.data);
            setLeading(false);
        });
    }, []);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const props = {
        beforeUpload: () => false,
    };

    function submit() {
        var { title, image } = form.getFieldsValue();
        ajax.post('/facility-overview/area', { title, image: image ? image.file : null }).then(res => {
            res && history.push('/facility-overview/area/' + res.id);
        });
    }
    function saveAreaDesc(){
        ajax.post('/facility_overview', formContent.getFieldsValue()).then(res =>{ 
            res && setContent(res);
            setEditMode(false);
        });
    }

    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={16}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={area} />
                            </div>
                        </Col>
                        <Col span={22}>
                            <div className='area--header' >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <p>Facilities Overview</p>
                                        <h2 >Area</h2>
                                    </div>

                                    <div>
                                     <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveAreaDesc} /></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={23}>
                            <div className='box--facility area--box--facility'>
                                <Form form={formContent}>
                                    <DescField editMode={editMode} value={content.area_desc} name="area_desc" />
                                </Form>
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

                    {loading ? <div>loading....</div> :
                        <Row>
                            {data.map((v, i) => <Col key={i} span={8}>
                                <CardHolder image={v.image.length ? v.image[0].src : image} title={v.title} url={"/facility-overview/area/" + v.id} />
                            </Col>)}
                        </Row>
                    }

                    <Row className='addmore--button'>
                        <Col>
                            <Button type="secondary" icon={<PlusCircleOutlined />} onClick={showModal}>
                                Add More
                            </Button>

                            <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <h3 className='modal--title text-center'>Upload Files</h3>
                                <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
                                <Form form={form}>
                                    <Form.Item name="image">
                                        <Dragger {...props}>
                                            <p className="ant-upload-drag-icon">
                                                <img width='50' src={computing} />
                                            </p>
                                            <p className="ant-upload-hint">
                                                Drag or drop your files here OR <span> browse </span>
                                            </p>
                                        </Dragger>
                                    </Form.Item>
                                    <div className='area--form'>
                                        <label>Name of Area</label>
                                        <Form.Item name="title">
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </Form>

                                <Button type="primary" onClick={submit}>Create</Button>
                            </Modal>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} push={2} style={{ marginTop: 35 }} ><FacilitiesButtons /></Col>
            </Row>


        </div>
    );
}