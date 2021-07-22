import React from 'react';
import { Row, Col } from 'antd';

import area from '../../assets/area.png';
import process from '../../assets/process@3x.png';
import group from '../../assets/group@3x.png';
import { BoxHolder } from '../../utils';


export const FacilitiesButtons = () => {
    const boxContent = [
        { title: 'Safety Critical Equipment', img: area, active: true },
        { title: 'Safety Critical Personnel', img: process, active: false },
        { title: 'Safety Critical Procedure', img: group, active: false }
    ];

    return <Row>{boxContent.map((v, i) => <Col key={i} className='box--col' span={24}><BoxHolder {...v} /></Col>)}</Row>;
}