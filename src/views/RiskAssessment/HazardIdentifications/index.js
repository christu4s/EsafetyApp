import { Row, Col, Button, Space, Input } from 'antd';
import React, { useState } from 'react';
import danger from '../../../assets/danger-sing@3x.png';
import pdf from '../../../assets/pdf-1@3x.png';
import { DownloadOutlined } from '@ant-design/icons';

export const HazardOperatability = () => <HazardIdentifications title="Hazard Operability Worksheets" />
export const HazardAnalysis = () => <HazardIdentifications title="Escape, Evacuation, Rescue Analysis" />
export const HazardEmergency = () => <HazardIdentifications title="Emergency System Survivability Analysis" />

export const HazardIdentifications = ({title}) => {

    const [editMode, setEditMode] = useState(false);
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    
    // Create new plugin instance
    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={17}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={danger} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header mt-5' >
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <p className='mb-0 '>Risk Assessment</p>
                                <h2 style={{ marginTop: 0 }}>{ title || 'Hazard Identification Worksheets'}</h2>
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
                </Col>
                <Col span={23}>
                    <div className='box--facility pdf-view-section area--box--facility'>
                        <Row>
                            <Col span={20}>
                                <h2 style={{ marginTop: 15 }}><img width='30' src={pdf} /> <span> Pdf File Name</span></h2>
                            </Col>
                            <Col span={2} >
                                <Button type="primary" icon={<DownloadOutlined />} >
                                    Download
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div>
                                    <iframe src="https://arxiv.org/pdf/quant-ph/0410100.pdf" width="100%" height="700" frameBorder="0" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
}