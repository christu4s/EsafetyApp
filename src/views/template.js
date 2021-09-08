import { Row, Col, Form, Space, Carousel, Image, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import ajax from '../ajax';
import { ButtonUpload, CardHolder, DescField, EditButtons } from '../utils';
import imagePdf from '../assets/pdf-1@3x.png';
import image from '../assets/image.png';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMenuContext } from '../provider';
import { ReactSortable } from "react-sortablejs";

export const PageTemplate = ({
    title, 
    api,
    subtitle, 
    descName ='desc', 
    pdfName, 
    imageName, 
    iconUrl,
    backButton,
    children, 
    right,
    updateMenu=false,
    canDelete=false,
    titleKey='title',
    outside}) => {
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({});
    const [menu, setMenuTitle] = useMenuContext();
    const [form] = Form.useForm();
    const history = useHistory();
    const desc = content[descName], image = content[imageName], pdf = content[pdfName]; 

    async function saveData() {
        await ajax.post(api, getFormFields(form)).then(res =>{ 
            res && setContent(res);
            updateMenu && res[titleKey] && setMenuTitle(api,res[titleKey]);
        });
        setEditMode(!editMode);
    }
    
    function deleteItem(){
        ajax.delete(api).then( ()=> history.goBack() );
    }

    useEffect(() => {
        ajax.get(api).then(res => res && setContent(res));
    }, []);
    
    return (
        <div className='facility--wrapper'>
            {backButton && <a href="#" onClick={()=> history.goBack()} style={{ color: '#282828' }}>
                <Space><ArrowLeftOutlined />Back</Space>
            </a>}
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
                                {canDelete && editMode && <Popconfirm title="Are you sure to delete this?" onConfirm={deleteItem}>
                                        <a style={{color:'red', float: 'right'}}>Delete</a>
                                    </Popconfirm>
                                }
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
                    <div style={{margin: 20}} />
                    {imageName && <ImageViewer editMode={editMode} form={form} imageName={imageName} images={image} />}
                    {pdfName && <PdfViewer files={pdf} pdfName={'_' + pdfName} editMode={editMode} form={form} />}
                    {typeof children=='function' ? children(content, editMode, form, saveData) : children}
                </Col>
                <Col span={8} push={1} style={{ marginTop: 35 }}>
                    {typeof right=='function' ? right({content, editMode, form, setContent, saveData}) : right}
                </Col>
            </Row>
            {typeof outside=='function' ? outside(content, editMode, form) : outside}
            </Form>
        </div>
    );
}

export function ImageViewer({images = [], imageName='', form, editMode}){
    const [imgs, setImgs] = useState([]);
    const [current, setCurrent] = useState(0);
    const name = '_'+imageName;
    useEffect(()=>{ setImgs([... (images || [])]); }, [images, editMode]);
    useEffect(()=>{ form.setFieldsValue({[name]: imgs.map(v=>v.id)}) }, [imgs]);
    if(!imgs || !imgs.length) return null;
    function removeItem(index){
        imgs.splice(index, 1);
        setImgs([...imgs]);
    }
    

    return <div>
    {editMode && <ReactSortable list={imgs} setList={setImgs}>
        {imgs.map((v,i)=><div className={"image-preview "+ (current==i ? 'active': '')} key={v.id}>
            <img src={v.src} />{v.name}
        </div> )}
    </ReactSortable>}
    <Form.List name={name}>{(fields)=>fields.map(({key,name}) => <Form.Item key={key} hidden name={name} />)}</Form.List>
    <Carousel autoplay afterChange={setCurrent}>
        {imgs.map((v,i)=> v.type.includes('image') && <div className="img-wrap" key={i}>
            <Image width="100%" height="300" src={v.src}/>
            {editMode && <div className="img-delete-icon"><span onClick={()=> removeItem(i)}>x</span></div>}
        </div>)}
    </Carousel>
    </div>
}

export function PdfViewer({files = [],pdfName='', editMode, form}){
    const [fls, setFls] = useState();
    useEffect(()=>{ setFls((files && files[0]) || null); }, [files, editMode]);
    useEffect(()=>{ fls && form.setFieldsValue({[pdfName]: fls.id }) }, [fls]);
    if(!fls) return null;

    const {type = '', name, src} = fls;
  
    return type.includes('pdf') && <div className='box--facility pdf-view-section area--box--facility'>
      <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{ marginTop: 15 }}><img width='30' src={imagePdf} /><span> {name}</span> </h2>
        {editMode && <a style={{color:'red'}} onClick={()=> setFls(null)}>Delete</a>}
      </div>
      <Form.Item hidden name={pdfName} />
      <iframe src={src} width="100%" height="700" frameBorder="0" />
    </div> 
}

export function ListItems({api,editMode, list = [], countInRow=3, imageKey = 'image', popupExtra}){
    const [data, setData] = useState(list);
    const [form] = Form.useForm();
    const history = useHistory();
    const {pathname} = history.location;
    useEffect(()=>{ api && ajax.get(api).then(res => res && setData(res.data)) },[]);

    async function saveData(){
        await ajax.post(api,getFormFields(form)).then(res=> res && history.push(`${pathname}/${res.id}`))
    }

    return <div><Row gutter={[16,16]}>
            {data && data.map((v, i) =>{ 
                var src, url;
                if(api){
                    src = v[imageKey] && v[imageKey].length ? v[imageKey][0].src : image;
                    url = `${pathname}/${v.id}`;
                }else{
                    src = v.image;
                    url = v.url;
                }
                return <Col key={i} span={24/countInRow}>
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

export function getFormFields(form){
    var values = form.getFieldsValue(), ret = {};
    for(var [key,value] of Object.entries(values)){
        ret[key] = value ? (value.fileList ?  value.fileList.map(f=> f.originFileObj) : value) : '';
        // ret[key] = value ? (value.file || value) : '';
    }
    return ret;
}