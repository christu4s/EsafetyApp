import { Row, Col, Card, Upload, message, Button, Space, Input, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alert from '../../assets/alert@3x.png';
import imageEquipment from '../../assets/critical-element-equipment.png';
import imagePersonnel from '../../assets/critical-element-personnel.png';
import imageProcedure from '../../assets/critical-element-procedure.png';
import ajax from '../../ajax';
import { CardHolder } from '../../utils';
import { PageTemplate } from './../template';

export const CriticalElement = () => {

    const subpages = [
        { title: 'Equipment', url: '/safety-critical/equipment', image: imageEquipment },
        { title: 'Personnel', url: '/safety-critical/personnel', image: imagePersonnel },
        { title: 'Procedure', url: '/safety-critical/procedure', image: imageProcedure },
    ]

    return <PageTemplate 
        iconUrl={alert}  
        subtitle="Safety Critical Element" 
        api="/safetyCriticalElement" 
        descName="critical_element_desc"
        // imageName="individual_image"
        >
        <Row>
            {subpages.map((sub, i) => <Col key={i} span={8}><CardHolder {...sub} /></Col>)}              
        </Row>
    </PageTemplate>
}
// export const CriticalElement = () => {

//     const { Meta } = Card;
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ critical_element_desc: '' });
//     const [form] = Form.useForm();
//     const [now, setNow] = useState();
//     const refresh = () => setNow(new Date());
//     useEffect(() => {
//         ajax.get('/safetyCriticalElement').then(res => res && setContent(res));

//     }, [now]);

//     const subpages = [
//         { title: 'Equipment', url: '/safety-critical/equipment', image: imageEquipment },
//         { title: 'Personnel', url: '/safety-critical/personnel', image: imagePersonnel },
//         { title: 'Procedure', url: '/safety-critical/procedure', image: imageProcedure },
//     ]
//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/safetyCriticalElement', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//         refresh();
//     }
//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='38' src={alert} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header '>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2>Safety Critical Elements</h2>
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
//                             <div className='box--facility area--box--facility'>
//                                 <p>
//                                     <Form form={form}>
//                                         {editMode ? <Form.Item name="critical_element_desc"><Input.TextArea defaultValue={content.critical_element_desc} /></Form.Item> : <p>{content.critical_element_desc}</p>}
//                                     </Form>
//                                 </p>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         {subpages.map((sub, i) => <Col key={i} span={8}><CardHolder {...sub} /></Col>)}
//                     </Row>


//                 </Col>
//                 {/* <Col span={8} push={2} style={{ marginTop: 35 }} ><FacilitiesButtons /></Col> */}
//             </Row>


//         </div>
//     );
// }