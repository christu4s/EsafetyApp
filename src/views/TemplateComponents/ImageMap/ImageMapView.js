import { ImageMap } from '@qiuz/react-image-map';
import { useEffect, useMemo, useState } from 'react';

export function ImageMapViewer({ name, data, editMode, form }) {
    // const [mapArea, setMapArea] = useState([])
    // const handleDelete = () => {
    //     form.setFieldsValue({ [name]: [] });
    // }
    if (!data) return null;
    console.log('data - ' , data[0]);
    
    var { map_detail, src } = data[0] || [];
    if(!map_detail) map_detail = [];

    let newmapArea = map_detail.map(d => ({
        left: `${d.x}%`,
        top: `${d.y}%`,
        height: `${d.height}%`,
        width: `${d.width}%`,
        style: { background: "rgb(38 37 37 / 54%)" },
        render: (area, index) => (
            <p style={{
                display: "flex",
                alignItems: "flex-start",
            }}>
                <a style={{ color: "white", fontWeight: "600", fontSize: 20 }} href={d.link} rel="noreferrer" target="_blank">{d.title}</a>
            </p>
        ),
        // onMouseOver: () => console.log("map onMouseOver")
    }))
    // setMapArea(newmapARea)
    // }, [])

    return <div className='image-map_wrapper'>
        {/* {editMode && <a style={{ color: 'red' }} onClick={handleDelete} >Delete</a>} */}

        <ImageMap
            className="usage-map"
            src={src}
            map={newmapArea}
        // map={mapArea}
        // onMapClick={onMapClick}
        /></div>
} 