import { Row, Col, Input, Space, Button } from 'antd';
import React, { useState } from 'react';
import group from '../../../assets/group@3x.png';
import {  FacilitiesButtons } from '../components';
export const FacilityManning = () => {

    const [editMode, setEditMode] = useState(false);
    const manager = '1';
    const operator = '10';
    const admin = '2';

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
                        <div className='area--header' >
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <p>Facilities Overview</p>
                                    <h2 >Manning</h2>
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
                                    {editMode ? <Input.TextArea defaultValue={manager} /> : <p>{manager}</p>}
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={operator} /> : <p>{operator}</p>}
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={admin} /> : <p>{admin}</p>}
                                </Col>
                            </Row>

                            <hr/>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Seperator Area</h5>
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={manager} /> : <p>{manager}</p>}
                                    
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={operator} /> : <p>{operator}</p>}
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={admin} /> : <p>{admin}</p>}
                                </Col>
                            </Row>
                            <hr/>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Compressor Area</h5>
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={manager} /> : <p>{manager}</p>}
                                    
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={operator} /> : <p>{operator}</p>}
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={admin} /> : <p>{admin}</p>}
                                </Col>
                            </Row>
                            <hr/>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Living Quaters</h5>
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={manager} /> : <p>{manager}</p>}
                                    
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={operator} /> : <p>{operator}</p>}
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={admin} /> : <p>{admin}</p>}
                                </Col>
                            </Row>
                            <hr/>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Total</h5>
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={manager} /> : <p>{manager}</p>}
                                    
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={operator} /> : <p>{operator}</p>}
                                </Col>
                                 <Col span={6}>
                                 {editMode ? <Input.TextArea defaultValue={admin} /> : <p>{admin}</p>}
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