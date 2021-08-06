import React from 'react';
import { Row, Col } from 'antd';

import area from '../../assets/area.png';
import process from '../../assets/process@3x.png';
import group from '../../assets/group@3x.png';
import { BoxHolder } from '../../utils';
import { useLocation } from 'react-router-dom';


export const FacilitiesButtons = ()=> {
    let {pathname} = useLocation();
    
    const boxContent = [
        { title: 'Area', img: area, url: '/facility-overview/area' },
        { title: 'Process', img: process, url: '/facility-overview/process'},
        { title: 'Manning', img: group, url: '/facility-overview/manning' }
    ];

    return <Row>{boxContent.map((v, i) => <Col key={i} className='box--col' span={24}><BoxHolder {...v} active={pathname==v.link} /></Col>)}</Row>;
}