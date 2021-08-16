import { Row, Col, Input, Space, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import fire from '../../../assets/fire@3x.png';
import { PlusCircleOutlined } from '@ant-design/icons';
import ajax from '../../../ajax';
import { ButtonUpload, DescField, EditButtons, FileViewer } from '../../../utils';


export const AccidentsHazardItem = ({match}) => {
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({ mah_desc: '', mah_image: '' });
    const [form] = Form.useForm();
    const {id}= match.params;
    
    useEffect(() => {
        ajax.get('/major_accident_hazards_item/'+ id).then(res => res && setContent(res));
    }, []);

    async function saveData() {
        var {desc, image} = form.getFieldsValue();
        await ajax.post('/major_accident_hazards_item/'+ id, {desc, image: image ? image.file : null}).then(res =>{ 
            res && setContent(res);
            setEditMode(!editMode);
        });
    }

    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={16}>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Space align="start">
                                <div className='area--img'>
                                    <img width='38' src={fire} />
                                </div>
                                <div>
                                    <p style={{marginBottom:0}}>Major Accident Hazards</p>
                                    <h2>{content.title}</h2>
                                </div>   
                            </Space>
                        </div>
                        <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
                    </div>
                    <Form form={form}>
                        <div className='box--facility'>
                            <DescField editMode={editMode} value={content.desc} name="desc" />
                        </div>
                        {editMode && <ButtonUpload name='image' onSubmit={saveData} />}
                    </Form>
                    <h2>File uploaded</h2>
                    <FileViewer images={content.image} />
                </Col>
                <Col span={6} offset={1}  style={{marginTop:80}} >
                    <div className='accident--box bg--white'>
                        <div className='accident--box--content'>
                            <h4>Prevention</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>
                        <div className='accident--box--content'>
                            <h4>Detection</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        <div className='accident--box--content'>
                            <h4>Control</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        <div className='accident--box--content'>
                            <h4>Mitigation</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>

                        <div className='accident--box--content'>
                            <h4>Emergency Response</h4>
                            <div className='accident--icon--box'>
                            <PlusCircleOutlined /> <span>Add SCE</span>
                            </div>
                            <div className='accident--icon--input'>
                                <div className='form-group'>
                                    <Input type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

            </Row>


        </div>
    );
}