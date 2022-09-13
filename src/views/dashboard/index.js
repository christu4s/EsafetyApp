import React from 'react';
import { Row, Col } from 'antd';
import shieldImage from '../../assets/shield.png';
import Background from '../../assets/patteren.png';
import fire from '../../assets/fire@3x.png';
import blueprint from '../../assets/blueprint@3x.png';
import danger from '../../assets/danger-sing@3x.png';
import extinguisher from '../../assets/fire-extinguisher@3x.png';

import writting from '../../assets/writing@3x.png';
import planning from '../../assets/planning@3x.png';
import checked from '../../assets/checked@3x.png';
import alert from '../../assets/alert@3x.png';


import './dashboard.css';
import { BoxHolder } from '../../utils';

export const Dashboard = () =>{
    var sectionStyle = {
        backgroundImage: `url(${Background})`
    };

    const boxContent = [
        {title: 'Facilities Overview new', img: blueprint, active:true, url: '/facility-overview' },
        {title: 'Major Accident Hazards', img: fire, active:false,url: '/accidents-hazards' },
        {title: 'Risk Assessment Test', img: danger,  active:false, url: '/risk-assessment' },
        {title: 'Safety Critical Element ', img: extinguisher,  active:false, url: '/safety-critical'},
        {title: 'Emergency Response ', img: alert,  active:false, url: '/emergency-response'},
        {title: 'Safety Management System ', img: checked,  active:false, url: '/safety-management'},
        {title: 'Remedial Action Plan ', img: planning,  active:false, url: '/remedial-action'},
        {title: 'Written Safety Case ', img: writting,  active:false, url: '/writen-safety'},
    ] 

    return(
        <div className='dashboard--holder'>
            <Row>
                <Col span={10} >
                    <div className='bg--patteren' style={sectionStyle}>
                        <img width="320" src={shieldImage}/>
                    </div>
                </Col>
                <Col span={14}>
                    <Row>
                        {boxContent.map((v,i)=> <Col key={i} className='box--col' span={12}>
                            <BoxHolder {...v}/>
                            </Col>)}
                    </Row>
                </Col>
            </Row>,

        </div>
    );
}