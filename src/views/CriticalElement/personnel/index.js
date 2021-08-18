import { Row, Col, Card, Button, Input, Space, Form, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import alert from '../../../assets/alert@3x.png';

import { PlusCircleOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import ajax from '../../../ajax';

import './index.css';
import { PageTemplate } from './../../template';

export const CriticalPersonnel = () => {
    return <PageTemplate
        iconUrl={alert}
        title="Safty Critical Element"
        subtitle="Safty Critical Personnel"
        api="/critical_personnel"
        descName="personnel_desc"
        imageName="personnel_image"
        pdfName="personnel_pdf"
    >{(content,editMode, form)=> <TablePersonel content={content} editMode={editMode} form={form}/>}
    </PageTemplate>
}

function TablePersonel({ content, editMode, form }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            var res = JSON.parse(content.personnel_data.replace(/\\/g, ''));
            setData(res);
        } catch (e) { }
    }, [content.personnel_data]);

    useEffect(() => { form.setFieldsValue({ personnel_data: JSON.stringify(data) }) }, [data]);


    function removeLevel(index) {
        data.splice(index, 1);
        setData([...data]);
    }

    function onLevelChange(index, key, value) {
        data[index][key] = value;
        setData([...data]);
    }
    function addmore() { setData([...data, {}]); }

    return <div>
        <Form.Item hidden name="personnel_data"><Input /></Form.Item>
        <div className="divider" style={{ marginBottom: 10 }}></div>
        {data.map((level, index) => <div className='box--facility area--box--facility el-personnel'>
            <Row>
                <Col span={12}>
                    <div className=''>
                        {/* <img width='80' src={ellipse} /> */}
                        <Form.Item label='Name :'>
                            <Input placeholder='Enter Name' readOnly={!editMode} value={level.name} onChange={e => onLevelChange(index, 'name', e.target.value)} />
                        </Form.Item>
                        <Form.Item label='Position:'>
                            <Input placeholder='Enter Position' readOnly={!editMode} value={level.position} onChange={e => onLevelChange(index, 'position', e.target.value)} />
                        </Form.Item>
                    </div>
                </Col>
                <Col offset={1} span={11}>
                    <div className=''>

                        <Form.Item label='Contact :' >
                            <Input placeholder='Enter Contact' readOnly={!editMode} value={level.contact} onChange={e => onLevelChange(index, 'contact', e.target.value)} />
                        </Form.Item>


                        <Form.Item label='Email :' >
                            <Input placeholder='Enter Vaild Email' readOnly={!editMode} value={level.email} onChange={e => onLevelChange(index, 'email', e.target.value)} />
                        </Form.Item>
                    </div>

                </Col>
            </Row>
            <Form.Item label='Remark :' >
                <Input.TextArea readOnly={!editMode} value={level.remark} onChange={e => onLevelChange(index, 'remark', e.target.value)} />
            </Form.Item>
            {editMode && <Popconfirm title="Are you sure to delete this?" onConfirm={() => removeLevel(index)}>
                <Button danger>Delete</Button>
            </Popconfirm>
            }
        </div>)}
        {editMode && <div className='addmore--button'>
            <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
                Add More
            </Button>
        </div>}
    </div>
}

// export const CriticalPersonnel = () => {
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ personnel_desc: '' });
//     const [personnel_data, setLevels] = useState([]);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         ajax.get('/critical_personnel').then(res => res && setData(res));
//     }, []);


//     function setData(res) {
//         setContent(res);
//         try {
//             var lvl = JSON.parse(res.personnel_data.replace(/\\/g, ''));
//             setLevels(lvl);
//         } catch (e) { }
//     }

//     async function saveData() {
//         var { personnel_desc = '' } = form.getFieldsValue();
//         await ajax.post('/critical_personnel', {
//             personnel_desc: personnel_desc ? personnel_desc : null,
//             personnel_data: JSON.stringify(personnel_data)
//         }).then(res => res && setData(res));
//         setEditMode(!editMode);
//     }
//     const { Meta } = Card;

//     function addmore() { setLevels([...personnel_data, {}]); }
//     function removeLevel(index) {
//         personnel_data.splice(index, 1);
//         setLevels([...personnel_data]);
//     }

//     function onLevelChange(index, key, value) {
//         personnel_data[index][key] = value;
//         setLevels([...personnel_data]);
//     }

//     return (

//         <div className='facility--wrapper'>
//             <a href="/#/safety-critical" style={{ color: '#282828' }}>
//                 <Row>
//                     <Col span={1}>
//                         <div className=''>
//                             <ArrowLeftOutlined />
//                         </div>
//                     </Col>
//                     <Col span={23}>
//                         <div className=''>
//                             <p>Back
//                             </p>
//                         </div>
//                     </Col>
//                 </Row>
//             </a>
//             <Row>

//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='38' src={alert} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header mt-5'>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2 style={{ marginTop: 25 }}>Safety Critical Personnel</h2>
//                                     </div>

//                                     <div>
//                                         {!editMode ? <Button type="primary" size="small" onClick={() => setEditMode(!editMode)}>Edit</Button> :
//                                             <Space>
//                                                 <Button type="primary" size="small" danger onClick={() => setEditMode(!editMode)}>Cancel</Button>
//                                                 <Button type="primary" size="small" success onClick={saveData}>Save</Button>
//                                             </Space>}
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={23}>
//                             <Form form={form}>
//                                 <div className='box--facility area--box--facility'>
//                                     <p>{editMode ? <Form.Item name="personnel_desc"><Input.TextArea defaultValue={content.personnel_desc} /></Form.Item>
//                                         : <p>{content.personnel_desc}</p>}</p>
//                                 </div>
//                             </Form>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={23}>
//                             <div className="divider"></div>
//                         </Col>
//                     </Row>
//                     {personnel_data.map((level, index) => <div className='box--facility area--box--facility el-personnel'>
//                         <Row>
//                             <Col span={12}>
//                                 <div className=''>
//                                     {/* <img width='80' src={ellipse} /> */}
//                                     <Form.Item label='Name :'>
//                                         <Input placeholder='Enter Name' readOnly={!editMode} value={level.name} onChange={e => onLevelChange(index, 'name', e.target.value)} />
//                                     </Form.Item>
//                                     <Form.Item label='Position:'>
//                                         <Input placeholder='Enter Position' readOnly={!editMode} value={level.position} onChange={e => onLevelChange(index, 'position', e.target.value)} />
//                                     </Form.Item>
//                                 </div>
//                             </Col>
//                                 <Col offset={1} span={11}>
//                                 <div className=''>

//                                     <Form.Item label='Contact :' >
//                                         <Input placeholder='Enter Contact' readOnly={!editMode} value={level.contact} onChange={e => onLevelChange(index, 'contact', e.target.value)} />
//                                     </Form.Item>


//                                     <Form.Item label='Email :' >
//                                         <Input placeholder='Enter Vaild Email' readOnly={!editMode} value={level.email} onChange={e => onLevelChange(index, 'email', e.target.value)} />
//                                     </Form.Item>
//                                 </div>

//                             </Col>
//                         </Row> 
//                         <Form.Item label='Remark :' >
//                             <Input.TextArea readOnly={!editMode} value={level.remark} onChange={e => onLevelChange(index, 'remark', e.target.value)} />
//                         </Form.Item>
//                         {editMode &&<Popconfirm title="Are you sure to delete this?" onConfirm={() => removeLevel(index)}>
//                                         <Button danger>Delete</Button>
//                                     </Popconfirm>
//                                 }
//                         </div>)}

//                     {editMode &&
//                         <Row className='addmore--button'>
//                             <Col>
//                                 <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
//                                     Add More
//                                 </Button>
//                             </Col>
//                         </Row>
//                     }
//                 </Col>

//             </Row>


//         </div>
//     );
// }