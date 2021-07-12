import { Row, Col, Radio , Card , Button , Modal , Upload, message , Input } from 'antd';
import React, { useState } from 'react';
import area from '../../../assets/area.png';
import group from '../../../assets/group@3x.png';
import image from '../../../assets/image.png';
import { PlusCircleOutlined, InboxOutlined , CloudUploadOutlined   } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { BoxFacilities } from '../components';
export const FacilityManning = () => {
    const boxContent = [
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
                            <img width='38' src={group} />
                        </div>
                    </Col>
                    <Col span={23}>
                        <div className='area--header'>
                            <p>Facilities Overview</p>
                            <h2>Manning</h2>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={23}>
                        <div className='box--facility area--box--facility manning--box--facility'>
                           <Row>
                               <Col span={4}>
                                    <h3>Hours Spent Per Day</h3>
                               </Col>
                               <Col span={8} push={2}>
                                    <h3>Worker Group</h3>
                               </Col>
                           </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                </Col>
                                 <Col span={6}>
                                 <h5>Manager</h5>
                                    
                                </Col>
                                 <Col span={6}>
                                 <h5>Operator</h5>
                                </Col>
                                 <Col span={6}>
                                    <h5>Admin</h5>
                                </Col>
                            </Row>

                        

                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Number of Personnel</h5>
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
                                    <h5>Seperator Area</h5>
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
                                    <h5>Compressor Area</h5>
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
                                    <h5>Living Quaters</h5>
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
                                    <h5>Total</h5>
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
                    </Col>
                </Row>

               

            </Col>

            <Col span={8} >
                    <Row>
                        {boxContent.map((v, i) => <Col key={i} className='box--col' span={24}>
                            <BoxFacilities {...v} />
                        </Col>)}
                    </Row>
                </Col>

        </Row>


    </div>
    );
}