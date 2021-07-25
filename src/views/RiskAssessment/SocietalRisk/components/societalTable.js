import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form , Row, Col} from 'antd';
import { PlusCircleOutlined,  CloudUploadOutlined , ArrowLeftOutlined   } from '@ant-design/icons';
import '../index.css';
export const SocietalTable =() =>{
    return (
        <div className='box--facility bg-white-box societal-risk-table  manning--box--facility' >
           

            <Row gutter={24}>
                
                    <Col span={6}>
                    <h5>Individual Risk Level</h5>
                </Col>
                    <Col span={4}>
                    <h5>
                        Level 1
                        <span> (eg: Factories)</span>
                    </h5>
                </Col>
                    <Col span={4}>
                    <h5>
                        Level 2
                        <span> (eg: Houses)</span>
                    </h5>
                </Col>
                <Col span={4}>
                    <h5>
                        Level 3
                        <span> (eg: School/Elderly)</span>
                    </h5>
                </Col>
                <Col span={5}>
                <h5>
                        Level 4
                        <span> (eg: Football grounds/ Larte hospitals)</span>
                    </h5>
                </Col>
            </Row>
         

            <hr/>

            <Row gutter={24}>
               
                    <Col span={6}>
                    <Input placeholder="Greater than 1 x 10-5 per year" />
                    
                </Col>
                    <Col span={4}>
                    <Input placeholder="Tolerable
" />
                </Col>
                    <Col span={4}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
                <Col span={4}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
                <Col span={5}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
            </Row>
            <hr/>
            <Row gutter={24}>
                
            <Col span={6}>
                    <Input placeholder="Greater than 1 x 10-5 per year" />
                    
                </Col>
                    <Col span={4}>
                    <Input placeholder="Tolerable
" />
                </Col>
                    <Col span={4}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
                <Col span={4}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
                <Col span={5}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
            </Row>
            <hr/>

            <Row gutter={24}>
                
            <Col span={6}>
                    <Input placeholder="Greater than 1 x 10-5 per year" />
                    
                </Col>
                    <Col span={4}>
                    <Input placeholder="Tolerable
" />
                </Col>
                    <Col span={4}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
                <Col span={4}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
                <Col span={5}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
            </Row>
            <hr/>

            <Row gutter={24}>
                
            <Col span={6}>
                    <Input placeholder="Greater than 1 x 10-5 per year" />
                    
                </Col>
                    <Col span={4}>
                    <Input placeholder="Tolerable
" />
                </Col>
                    <Col span={4}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
                <Col span={4}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
                <Col span={5}>
                    <Input placeholder="Not Tolerable
" />
                </Col>
            </Row>

            <Row>
                <Col span={24} style={{}}>
                <Button type="default" style={{textAlign:'right',paddingRight:45 , marginTop:10}} block icon={<PlusCircleOutlined />}>
                                            Add more 
                                </Button>
                </Col>
            </Row>

        </div>
    )
}


