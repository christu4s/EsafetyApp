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


import '../dashboard/dashboard.less';
import { BoxHolder } from './components';
export const Dashboard = () =>{
    var sectionStyle = {
        backgroundImage: `url(${Background})`
      };

       const boxContent = [
        {title: 'Facilities Overview', img: blueprint, active:true },
        {title: 'Major Accident Hazards', img: fire, active:false },
        {title: 'Risk Assessment', img: danger,  active:false },
        {title: 'Safety Critical Element ', img: extinguisher,  active:false},
        {title: 'Emergency Response ', img: alert,  active:false},
        {title: 'Safety Management System ', img: checked,  active:false},
        {title: 'Remedial Action Plan ', img: planning,  active:false},
        {title: 'Written Safety Case ', img: writting,  active:false},
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