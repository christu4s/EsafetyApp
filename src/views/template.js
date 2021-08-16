import { Row, Col, Form, Space, Carousel } from 'antd';
import React, { useState, useEffect } from 'react';
import ajax from '../ajax';
import { ButtonUpload, CardHolder, DescField, EditButtons } from '../utils';
import imagePdf from '../assets/pdf-1@3x.png';
import image from '../assets/image.png';
import { useHistory } from 'react-router-dom';

export const PageTemplate = ({
    title, 
    api,
    subtitle, 
    descName ='desc', 
    pdfName, 
    imageName, 
    iconUrl,
    children, 
    right}) => {
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({});
    const [form] = Form.useForm();
    const desc = content[descName], image = content[imageName], pdf = content[pdfName]; 

    async function saveData() {
        await ajax.post(api, getFormFields(form)).then(res => res && setContent(res));
        setEditMode(!editMode);
    }

    useEffect(() => {
        ajax.get(api).then(res => res && setContent(res));
    }, []);
    
    return (
        <div className='facility--wrapper'>
            <Form form={form}>
            <Row>
                <Col span={16}>
                    <Row>
                        {iconUrl && <Col span={1}>
                            <div className='area--img'>
                                 <img width='38' src={iconUrl} />
                            </div>
                        </Col>}
                        <Col span={23}>
                            <div className='area--header mt-5' >
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                <div style={{alignSelf:'center'}}>
                                    <p className='mb-0 '>{title}</p>
                                    <h2 style={{ marginTop: 0 }}>{typeof subtitle=='function' ? subtitle(content, editMode) : subtitle}</h2>
                                </div>
                                <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {descName && <div className='box--facility area--box--facility'>
                        <DescField editMode={editMode} value={desc} name={descName} />
                    </div>}
                    {editMode && <Space>
                        {imageName && <ButtonUpload name={imageName} onSubmit={saveData} buttonText="Upload Images" multiple accept="image/*" />}
                        {pdfName && <ButtonUpload name={pdfName} onSubmit={saveData} buttonText="Upload PDF" accept="application/pdf" />}
                    </Space>}
                    {(imageName || pdfName) && <h2>File uploaded</h2>}
                    {imageName && <ImageViewer images={image} />}
                    {pdfName && <PdfViewer files={pdf} />}
                    {typeof children=='function' ? children(content, editMode) : children}
                </Col>
                <Col span={8} push={1} style={{ marginTop: 35 }}>
                    {right}
                </Col>
            </Row>
            </Form>
        </div>
    );
}

export function ImageViewer({images = []}){
    if(!images || !images.length) return null;
  
    return <Carousel>
        {images.map((v,i)=> v.type.includes('image') && <div key={i}><img width="100%" src={v.src} alt="" /></div>)}
    </Carousel>
}

export function PdfViewer({files = [], index = 0}){
    if(!files[index]) return null;
  
    const {type = '', name, src} = files[index];
  
    return type.includes('pdf') && <div className='box--facility pdf-view-section area--box--facility'>
      <h2 style={{ marginTop: 15 }}><img width='30' src={imagePdf} /> <span> {name}</span></h2>
      <iframe src={src} width="100%" height="700" frameBorder="0" />
    </div> 
}

export function ListItems({api,editMode, list = [], imageKey = 'image', popupExtra}){
    const [data, setData] = useState(list);
    const [form] = Form.useForm();
    const history = useHistory();
    const {pathname} = history.location;
    useEffect(()=>{ api && ajax.get(api).then(res => res && setData(res.data)) },[]);

    async function saveData(){
        await ajax.post(api,getFormFields(form)).then(res=> res && history.push(`${pathname}/${res.id}`))
    }

    return <div><Row>
            {data && data.map((v, i) =>{ 
                var src, url;
                if(api){
                    src = v[imageKey].length ? v[imageKey][0].src : image;
                    url = `${pathname}/${v.id}`;
                }else{
                    src = v.image;
                    url = v.url;
                }
                return <Col key={i} span={8}>
                <CardHolder image={src} title={v.title} url={url} />
            </Col>
        })}
        </Row>
        {api && editMode && <Form style={{marginTop:30}} form={form}>
            <ButtonUpload name={imageKey} onSubmit={saveData} addMore buttonText="Add more" accept="image/*">
                {popupExtra}
            </ButtonUpload>
        </Form>}
    </div>
}

function getFormFields(form){
    var values = form.getFieldsValue(), ret = {};
    for(var [key,value] of Object.entries(values)){
        ret[key] = value.file || value;
    }
    return ret;
}