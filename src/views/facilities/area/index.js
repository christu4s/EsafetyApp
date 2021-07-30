import { Row, Col, Card , Button , Modal , Upload, message , Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import { PlusCircleOutlined,  CloudUploadOutlined   } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import {  FacilitiesButtons } from '../components';
import ajax from '../../../ajax';
import { Link } from 'react-router-dom';

export * from './details';

export const FacilityArea = ({history}) => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLeading] = useState(true);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };

    // console.log(p);
    

    useEffect(()=> { 
        ajax.get('/facility-overview/area').then(res =>{ 
            res && setData(res.data); 
            setLeading(false);
        }); 
    },[]);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const props = {
        // showUploadList: false,
        beforeUpload: ()=> false,
    };

    function submit(){
        var {title, image} = form.getFieldsValue();
        ajax.post('/facility-overview/area', {title, image: image ? image.file: null}).then(res=> {
            res && history.push('/facility-overview/area/' + res.id); 
        });
    }


    const { Meta } = Card;
    
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

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
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <p>Facilities Overview</p>
                                <h2 >Area</h2>
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
                            {data.map((v,i)=><Col key={i} span={8}>
                                <Link to={"/facility-overview/area/"+ v.id} >
                                    <Card className='custom--card' hoverable style={{ width: 200 }} cover={<img alt="example" src={v.image ? v.image[0].src : image } />}>
                                        <Meta title={v.title} />
                                    </Card>
                                </Link>
                            </Col> )}                   
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
                <Col span={8} push={2}  style={{marginTop:35}} ><FacilitiesButtons /></Col>
            </Row>


        </div>
    );
}