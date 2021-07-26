import { Row, Col, Card , Button , Modal , Upload, message , Input , Form, Checkbox, Space } from 'antd';
import React, { useState } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined,  CloudUploadOutlined , ArrowLeftOutlined   } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { useHistory } from "react-router-dom";
import './index.css';
export const LocationRisk = () => {
    let history = useHistory();
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    
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
                            <div className='area--header' >
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <p>Risk Assessment</p>
                                <h2>Location Risk</h2>
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
                        <div className='box--facility form-holder-risk location-risk-box area--box--facility manning--box--facility'>
                           
                           <div className='location-bx-header'>
                           <Row>
                               <Col span={4}>
                                    <h3>Hazard</h3>
                               </Col>
                               <Col span={20} style={{textAlign:'center'}}>
                                    <h3>Location Specific Individual Risk (per year)
</h3>
                               </Col>
                           </Row>
                           </div>

                          <div className='location-box-body'>
                          <Row gutter={16}>
                                <Col span={6}>
                                </Col>
                                 <Col span={6}>
                                 <h5>Separator Area
</h5>
                                </Col>
                                 <Col span={6}>
                                 <h5>Compressor Area
</h5>
                                </Col>
                                 <Col span={6}>
                                    <h5>Living Quarters
</h5>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>
                                </Col>
                               
                            </Row>

                            <hr/>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Jet Fire
</h5>
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="1" />
                                    
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="10" />
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="2" />
                                </Col>
                            </Row>
                            <hr/>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Pool Fire
</h5>
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="1" />
                                    
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="10" />
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="2" />
                                </Col>
                            </Row>
                            <hr/>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Flash Fire
</h5>
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="1" />
                                    
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="10" />
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="2" />
                                </Col>
                            </Row>
                         

                            <Row gutter={16} style={{textAlign:'right'}}>
                               
                                 
                                 <Col span={6} push={18}>
                                 <Button type="default" style={{textAlign:'right',paddingRight:0}} block icon={<PlusCircleOutlined />}>
                                            Add more row
                                </Button>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5 className='text-primary'>Total</h5>
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="1" />
                                    
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="10" />
                                </Col>
                                 <Col span={6}>
                                 <Input placeholder="2" />
                                </Col>
                            </Row>
                          </div>

                        </div>
                        </Col>
                        
                    </Row>

                </Col>
            </Row>


        </div>
    );
}