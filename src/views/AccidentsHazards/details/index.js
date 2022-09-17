import { Row, Col, Input, Space, Form, Modal, Button, Tabs, Select, List } from 'antd';
import React, { useState, useEffect } from 'react';
import fire from '../../../assets/fire@3x.png';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import ajax from '../../../ajax';
import { ButtonUpload, DescField, EditButtons, FileViewer, TitleEdit } from '../../../utils';
import { PageTemplate } from '../../template';
import { criticalEquipments } from '../../../constants';
import { Link, useParams } from 'react-router-dom';

export const AccidentsHazardItem = ({ match }) => {

    const { id } = match.params;
    return <PageTemplate
        canDelete
        iconUrl={fire}
        title="Major Accident Hazards"
        subtitle={TitleEdit}
        api={'/major_accident_hazards_item/' + id}
        descName="desc"
        imageName="image"
        pdfName="pdf"
        videoName="video"
        tableName="table_detail"
        right={({ content, setContent }) => <MajorSCE content={content} setContent={setContent} />}>
    </PageTemplate>
}

function MajorSCE({ content, setContent }) {
    const { id } = useParams();
    const [sce, setSCE] = useState();
    const [options, setOption] = useState([]);
    const [formExisting] = Form.useForm();
    const closeModal = () => setSCE(null);
    const sces = sce ? (content[sce.type] || []) : [];
    async function save() {
        formExisting.validateFields().then(async v => {
            var res = await ajax.post('/major_accident_hazards_item/' + id, v);
            setContent(res);
            closeModal();
        })
    }

    const handleRemoveSce = async (test, index) => {
        let cont = [];
        content[test?.type.toLowerCase()]?.map(item => {
            if(item?.ID !== index) cont.push(item.ID)
        })
        var res = await ajax.post('/major_accident_hazards_item/' + id, {
            [test.type.toLowerCase()]: cont.length > 0 ? cont : ['']
        });
        setContent(res);
    }

    useEffect(() => {
        sce && formExisting.setFieldsValue({ [sce.type]: sces.map(v => v.ID) });
        
    }, [sce]);

    async function search(search) {
        var res = await ajax.get(sce.itemApi, { search })
        if (!res || !res.data) return;
        setOption(res.data.map(v => ({ label: v.title, value: v.id })));
    }


    return <div className='accident--box bg--white' style={{ marginTop: 60 }} >
        {criticalEquipments.map((v, i) =>{
            var data = content[v.type.toLowerCase()] || [];
            return <div key={i} className='accident--box--content'>
                <h4>{v.title}</h4>
                <div className='accident--icon--box'>
                    <Button type="text" style={{color:'#fff'}} onClick={()=> setSCE({...v, type: v.type.toLowerCase()})} icon={<PlusCircleOutlined />}>Add SCE</Button>
                </div>
                <List bordered dataSource={data} size="small" renderItem={item => (<List.Item >
                    <div className='sce_wrapper'>
                        
                            <Link to={'/safety-critical/equipment/' + v.type + '/' + item.ID}>{item.post_title}</Link>
                        
                        
                            <DeleteOutlined className='delete_icon' onClick={() => handleRemoveSce(v, item.ID)} />
                        
                    </div>
                    
                </List.Item>)} />
            </div>
        })}
        {sce && <Modal title={sce.title} visible={true} onOk={save} onCancel={closeModal} bodyStyle={{ padding: 0 }}>
            <Tabs defaultActiveKey="1" type="card">
                <Tabs.TabPane tab="Existing" key="1" style={{ padding: '0 20px' }}>
                    <Form form={formExisting}>
                        <Form.List name={sce.type}>
                            {(fields) => <>
                                {sces.map((item, i) => <Form.Item hidden name={i}><Input /></Form.Item>)}
                                <Form.Item name={sces.length} label="SCE" required>
                                    <Select showSearch showArrow={false} notFoundContent={null} filterOption={false} onSearch={search} options={options} />
                                </Form.Item>
                            </>}
                        </Form.List>
                    </Form>
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab="New" key="2">
                    Content of card tab 2
                </Tabs.TabPane> */}
            </Tabs>
        </Modal>}
    </div>
}

// export const AccidentsHazardItem = ({match}) => {
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ mah_desc: '', mah_image: '' });
//     const [form] = Form.useForm();
//     const {id}= match.params;

//     useEffect(() => {
//         ajax.get('/major_accident_hazards_item/'+ id).then(res => res && setContent(res));
//     }, []);

//     async function saveData() {
//         var {desc, image} = form.getFieldsValue();
//         await ajax.post('/major_accident_hazards_item/'+ id, {desc, image: image ? image.file : null}).then(res =>{
//             res && setContent(res);
//             setEditMode(!editMode);
//         });
//     }

//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <div style={{display:'flex', justifyContent: 'space-between'}}>
//                         <div>
//                             <Space align="start">
//                                 <div className='area--img'>
//                                     <img width='38' src={fire} />
//                                 </div>
//                                 <div>
//                                     <p style={{marginBottom:0}}>Major Accident Hazards</p>
//                                     <h2>{content.title}</h2>
//                                 </div>
//                             </Space>
//                         </div>
//                         <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
//                     </div>
//                     <Form form={form}>
//                         <div className='box--facility'>
//                             <DescField editMode={editMode} value={content.desc} name="desc" />
//                         </div>
//                         {editMode && <ButtonUpload name='image' onSubmit={saveData} />}
//                     </Form>
//                     <h2>File uploaded</h2>
//                     <FileViewer images={content.image} />
//                 </Col>
//                 <Col span={6} offset={1}  style={{marginTop:80}} >
//                     <div className='accident--box bg--white'>
//                         <div className='accident--box--content'>
//                             <h4>Prevention</h4>
//                             <div className='accident--icon--box'>
//                             <PlusCircleOutlined /> <span>Add SCE</span>
//                             </div>
//                             <div className='accident--icon--input'>
//                                 <div className='form-group'>
//                                     <Input type='text' className='form-control'/>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='accident--box--content'>
//                             <h4>Detection</h4>
//                             <div className='accident--icon--box'>
//                             <PlusCircleOutlined /> <span>Add SCE</span>
//                             </div>
//                             <div className='accident--icon--input'>
//                                 <div className='form-group'>
//                                     <Input type='text' className='form-control'/>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className='accident--box--content'>
//                             <h4>Control</h4>
//                             <div className='accident--icon--box'>
//                             <PlusCircleOutlined /> <span>Add SCE</span>
//                             </div>
//                             <div className='accident--icon--input'>
//                                 <div className='form-group'>
//                                     <Input type='text' className='form-control'/>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className='accident--box--content'>
//                             <h4>Mitigation</h4>
//                             <div className='accident--icon--box'>
//                             <PlusCircleOutlined /> <span>Add SCE</span>
//                             </div>
//                             <div className='accident--icon--input'>
//                                 <div className='form-group'>
//                                     <Input type='text' className='form-control'/>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className='accident--box--content'>
//                             <h4>Emergency Response</h4>
//                             <div className='accident--icon--box'>
//                             <PlusCircleOutlined /> <span>Add SCE</span>
//                             </div>
//                             <div className='accident--icon--input'>
//                                 <div className='form-group'>
//                                     <Input type='text' className='form-control'/>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Col>

//             </Row>


//         </div>
//     );
// }