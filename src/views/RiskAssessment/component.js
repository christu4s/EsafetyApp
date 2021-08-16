import { Row, Col, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import danger from '../../assets/danger-sing@3x.png';
import ajax from '../../ajax';
import { ButtonUpload, DescField, EditButtons, FileViewer } from '../../utils';

export const HazardPage = ({title, api, descName ='desc', imageName = 'image'}) => {
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({});
    const [form] = Form.useForm();
    const desc = content[descName], image = content[imageName]; 

    async function saveData() {
        var values = form.getFieldsValue();
        if(values[imageName]) values[imageName] = values[imageName].file;
        await ajax.post(api, values).then(res => res && setContent(res));
        setEditMode(!editMode);
    }

    useEffect(() => {
        ajax.get(api).then(res => res && setContent(res));
    }, []);
    
    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={17}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={danger} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header mt-5' >
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div>
                                <p className='mb-0 '>Risk Assessment</p>
                                <h2 style={{ marginTop: 0 }}>{ title || 'Hazard Identification Worksheets'}</h2>
                                </div>
                                <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Form form={form}>
                        <div className='box--facility area--box--facility'>
                            <DescField editMode={editMode} value={desc} name={descName} />
                        </div>
                        {editMode && <ButtonUpload name={imageName} onSubmit={saveData} />}
                    </Form>
                    <h2>File uploaded</h2>
                    <FileViewer images={image} />
                </Col>
            </Row>
        </div>
    );
}