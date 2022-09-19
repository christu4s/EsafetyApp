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
import { useMenuContext } from '../../provider';

export const Dashboard = () =>{
    const [menu] = useMenuContext();
    var sectionStyle = {
        backgroundImage: `url(${Background})`
    };

    function getTitleByApi(api, def = ''){
        return menu[api+ 'title'] || def;
    }

    const boxContent = [
        {title: getTitleByApi('/facility_overview', 'Facilities Overview'), img: blueprint, active:true, url: '/facility-overview' },
        {title: getTitleByApi('/major_accident_hazards', 'Major Accident Hazards'), img: fire, active:false,url: '/accidents-hazards' },
        {title: getTitleByApi('/risk_assessment', 'Risk Assessment'), img: danger,  active:false, url: '/risk-assessment' },
        {title: getTitleByApi('/safetyCriticalElement', 'Safety Critical Element'), img: extinguisher,  active:false, url: '/safety-critical'},
        {title: getTitleByApi('/emergency_respons', 'Emergency Response'), img: alert,  active:false, url: '/emergency-response'},
        {title: getTitleByApi('/safety_management', 'Safety Management System'), img: checked,  active:false, url: '/safety-management'},
        {title: getTitleByApi('/remedial_action', 'Remedial Action Plan'), img: planning,  active:false, url: '/remedial-action'},
        {title: getTitleByApi('/written_safety_case', 'Writen Safety Case'), img: writting,  active:false, url: '/writen-safety'},
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