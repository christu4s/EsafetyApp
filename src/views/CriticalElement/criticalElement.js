import { Row, Col, Card, Upload, message } from 'antd';
import React, { useState } from 'react';
import alert from '../../assets/alert@3x.png';
import image from '../../assets/downloadSEC@3x.png';

export const CriticalElement = () => {

    const { Meta } = Card;

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
                            <div className='area--header'>
                                <h2>Safety Critical Elements</h2>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={23}>
                            <div className='box--facility area--box--facility'>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {Array(3).fill(0).map((v, i) => <Col key={i} span={8}>
                            <Card className='custom--card' hoverable style={{ width: 200 }} cover={<img alt="example" src={image} />}>
                                <Meta title="Safety Critical Equipment" />
                            </Card>
                        </Col>)}
                    </Row>


                </Col>
                {/* <Col span={8} push={2} style={{ marginTop: 35 }} ><FacilitiesButtons /></Col> */}
            </Row>


        </div>
    );
}