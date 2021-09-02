import { Row, Col, Card, Button, Upload, Input, Space, Form, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';

import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import "./index.css";
import ajax from '../../ajax';
import { PageTemplate } from './../template';
import { TitleEdit } from '../../utils';

export const RemedialAction = () => {
    return <PageTemplate
        iconUrl={extinguisher}
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Remedial Action Plan")}
        api="/remedial_action"
        descName="remedial_desc"
        imageName="remedial_image"
        pdfName="remedial_pdf"
    >{(content,editMode,form)=> <TableRemedial content={content} editMode={editMode} form={form} />}
    </PageTemplate>
}

function TableRemedial({ content, editMode, form }) {
    const [data, setData] = useState([]);

    useEffect(()=> {
        try { 
            var res = JSON.parse(content.remedial_table_data.replace(/\\/g, '')); 
            setData(res);
        } catch (e) { }
    }, [content.remedial_table_data]);
    
    useEffect(()=> { form.setFieldsValue({remedial_table_data: JSON.stringify(data)}) }, [data]);


    function removeLevel(index) {
        data.splice(index, 1);
        setData([...data]);
    }

    function onLevelChange(index, key, value) {
        data[index][key] = value;
        setData([...data]);
    }
    function addmore() { setData([...data, {}]); }

    // const input = <Form.Item hidden name="remedial_table_data"><Input value={JSON.stringify(data)} /></Form.Item>
    // console.log(input.type);
    return <div>
        <Form.Item hidden name="remedial_table_data"><Input /></Form.Item>
        <div className="divider" style={{ marginBottom: 10 }}></div>
        <h2>Table</h2>
        <div style={{ marginTop: 5 }} className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
            <Row>
                <Col span={1}>
                </Col>
                <Col span={4} push={1}>
                    <h5>Source</h5>
                </Col>
                <Col span={4} push={1}>
                    <h5>Action</h5>
                </Col>
                <Col span={4} push={5}>
                    <h5>Actionee</h5>
                </Col>
                <Col span={4} push={6}>
                    <h5>
                        Status
                        <span> (as of date of E-SC development)</span>
                    </h5>
                </Col>
            </Row>
            <hr />
            {data.map((tableData, index) => <>
                <Row key={index} gutter={40}>
                    <Col span={1}>
                        <h5>1</h5>
                    </Col>
                    <Col span={4}>
                        <Input  readOnly={!editMode} value={tableData.source} onChange={e => onLevelChange(index, 'source', e.target.value)} />
                    </Col>
                    <Col span={8}>
                        <Input readOnly={!editMode} value={tableData.action} onChange={e => onLevelChange(index, 'action', e.target.value)} />
                    </Col>
                    <Col span={4}>
                        <Input readOnly={!editMode} value={tableData.actionee} onChange={e => onLevelChange(index, 'actionee', e.target.value)} />
                    </Col>
                    <Col span={4}>
                        <Input readOnly={!editMode} value={tableData.status} onChange={e => onLevelChange(index, 'status', e.target.value)} />
                    </Col>
                    <Col span={2}>
                        {editMode &&
                            <Popconfirm title="Are you sure to delete this level?" onConfirm={() => removeLevel(index)}>
                                <Button type="link" icon={<DeleteOutlined danger="true" />} />
                            </Popconfirm>
                        }
                    </Col>
                </Row>
                <hr />
            </>)}
            </div>
            {editMode && <div className='addmore--button'>
                        <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
                            Add More
                        </Button>
                    </div>}
        </div>
}

// export const RemedialAction = () => {
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ remedial_desc: '' });
//     const [form] = Form.useForm();
//     const [remedial_table_data, setTableData] = useState([]);
//     useEffect(() => { ajax.get('/remedial_action').then(res => res && setData(res)); }, []);


//     function setData(res) {
//         setContent(res);
//         try {
//             var rtd = JSON.parse(res.remedial_table_data.replace(/\\/g, ''));
//             setTableData(rtd);
//         } catch (e) { }
//     }
//     async function saveData() {
//         var { remedial_desc = '' } = form.getFieldsValue();
//         await ajax.post('/remedial_action', {
//             remedial_desc: remedial_desc ? remedial_desc : null,
//             remedial_table_data: JSON.stringify(remedial_table_data)
//         }).then(res => res && setData(res));
//         setEditMode(!editMode);
//         // setIsModalVisible(false);
//     }
//     const { Meta } = Card;

//     function addmore() { setTableData([...remedial_table_data, {}]); }
//     function removeLevel(index) {
//         remedial_table_data.splice(index, 1);
//         setTableData([...remedial_table_data]);
//     }

//     function onLevelChange(index, key, value) {
//         remedial_table_data[index][key] = value;
//         setTableData([...remedial_table_data]);
//     }//const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='28' src={extinguisher} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header mt-5'>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2 style={{ marginTop: 25 }}>Remedial Action Plan</h2>
//                                     </div>

//                                     <div>
//                                         {!editMode ? <Button type="primary" size="small" onClick={() => setEditMode(!editMode)}>Edit</Button> :
//                                             <Space>
//                                                 <Button type="primary" size="small" danger onClick={() => setEditMode(!editMode)}>Cancel</Button>
//                                                 <Button type="primary" size="small" onClick={saveData}>Save</Button>
//                                             </Space>}
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>

//                     </Row>

//                     <Row>
//                         <Col span={23}>
//                             <div className='box--facility area--box--facility'>
//                                 <Form form={form}>
//                                     {editMode ? <Form.Item name="remedial_desc"><Input.TextArea defaultValue={content.remedial_desc} /></Form.Item> : <p>{content.remedial_desc}</p>}
//                                 </Form>
//                                 {/* <p>
//                                     {editMode ? <Input.TextArea defaultValue={content} /> : <p>{content}</p>}
//                                 </p> */}
//                             </div>
//                         </Col>
//                     </Row>



//                 </Col>
//             </Row>

//             <Row style={{ marginTop: 30 }}>
//                 <Col span={15}>
//                     <div className='divider'></div>
//                 </Col>
//             </Row>
//             <Row>

//                 <Col span={24}>
//                     <h2>Table</h2>
//                 </Col>
//                 <Col span={24}>
//                     <div style={{ marginTop: 5 }} className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
//                         <Row>
//                             <Col span={1}>

//                             </Col>
//                             <Col span={4} push={1}>
//                                 <h5>Source</h5>
//                             </Col>
//                             <Col span={4} push={1}>
//                                 <h5>Action</h5>
//                             </Col>
//                             <Col span={4} push={5}>
//                                 <h5>Actionee</h5>
//                             </Col>
//                             <Col span={4} push={6}>
//                                 <h5>
//                                     Status
//                                     <span> (as of date of E-SC development)</span>
//                                 </h5>
//                             </Col>
//                         </Row>
//                         <hr />
//                         {remedial_table_data.map((tableData, index) => <>
//                             <Row gutter={40}>
//                                 <Col span={1}>
//                                     <h5>1</h5>
//                                 </Col>
//                                 <Col span={4}>

//                                     <Input placeholder=" " readOnly={!editMode} value={tableData.source} onChange={e => onLevelChange(index, 'source', e.target.value)} />
//                                 </Col>
//                                 <Col span={8}>
//                                     <Input placeholder=" " readOnly={!editMode} value={tableData.action} onChange={e => onLevelChange(index, 'action', e.target.value)} />
//                                 </Col>
//                                 <Col span={4}>
//                                     <Input placeholder=" " readOnly={!editMode} value={tableData.actionee} onChange={e => onLevelChange(index, 'actionee', e.target.value)} />
//                                 </Col>
//                                 <Col span={4}>
//                                     <Input placeholder=" " readOnly={!editMode} value={tableData.status} onChange={e => onLevelChange(index, 'status', e.target.value)} />
//                                 </Col>
//                                 <Col span={2}>
//                                     {editMode &&
//                                         <Popconfirm title="Are you sure to delete this level?" onConfirm={() => removeLevel(index)}>
//                                             <Button type="link" icon={<DeleteOutlined danger />} />
//                                         </Popconfirm>
//                                     }
//                                 </Col>
//                             </Row>

//                             <hr />
//                         </>)}
//                         {editMode &&
//                             <Row className='addmore--button'>
//                                 <Col>
//                                     <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
//                                         Add More
//                                     </Button>
//                                 </Col>
//                             </Row>
//                         }


//                     </div>
//                 </Col>
//             </Row>



//         </div>
//     );
// }