import { Row, Col, Card , Button , Modal , Upload, message , Input , Form, Checkbox, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined,  CloudUploadOutlined , ArrowLeftOutlined   } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { useHistory } from "react-router-dom";
import ajax from '../../../ajax';
import './index.css';

export const IndividualRisk = () => {
    let history = useHistory();
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ individual_desc: '', individual_image: '' });
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    
    useEffect(() => {
        ajax.get('/individual_risk').then(res => res && setContent(res));
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

  
        const onFinish = (values) => {
          console.log('Success:', values);
          history.push('/risk-assessment/individual-edit-user');
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

      
        const props = {
            beforeUpload: () => false,
        };
        async function saveData() {
            var values = form.getFieldsValue();
            await ajax.post('/individual_risk', values).then(res => res && setContent(res));
            setEditMode(!editMode);
        }

    const { Meta } = Card;
    
    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={16}>

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

                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={danger} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header' >
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <p>Risk Assessment</p>
                                <h2>Individual Risk</h2>
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
                                {editMode ? <Form.Item name="individual_desc"><Input.TextArea defaultValue={content.individual_desc} /></Form.Item> : <p>{content.individual_desc}</p>}
                                </p>
                            </div>
                        </Col>
                    </Row>

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

                    <Row>
                        <Col span={24}>
                            <div className='divider'></div>
                        </Col>
                    </Row>




                    <Row>
                        <Col span={24}>
                            <h2>Graph</h2>
                            <div className='bg-white-box form-holder-risk'>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua.
                                </p>
                                
                                <Form
                                name="basic"
                                labelCol={{
                                    span: 2,
                                }}
                                wrapperCol={{
                                    span: 22,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                >
                                <Form.Item
                                    label="User"
                                    name="User"
                                    
                                 
                                >
                                    <Input  placeholder="Type User" />
                                </Form.Item>

                                <Form.Item
                                    label="Risk"
                                    name="Risk"
                                
                                >
                                    <Input  placeholder="Type Risk" />
                                </Form.Item>

                                <Form.Item
                                    label="Value"
                                    name="Value"
                                
                                >
                                    <Input   placeholder="Type Value"  />
                                </Form.Item>



                                <Form.Item
                                 wrapperCol={{
                                    offset: 2,
                                    span: 20,
                                    }}
                                >
                                <Button type="default"  block icon={<PlusCircleOutlined />}>
                                    Add more user
                                </Button>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                    offset: 20,
                                    span: 4,
                                    }}
                                >
                                    <Button  type="primary" htmlType="submit">
                                        Proceed
                                    </Button>
                                </Form.Item>
                                </Form>

                            </div>
                        </Col>
                        
                    </Row>

                </Col>
            </Row>


        </div>
    );
}