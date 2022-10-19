import { Row, Col, Card, Button, Modal, Upload, message, Input, Form, Checkbox, Space, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined, MinusCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { useHistory } from "react-router-dom";
import './index.css';
import ajax from '../../../ajax';
import { PageTemplate } from './../../template';

Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += parseInt(this[i][prop]) || 0;
    }
    return total
}

export const LocationRisk = () => {
    return <PageTemplate
        iconUrl={danger}
        title="Risk Assessment"
        subtitle="Location Risk"
        api="/location_risk"
        descName="location_desc"
        imageName="location_image"
        pdfName="location_pdf"
        clickableName="clickable_image"
    >{(content, editMode, form) => <LocationGraph content={content} editMode={editMode} form={form} />}</PageTemplate>
}

function LocationGraph({ content, editMode, form }) {
    const [data, setData] = useState([]);
    const [areas, setAreas] = useState([]);
    const [columns, setAreas] = useState([{title: 'Hazard',dataIndex: 'name'}, {title: 'Hazard'}]);
    
    useEffect(() => { ajax.get('/facility-overview/area').then(res => { res && setAreas(res.data); }); }, []);
    useEffect(()=> {
        try { 
            var res = JSON.parse(content.table_data.replace(/\\/g, '')); 
            setData(res);
        } catch (e) { }
    }, [content.table_data, editMode]);
    
    useEffect(()=> { form.setFieldsValue({table_data: JSON.stringify(data)}) }, [data]);

    function remove(index) {
        data.splice(index, 1);
        setData([...data]);
    }

    function update(index, key, value) {
        data[index][key] = value;
        setData([...data]);
    }
    function addmore() { setData([...data, {}]); }

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      
      
      <Table dataSource={dataSource} columns={columns} />;


    return <div className='box--facility form-holder-risk location-risk-box area--box--facility manning--box--facility'>
        <Form.Item hidden name="table_data"><Input /></Form.Item>
        <div className='location-bx-header'>
            <Row>
                <Col span={4}>
                    <h3>Hazard</h3>
                </Col>
                <Col span={20} style={{ textAlign: 'center' }}>
                    <h3>Location Specific Individual Risk (per year)
                    </h3>
                </Col>
            </Row>
        </div>
        <div className='location-box-body'>
            <Row gutter={16}>
                <Col span={6}>
                </Col>
                {areas.map((v, i) => <Col key={i} span={6}>
                    <h5>{v.title}</h5>
                </Col>)}
            </Row>
            <hr />
            {data.map((v, i) => <div key={i}>
                <Row gutter={16}>
                    <Col span={5} style={{textAlign:'center'}}>
                        <Input value={v.name} style={{maxWidth:120}} onChange={e => update(i, 'name', e.target.value)} />
                    </Col>
                    {areas.map((area, j) => <Col key={j} style={{textAlign:'center'}} span={6}>
                        <Input type="number" style={{maxWidth:120}} value={v[area.id] || ''} onChange={e => update(i, area.id, e.target.value)} />
                    </Col>)}
                    <Col span={1}>{editMode && <MinusCircleOutlined onClick={() => remove(i)} />}</Col>
                </Row>
                <hr />
            </div>)}
            <div style={{ textAlign: 'right' }}>
                {editMode && <Button type="default" onClick={addmore} icon={<PlusCircleOutlined />}>
                    Add more row
                </Button>}
            </div>
            <Row gutter={16}>
                <Col span={5}>
                    <h5 className='text-primary'>Total</h5>
                </Col>
                {areas.map((area, j) => <Col key={j} style={{ textAlign: 'center' }} span={6}>
                    <Input readOnly style={{maxWidth:120}} value={data.sum(area.id)} />
                </Col>)}
            </Row>
        </div>

    </div>
}

// export const LocationRisk = () => {
//     let history = useHistory();
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [content, setContent] = useState({ location_desc: ''});
//     const [editMode, setEditMode] = useState(false);
//     const [data, setData] = useState([]);
//     const [form] = Form.useForm();

//     const props = {
//         beforeUpload: () => false,
//     };
//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/location_risk', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }

//     useEffect(() => {
//         ajax.get('/location_risk').then(res => res && setContent(res));
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


//         const onFinish = (values) => {
//           console.log('Success:', values);
//           history.push('/risk-assessment/individual-edit-user');
//         };

//         const onFinishFailed = (errorInfo) => {
//           console.log('Failed:', errorInfo);
//         };


//     const { Meta } = Card;

//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>

//                     <Row>
//                         <Col span={1}>
//                             <div className=''>
//                             <ArrowLeftOutlined />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className=''>
//                                 <p>Back
// </p>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='38' src={danger} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header' >
//                             <div style={{display:'flex', justifyContent: 'space-between'}}>
//                                 <div>
//                                 <p>Risk Assessment</p>
//                                 <h2>Location Risk</h2>
//                                 </div>

//                                 <div>
//                             {!editMode ? <Button type="primary" size="small" onClick={()=> setEditMode(!editMode) }>Edit</Button> : 
//                             <Space>
//                                 <Button type="primary" size="small" danger onClick={()=> setEditMode(!editMode) }>Cancel</Button>
//                                 <Button type="primary" size="small" success onClick={saveData}>Save</Button>
//                             </Space>}
//                         </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={23}>
//                         <Form form={form}>
//                             <div className='box--facility area--box--facility'>
//                                 <p>

//                                     {editMode ? <Form.Item name="locaion_desc"><Input.TextArea defaultValue={content.location_desc} /></Form.Item> : <p>{content.location_desc}</p>}
//                                 </p>
//                             </div>
//                             <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                                     <h3 className='modal--title text-center'>Upload Files</h3>
//                                     <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                                     <Form.Item name="location_image">
//                                         <Dragger {...props}>
//                                             <p className="ant-upload-drag-icon">
//                                                 <img width='50' src={computing} />
//                                             </p>
//                                             <p className="ant-upload-hint">
//                                                 Drag or drop your files here OR <span> browse </span>
//                                             </p>
//                                         </Dragger>
//                                     </Form.Item>
//                                     <Button type="primary" onClick={saveData}>Upload Image</Button>
//                                 </Modal>
//                             </Form>
//                         </Col>
//                     </Row>

//                     {editMode && 
//                     <Row>
//                     <Col span={6}>
//                         <Button type="primary" icon={<CloudUploadOutlined />} onClick={showModal}>
//                             Upload Image
//                         </Button>
//                         <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                             <h3 className='modal--title text-center'>Upload Files</h3>
//                             <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                             <Dragger {...props}>
//                                 <p className="ant-upload-drag-icon">
//                                     <img width='50' src={computing} />
//                                 </p>
//                                 <p className="ant-upload-hint">
//                                     Drag or drop your files here OR <span> browse </span>
//                                 </p>
//                             </Dragger>,
//                             <Button type="primary" icon={<CloudUploadOutlined />}>
//                                     Upload Image
//                             </Button>
//                         </Modal>
//                         </Col>
//                         <Col span={12}>
//                             <h4>File size not more than 2 MB</h4>
//                         </Col>
//                     </Row>
//                     }
//                     <Row>
//                         <Col span={12}>
//                             <h2>File uploaded</h2>
//                         </Col>
//                         <Col span={12}>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={24}>
//                             <img width='100%' src={content.location_image ? content.location_image[0].src : image} />
//                         </Col>
//                     </Row>





//                     <Row>
//                         <Col span={24}>
//                         <div className='box--facility form-holder-risk location-risk-box area--box--facility manning--box--facility'>

//                            <div className='location-bx-header'>
//                            <Row>
//                                <Col span={4}>
//                                     <h3>Hazard</h3>
//                                </Col>
//                                <Col span={20} style={{textAlign:'center'}}>
//                                     <h3>Location Specific Individual Risk (per year)
// </h3>
//                                </Col>
//                            </Row>
//                            </div>

//                           <div className='location-box-body'>
//                           <Row gutter={16}>
//                                 <Col span={6}>
//                                 </Col>
//                                  <Col span={6}>
//                                  <h5>Separator Area
// </h5>
//                                 </Col>
//                                  <Col span={6}>
//                                  <h5>Compressor Area
// </h5>
//                                 </Col>
//                                  <Col span={6}>
//                                     <h5>Living Quarters
// </h5>
//                                 </Col>
//                             </Row>
//                             <Row gutter={16}>
//                                 <Col span={6}>
//                                 </Col>

//                             </Row>

//                             <hr/>

//                             <Row gutter={16}>
//                                 <Col span={6}>
//                                     <h5>Jet Fire
// </h5>
//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="1" />

//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="10" />
//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="2" />
//                                 </Col>
//                             </Row>
//                             <hr/>
//                             <Row gutter={16}>
//                                 <Col span={6}>
//                                     <h5>Pool Fire
// </h5>
//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="1" />

//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="10" />
//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="2" />
//                                 </Col>
//                             </Row>
//                             <hr/>

//                             <Row gutter={16}>
//                                 <Col span={6}>
//                                     <h5>Flash Fire
// </h5>
//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="1" />

//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="10" />
//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="2" />
//                                 </Col>
//                             </Row>


//                             <Row gutter={16} style={{textAlign:'right'}}>


//                                  <Col span={6} push={18}>
//                                  <Button type="default" style={{textAlign:'right',paddingRight:0}} block icon={<PlusCircleOutlined />}>
//                                             Add more row
//                                 </Button>
//                                 </Col>
//                             </Row>

//                             <Row gutter={16}>
//                                 <Col span={6}>
//                                     <h5 className='text-primary'>Total</h5>
//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="1" />

//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="10" />
//                                 </Col>
//                                  <Col span={6}>
//                                  <Input placeholder="2" />
//                                 </Col>
//                             </Row>
//                           </div>

//                         </div>
//                         </Col>

//                     </Row>

//                 </Col>
//             </Row>


//         </div>
//     );
// }