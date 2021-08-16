import { Row, Col, Card, Button, Space, Input, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import image from '../../assets/image.png';

import individualImage from '../../assets/riskAssessment/individual.png';
import locationImage from '../../assets/riskAssessment/location.png';
import operatablityImage from '../../assets/riskAssessment/operatablity.png';
import plantImage from '../../assets/riskAssessment/plant.png';
import societalImage from '../../assets/riskAssessment/societal.png';
import emergencyImage from '../../assets/riskAssessment/emergency.png';
import escapeImage from '../../assets/riskAssessment/escape.png';
import identificationImage from '../../assets/riskAssessment/identification.png';


import danger from '../../assets/danger-sing@3x.png';

import ajax from '../../ajax';
import { CardHolder, DescField, EditButtons } from '../../utils';


export const RiskAssessment = () => {
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ risk_desc: '', risk_image: '' });
    const [form] = Form.useForm();
    
    useEffect(() => {
        ajax.get('/risk_assessment').then(res => res && setContent(res));
    }, []);
    
    async function saveData() {
        var values = form.getFieldsValue();
        await ajax.post('/risk-assessment', values).then(res => res && setContent(res));
        setEditMode(!editMode);
    }

    const subpages = [
        { title: 'Hazard Identification Worksheets',  url: '/risk-assessment/identification-worksheet', image: identificationImage },
        { title: 'Hazard and Operability Worksheets',  url: '/risk-assessment/operability-worksheet', image: operatablityImage },
        { title: 'Escape, Evacuation, Rescue Analysis',  url: '/risk-assessment/rescue-analysis', image: escapeImage },
        { title: 'Emergency System Survivability Analysis',  url: '/risk-assessment/survivability-analysis', image: emergencyImage },
        { title: 'Individual Risk',  url: '/risk-assessment/individual', image: individualImage },
        { title: 'Plant Risk Breakdown',  url: '/risk-assessment/plant', image: plantImage },
        { title: 'Location Risk',  url: '/risk-assessment/location', image: locationImage },
        { title: 'Societal Risk',  url: '/risk-assessment/societal', image: societalImage }
    ]

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
                            <div className='area--header mt-5'>
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <h2 style={{ marginTop: 25 }}>Risk Assessment</h2>
                                </div>
                                <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={23}>
                            <div className='box--facility area--box--facility'>
                                <p>
                                <Form form={form}>
                                    <DescField editMode={editMode} value={content.risk_desc} name="risk_desc" />
                                </Form>
                                </p>
                            </div>
                        </Col>
                    </Row>

                </Col>

                <Col span={23}>
                <Row>
                        {subpages.map((sub, i) => <Col key={i} span={6}><CardHolder {...sub} /></Col>)}              
                    </Row>
                </Col>
                
            </Row>


        </div>
    );
}