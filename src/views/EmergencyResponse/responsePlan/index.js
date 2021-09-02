import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input, Steps, Form, Space, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';

import image from '../../../assets/screen-shot@3x.png';

import arrow from '../../../assets/left-arrow@3x.png';

import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import ajax from '../../../ajax';
import { Link } from 'react-router-dom';
import { PageTemplate } from './../../template';

export const ResponsePlan = () => {
    return <PageTemplate
        iconUrl={extinguisher}
        title="Emergency Response"
        subtitle="Emergency Response Plan"
        api="/response_plan"
        descName="reponse_plan_desc"
        imageName="reponse_plan_image"
        pdfName="reponse_plan_pdf"
    >{(content, editMode, form) => <TablePlan content={content} editMode={editMode} form={form} />}
    </PageTemplate>
}

function TablePlan({ content, editMode, form }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            var res = JSON.parse(content.erp_flow_chat.replace(/\\/g, ''));
            setData(res);
        } catch (e) { }
    }, [content.erp_flow_chat]);

    useEffect(() => { form.setFieldsValue({ erp_flow_chat: JSON.stringify(data) }) }, [data]);


    function removeLevel(index) {
        data.splice(index, 1);
        setData([...data]);
    }

    function addmore() { setData([...data, '']); }
    function editPlan(index, value) {
        data[index] = value;
        setData([...data]);
    }

    return <div className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
        <Form.Item hidden name="erp_flow_chat"><Input /></Form.Item>
        <Steps progressDot current={data.length} direction="vertical">
            {data.map((plan, index) => <Steps.Step
                title={<Space>{plan}
                    {editMode && <Popconfirm title="Are you sure to delete this?" onConfirm={() => removeLevel(index)}>
                        <Button type="link" icon={<DeleteOutlined danger />} />
                    </Popconfirm>}
                </Space>}
                description={editMode && <Input value={plan} onChange={e => editPlan(index, e.target.value)} />} />
            )}
        </Steps>
        {editMode &&
            <Row className='addmore--button'>
                <Col>
                    <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
                        Add More
                    </Button>
                </Col>
            </Row>
        }
    </div>
}

// export const ResponsePlan = () => {
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ reponse_plan_desc: '', erp_flow_chat: '' });
//     const [form] = Form.useForm();
//     const [erp_flow_chat, setPlans] = useState([]);

//     useEffect(() => {
//         ajax.get('/response_plan').then(res => res && setData(res));
//     }, []);

//     async function saveData() {
//         var { reponse_plan_desc = '' } = form.getFieldsValue();
//         await ajax.post('/response_plan', {
//             reponse_plan_desc: reponse_plan_desc ? reponse_plan_desc : null,
//             erp_flow_chat: JSON.stringify(erp_flow_chat)
//         }).then(res => { 
//             res && setData(res);
//             setEditMode(!editMode);
//         });
//     }
//     function setData(res) {
//         setContent(res);
//         try {
//             var tem = JSON.parse(res.erp_flow_chat.replace(/\\/g, ''));
//             setPlans(tem);
//         } catch (e) { }
//     }
//     function addmore() { setPlans([...erp_flow_chat, '']); }
//     function editPlan(index, value) {
//         erp_flow_chat[index] = value;
//         setPlans([...erp_flow_chat]);
//     }

//     return (
//         <div className='facility--wrapper'>
//             <Link to='/emergency-response' style={{ color: '#282828' }}>
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
//             </Link>
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
//                                         <h2 style={{ marginTop: 25 }}>Emergency Response Plan</h2>
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
//                     <div className='box--facility area--box--facility'>
//                         <p>
//                             <Form form={form}>
//                                 {editMode ? <Form.Item name="reponse_plan_desc"><Input.TextArea defaultValue={content.reponse_plan_desc} /></Form.Item> : <p>{content.reponse_plan_desc}</p>}
//                             </Form>
//                         </p>
//                     </div>                
//                     {editMode && <div className='addmore--button'>
//                         <Button type="default" icon={<PlusCircleOutlined />} onClick={addmore}>
//                             Add More
//                         </Button>
//                     </div>}
//                     <div className='box--facility area--box--facility manning--box--facility'>
//                         <Steps progressDot direction="vertical">
//                             {erp_flow_chat.map((plan, index) => <Steps.Step
//                                 title={plan}
//                                 description={editMode && <Input value={plan} onChange={e => editPlan(index, e.target.value)} />} />
//                             )}
//                         </Steps>
//                     </div>
//                 </Col>
//             </Row>





//         </div >
//     );
// }