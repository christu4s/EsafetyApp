import { Row, Col, Card, Upload, message, Button, Space, Input } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import alert from '../../assets/alert@3x.png';
import imageEquipment from '../../assets/critical-element-equipment.png';
import imagePersonnel from '../../assets/critical-element-personnel.png';
import imageProcedure from '../../assets/critical-element-procedure.png';

export const CriticalElement = () => {

    const { Meta } = Card;
    const [editMode, setEditMode] = useState(false);
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    const subpages = [
        {title: 'Equipment', url: '/safety-critical/equipment', image: imageEquipment},
        {title: 'Personnel', url: '/safety-critical/personnel', image: imagePersonnel},
        {title: 'Procedure', url: '/safety-critical/procedure', image: imageProcedure},
    ]

    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={16}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={alert} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header '>
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <h2>Safety Critical Elements</h2>
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

                    <Row>
                        {subpages.map((sub, i) => <Col key={i} span={8}>
                            <Link to={sub.url}>
                                <Card className='custom--card' hoverable style={{ width: 200 }} cover={<img alt="example" src={sub.image} />}>
                                    <Meta title={sub.title} />
                                </Card>
                            </Link>
                        </Col>)}
                    </Row>


                </Col>
                {/* <Col span={8} push={2} style={{ marginTop: 35 }} ><FacilitiesButtons /></Col> */}
            </Row>


        </div>
    );
}