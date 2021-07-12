import React from 'react';
import { Card, Table, Typography } from "antd";
import { Row, Col } from 'antd';


export const BoxFacilities = ({ title, img, active }) => {
    return (
        <div className='box--holder'>
            <Row>
                <Col span={8}>
                    <div className='box--icon box--holder--active'>
                        <img src={img} width="50" height="50" />
                    </div>
                </Col>
                <Col span={11}>
                    <h4>{title}</h4>
                </Col>
            </Row>
        </div>
    )
}