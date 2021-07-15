import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';
import area from '../../assets/area.png';
import image from '../../assets/image.png';
import group from '../../assets/group@3x.png';
import process from '../../assets/process@3x.png';
import fire from '../../assets/fire@3x.png';
import { PlusCircleOutlined, InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import computing from '../../assets/cloud-computing@3x.png';
export const AccidentsHazard = () => {
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
                                <img width='38' src={fire} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header mt-5'>
                                <h2 style={{ marginTop: 25 }}>Major Accidents Hazards</h2>
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

                {/* <Col span={8} push={2}  style={{marginTop:35}} >
                    <Row>
                        {boxContentIcon.map((v, i) => <Col key={i} className='box--col' span={24}>
                            <BoxFacilities {...v} />
                        </Col>)}
                    </Row>
                </Col> */}

            </Row>


        </div>
    );
}