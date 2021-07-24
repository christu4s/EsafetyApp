import { Row, Col, Card , Button , Modal , Upload, message , Input , Form, Checkbox } from 'antd';
import React, { useState } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined,  CloudUploadOutlined , ArrowLeftOutlined   } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { useHistory } from "react-router-dom";

// import './index.css';
export const PlanRiskBreakDown = () => {
    let history = useHistory();
    const { Dragger } = Upload;
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

  
        const onFinish = (values) => {
          console.log('Success:', values);
          history.push('/risk-assessment/edit-plan');
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

      

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log(info.fileList );
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

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
                            <div className='area--header'>
                                <p>Risk Assessment
</p>
                                <h2>
Plant Risk Breakdown</h2>
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
                            <h2>Pie Chart</h2>
                            <div className='bg-white-box form-holder-risk'>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua.
                                </p>
                                
                                <Form
                                name="basic"
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                >
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
                                    <Input  placeholder="Type Value" />
                                </Form.Item>

                                <Form.Item
                                    label="Percentage"
                                    name="Percentage"
                                
                                >
                                    <Input   placeholder="Type Percentage"  />
                                </Form.Item>



                                <Form.Item
                                 wrapperCol={{
                                    offset: 4,
                                    span: 20,
                                    }}
                                >
                                <Button type="default"  block icon={<PlusCircleOutlined />}>
                                    Add more 
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