import { Row, Col, Space, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import image from '../../assets/image.png';
import fire from '../../assets/fire@3x.png';
import ajax from '../../ajax';
import { ButtonUpload, CardHolder, DescField, EditButtons, FileViewer } from '../../utils';
import { ListItems, PageTemplate } from '../template';


export * from './details';

export const AccidentsHazard = () => {
    return <PageTemplate 
        iconUrl={fire} 
        title=" " 
        subtitle="Major Accident Hazards" 
        api="/major_accident_hazards" 
        descName="mah_desc"
        imageName="mah_image"
        >{(content,editMode)=> <ListItems 
            api="/major_accident_hazards_item" 
            editMode={editMode} 
            popupExtra={<div className='area--form'>
                <label>Name of Hazard</label>
                <Form.Item name="title"><Input /></Form.Item>
            </div>} 
        />}
    </PageTemplate>
}

// export const AccidentsHazard = ({history}) => {
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ mah_desc: '', mah_image: '' });
//     const [data, setData] = useState([]);
//     const [form] = Form.useForm();
//     const [formItem] = Form.useForm();
    
//     useEffect(() => {
//         ajax.get('/major_accident_hazards').then(res => res && setContent(res));
//         ajax.get('/major_accident_hazards_item').then(res => res && setData(res.data));
//     }, []);

//     async function saveData() {
//         var {mah_desc, mah_image} = form.getFieldsValue();
//         await ajax.post('/major_accident_hazards', {mah_desc, mah_image: mah_image ? mah_image.file : null}).then(res =>{ 
//             res && setContent(res);
//             setEditMode(!editMode);
//         });
//     }

//     async function createItem() {
//         var {title, image} = formItem.getFieldsValue();
//         await ajax.post('/major_accident_hazards_item', {title, image: image ? image.file : null}).then(res =>{ 
//             res && history.push('/accidents-hazards/' + res.id);
//         });
//     }

//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <div style={{display:'flex', justifyContent: 'space-between'}}>
//                         <h2>
//                             <Space align="end">
//                                 <div className='area--img'>
//                                     <img width='38' src={fire} />
//                                 </div>
//                                 Major Accident Hazards
//                             </Space>
//                         </h2>
//                         <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
//                     </div>
//                     <Form form={form}>
//                         <div className='box--facility'>
//                             <DescField editMode={editMode} value={content.mah_desc} name="mah_desc" />
//                         </div>
//                         {editMode && <ButtonUpload name='mah_image' onSubmit={saveData} />}
//                     </Form>
//                     <h2>File uploaded</h2>
//                     <FileViewer images={content.mah_image} />
//                     <div style={{marginTop: 30}}>
//                     {editMode && <Form form={formItem}><ButtonUpload name='image' onSubmit={createItem} addMore buttonText="Add more hazards">
//                             <Form.Item name="title" label="Title"><Input /></Form.Item>
//                         </ButtonUpload></Form>}
//                     </div>
//                     <Row>
//                         {data.map((v, i) => <Col key={i} span={8}>
//                             <CardHolder image={v.image.length ? v.image[0].src : image} title={v.title} url={"/accidents-hazards/" + v.id} />
//                         </Col>)}
//                     </Row>
//                 </Col>
//             </Row>
//         </div>
//     );
// }