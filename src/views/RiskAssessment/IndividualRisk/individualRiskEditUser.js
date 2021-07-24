import { Row, Col, Card, Button, Modal, Upload, message, Input, Form, Checkbox, Select, Typography } from 'antd';
import React, { useState } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined, ArrowLeftOutlined  , CaretUpOutlined} from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { Collapse } from 'antd';


export const IndividualRiskEditUser = () => {
    const { Panel } = Collapse;

    function callback(key) {
        console.log(key);
    }
    const { Text, Link } = Typography;

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
                console.log(info.fileList);
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
                                <h2>Individual Risk</h2>
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
                            <img width='100%' src={image} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <div className='divider'></div>
                        </Col>
                    </Row>






                </Col>
            </Row>


            <Row gutter={24}>
                <Col span={17}>
                    <h2>Graph</h2>
                    <div className='bg-white-box form-holder-risk'>
                        <h3>Graph</h3>

                    </div>
                </Col>


                <Col span={7} style={{ marginTop: 50 }}>
                    <div className='bg-white-box form-sm-right-holder form-holder-risk'>

                        <Collapse defaultActiveKey={['1']} onChange={callback}
                        expandIcon={({ isActive }) => <CaretUpOutlined   rotate={isActive ?  0: 180} />}
                        >
                            <Panel header="Edit" key="1">

                                <Row >
                                    <Col span={24}>
                                        <Button type="default" block icon={<PlusCircleOutlined />}>
                                            Add new user
                                </Button>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="default" style={{ textAlign: 'right', color: "#000" }} block >
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form
                                            name="basic"
                                            labelCol={{
                                                span: 24,
                                            }}
                                            wrapperCol={{
                                                span: 24,
                                            }}
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                        >
                                            <Form.Item

                                                style={{ marginBottom: 10 }}

                                                label="User"
                                                name="User"


                                            >
                                                <Input placeholder="Admin" />
                                            </Form.Item>

                                            <Form.Item
                                                style={{ marginBottom: 2 }}
                                                label="Name of Risk"
                                                name="Risk"

                                            >
                                                <Input placeholder="Occupation Risk" />
                                            </Form.Item>


                                            <Form.Item
                                                style={{ paddingLeft: 2, marginBottom: 10 }}
                                                wrapperCol={{
                                                    offset: 0,
                                                    span: 24,
                                                }}
                                            >
                                                <Button type="default" block icon={<PlusCircleOutlined />}>
                                                    Add new risk
                                </Button>
                                            </Form.Item>

                                            <Form.Item label="" style={{ marginBottom: 10 }}>
                                                <Select placeholder='IRPA'>
                                                    <Select.Option value="demo">Demo</Select.Option>
                                                </Select>
                                            </Form.Item>

                                            <Row style={{ textAlign: 'right' }}>
                                                <Col span={16}>
                                                    <Link href="#" style={{ paddingTop: 3, display: 'inline-block' }}>
                                                        <Text type="danger">Delete</Text>
                                                    </Link>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item
                                                    >
                                                        <Button type="primary " htmlType="submit">
                                                            Save
                                        </Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24}>
                                                    <div className='divider divider-sm'></div>
                                                </Col>
                                            </Row>

                                            <Row style={{ paddingTop: 20 }}>
                                                <Col span={12} style={{ paddingTop: 5 }}>
                                                    <p style={{ marginBottom: 15 }}>Operator</p>
                                                </Col>
                                                <Col span={12} style={{ textAlign: 'right' }}>
                                                    <Link href="#" style={{ paddingTop: 3, display: 'inline-block' }}>
                                                        Edit
                                    </Link>
                                                </Col>

                                            </Row>

                                            <Row >
                                                <Col span={12} style={{ paddingTop: 5 }}>
                                                    <p style={{ marginBottom: 0 }}>Manager</p>
                                                </Col>
                                                <Col span={12} style={{ textAlign: 'right' }}>
                                                    <Link href="#" style={{ paddingTop: 3, display: 'inline-block' }}>
                                                        Edit
                                    </Link>
                                                </Col>

                                            </Row>

                                        </Form>
                                    </Col>
                                </Row>

                            </Panel>

                        </Collapse>,
                    </div>
                </Col>

            </Row>


        </div>
    );
}