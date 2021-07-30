import { Row, Col, Button , Popconfirm, Input, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import ajax from '../../../../ajax';
import area from '../../../../assets/area.png';
import {  FacilitiesButtons } from '../../components';

export const FacilityAreaDetails = ({history, match}) => {
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState({title:'', desc:'', image: ''});


    useEffect(()=> { ajax.get('/facility-overview/area/'+ match.params.id ).then(res => res && setData(res) ); },[]);
    
    function deleteArea(){
        ajax.delete('/facility-overview/area/'+ match.params.id ).then( ()=> history.goBack() );
    }

    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={16}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={area} />
                            </div>
                        </Col>
                        <Col span={22}>
                        
                            <div className='area--header' >
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        <p>Facilities Overview</p>
                                        <h2 >{data.title}</h2>
                                    </div>
                                    <div>
                                        {!editMode ? <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Edit</Button> : 
                                        <Space>
                                            <Button type="primary" size="small" danger onClick={()=> setEditMode(!editMode) }>Cancel</Button>
                                            <Button type="primary" size="small" success onClick={()=> setEditMode(!editMode) }>Save</Button>
                                        </Space>}
                                    </div>
                                </div>
                               {editMode && <Popconfirm title="Are you sure to delete this?" onConfirm={deleteArea}>
                                   <a style={{color:'red', float: 'right'}}>Delete</a>
                                   </Popconfirm>
                                   }
                            </div>
                            
                        </Col>
                    </Row>

                    <Row>
                        <Col span={23}>
                            <div className='box--facility area--box--facility'>
                                <p>
                                {editMode ? <Input.TextArea defaultValue={data.desc} /> : <p>{data.desc}</p>}
                        </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} push={2}  style={{marginTop:35}} ><FacilitiesButtons /></Col>
            </Row>


        </div>
    );
}