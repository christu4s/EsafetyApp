import { Row, Col, Input } from 'antd';
import React from 'react';
import group from '../../../assets/group@3x.png';
import {  FacilitiesButtons } from '../components';
export const FacilityManning = () => {

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
            <Col span={8} style={{marginTop:60}}><FacilitiesButtons /></Col>
        </Row>
    </div>
    );
}