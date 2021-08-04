import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';

import image from '../../../assets/06107-f-28-fig-3@3x.png';

import arrow from '../../../assets/left-arrow@3x.png';

import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, InboxOutlined, CloudUploadOutlined , ArrowLeftOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';

export const ResponseTiers = () => {
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [levels, setLevels] = useState([]);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const props = {};

    function addmore(){
        setLevels([...levels,{}]);
    }

    return (
        <div className='facility--wrapper'>

                <a href="/#/emergency-response" style={{color:'#282828'}}>
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
                            <div className='area--header' style={{marginTop:15}}>

                                <h2>Emergency Response Tiers</h2>
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
                        <div className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
                            <Row gutter={20}>
                                <Col span={5}>
                                    <h3>Emergency Response Tier</h3>
                                </Col>
                                <Col span={6} push={4}>
                                    <h3>Definition</h3>
                                </Col>
                                <Col span={6} push={6}>
                                    <h3>Team Activation</h3>
                                </Col>
                            </Row>
                            <hr />
                            {levels.map((level,index)=> <>
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <h5>Level {index+1}</h5>
                                    </Col>
                                    <Col span={9}>
                                        <Input placeholder="1" />
                                    </Col>
                                    <Col span={9}>
                                        <Input placeholder="10" />
                                    </Col>
                                </Row>
                                <hr />
                            </>)}
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

                </Col>
              

            </Row>


        </div>
    );
}