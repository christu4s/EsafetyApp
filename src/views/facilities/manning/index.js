import { Row, Col, Input, Space, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import group from '../../../assets/group@3x.png';
import {  FacilitiesButtons } from '../components';
import ajax from '../../../ajax';

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += parseInt(this[i][prop]) || 0;
    }
    return total
}

export const FacilityManning = () => {
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState([]);
    const fields = ['manager','operator','admin'];
    
    useEffect(() => {
        ajax.get('/facility-overview/area').then(res => {
            res && setData(res.data);
        });
    }, []);

    function updateField(index, field,value){
        data[index][field]=value;
        setData([...data]);
    }

    async function save(i = 0){
        if(!data[i]) return;
        const {id, manager = 0, operator = 0, admin = 0 } = data[i];
        return await ajax.post('/facility-overview/area/'+ id, {manager,operator,admin}).then(()=> save(i+1));
    }

    return (
        <div className='facility--wrapper'>
        <Row>
            <Col span={16}>
                
                <Row>
                    <Col span={1}>
                        <div className='area--img'>
                            <img width='38' src={group} />
                        </div>
                    </Col>
                    <Col span={23}>
                        <div className='area--header' >
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <p>Facilities Overview</p>
                                    <h2 >Manning</h2>
                                </div>
                                <div>
                            {!editMode ? <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Edit</Button> : 
                            <Space>
                                <Button type="primary" size="small" danger onClick={()=> setEditMode(!editMode) }>Cancel</Button>
                                <Button type="primary" size="small" success onClick={()=> save() }>Save</Button>
                            </Space>}
                        </div>
                                </div>
                            </div>
                    </Col>
                </Row>
                <div className='box--facility area--box--facility manning--box--facility'>
                           <Row>
                               <Col span={4}>
                                    <h3>Hours Spent Per Day</h3>
                               </Col>
                               <Col span={8} push={2}>
                                    <h3>Worker Group</h3>
                               </Col>
                           </Row>
                            <Row gutter={16}>
                                <Col span={6}>
                                </Col>
                                 <Col span={6}>
                                 <h5 style={{textAlign:'center'}}>Manager</h5>
                                </Col>
                                 <Col span={6}>
                                 <h5 style={{textAlign:'center'}}>Operator</h5>
                                </Col>
                                 <Col span={6}>
                                    <h5 style={{textAlign:'center'}}>Admin</h5>
                                </Col>
                            </Row>
                            {data.map((v,i)=> <>
                                <Row key={i} gutter={16}>
                                    <Col span={6}>
                                        <h5>{v.title}</h5>
                                    </Col>
                                    {fields.map((f,ind)=><Col key={f + ind} span={6}>
                                        {editMode ? <Input type="number" onChange={e=> updateField(i,f,e.target.value) } value={v[f]||0} /> : <p style={{textAlign:'center'}}>{v[f]||0}</p>}
                                    </Col>)}
                                </Row>
                            <hr/></>
                            )}
                            <Row gutter={16}>
                                <Col span={6}>
                                    <h5>Total</h5>
                                </Col>
                                {fields.map((f,ind)=><Col key={ind} span={6}><p style={{textAlign:'center'}} >{data.sum(f)}</p></Col>)}
                            </Row>
                        </div>
            </Col>
            <Col span={8} style={{marginTop:60}}><FacilitiesButtons /></Col>
        </Row>
    </div>
    );
}