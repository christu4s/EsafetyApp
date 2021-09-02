import { Input, Form } from 'antd';
import React from 'react';
import alert from '../../../../assets/alert@3x.png';
import './index.css';
import { ListItems, PageTemplate } from './../../../template';
import { criticalEquipments } from '../../../../constants';
import { TitleEdit } from '../../../../utils';

export * from './details';

export const CriticalElementType = ({match}) => {
    const {type = ''} = match.params;
    const equipment = criticalEquipments.find(p => p.type==type);
    if(!equipment) return null;

    return <PageTemplate 
        backButton
        iconUrl={alert}
        title="Safety Critical Equipment" 
        subtitle={equipment.title}
        api={equipment.api} 
        descName={type + "_desc"}
        imageName={equipment.imageKey}
        pdfName={equipment.pdfKey}
        >{(content,editMode)=> <ListItems 
            api={equipment.itemApi} 
            editMode={editMode} 
            imageKey={equipment.imageKey}
            popupExtra={<div className='area--form'>
                <label>Name of {equipment.title}</label>
                <Form.Item name="title"><Input /></Form.Item>
            </div>} 
        />}
    </PageTemplate>
}

export const CriticalEquipmentItem = ({match}) => {
    const {type = '', id} = match.params;
    const equipment = criticalEquipments.find(p => p.type==type);
    if(!equipment) return null;

    return <PageTemplate
        backButton
        iconUrl={alert}
        title={"Safety Critical Equipment (" + equipment.title + ")"} 
        subtitle={TitleEdit}
        api={equipment.itemApi + '/' + id} 
        descName="desc"
        imageName={equipment.imageKey}
        pdfName={equipment.pdfKey}
    />
}


// export const EquipmentPrevention = ({ history }) => {
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ prevention_desc: '' });
//     const [data, setData] = useState([]);
//     const [form] = Form.useForm();
//     const [now, setNow] = useState();
//     const refresh = () => setNow(new Date());

//     useEffect(() => {
//         ajax.get('/criticalEquipmentPrevention').then(res => res && setContent(res));
//         ajax.get('/procedure_addSCE').then(res => res && setData(res.data));
//     }, []);
//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleOk = () => {
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };
//     const props = {
//         beforeUpload: () => false,
//     };
//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/criticalEquipmentPrevention', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }
//     function submit() {
//         var { title = '', add_sce } = form.getFieldsValue();
//         ajax.post('/procedure_addSCE', { title, add_sce: add_sce ? add_sce.file : image }).then(res => {
//             res && history.push('/procedure_addSCE/' + res.id);
//             refresh();
//             setEditMode(!editMode);
//             setIsModalVisible(false);
//         });
//     }
//     const { Meta } = Card;

//     return (
//         <div className='facility--wrapper'>
//             <Link to={'/safety-critical/equipment'} style={{ color: '#282828' }}>
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
//                                 <img width='38' src={alert} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header' >
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <p>Safety Critical Equipment</p>
//                                         <h2>Prevention</h2>
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
//                                         {editMode ? <Form.Item name="prevention_desc"><Input.TextArea defaultValue={content.prevention_desc} /></Form.Item> : <p>{content.prevention_desc}</p>}
//                                     </Form>
//                                 </p>
//                             </div>
//                         </Col>
//                     </Row>
//                     {editMode &&
//                         <Row className='addmore--button'>
//                             <Col>
//                                 <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>
//                                     Add SCE
//                                 </Button>

//                                 <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                                     <h3 className='modal--title text-center'>Upload Files</h3>
//                                     <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                                     <Form form={form}>
//                                         <Form.Item name="add_sce">
//                                             <Dragger {...props}>
//                                                 <p className="ant-upload-drag-icon">
//                                                     <img width='50' src={computing} />
//                                                 </p>
//                                                 <p className="ant-upload-hint">
//                                                     Drag or drop your files here OR <span> browse </span>
//                                                 </p>
//                                             </Dragger>
//                                         </Form.Item>
//                                         <div className='area--form'>
//                                             <label>Name of File</label>
//                                             <Form.Item name="title">
//                                                 <Input />
//                                             </Form.Item>
//                                         </div>
//                                     </Form>

//                                     <Button type="primary" onClick={submit}>Add SCE</Button>
//                                 </Modal>
//                             </Col>
//                         </Row>

//                     }
//                     <Row>
//                         {data.map((v, i) => <Col key={i} span={8}>
//                             <Link to={"/safety-critical/equipment/prevention/" + v.id} >
//                                 <Card className='custom--card' hoverable style={{ width: 200 }} cover={<img alt="example" src={v.add_sce.length ? v.add_sce[0].src : image} />}>
//                                 </Card>
//                                 <Meta style={{ textAlign: 'center' }} title={v.title} />
//                             </Link>
//                         </Col>)}
//                     </Row>


//                 </Col>

//             </Row>


//         </div>
//     );
// }