import { ImageMap } from '@qiuz/react-image-map';
import { useEffect, useMemo, useState } from 'react';

export function ImageMapViewer({ name, data, editMode, form }) {
    // const [mapArea, setMapArea] = useState([])
    console.log('ImageViewer', data)
    // console.log(data) // clickable_image
    if (!data) return null;
    const { map_detail = [], src } = data[0];
    console.log(map_detail);
    const onMapClick = (area, index) => {
        const tip = `click map${area.href || index + 1}`;
        console.log(tip);
        // alert(tip);
    };
    // useEffect(() => {
        // let newdata = data?.map(d => d.map_detail[0])

        let newmapARea = map_detail.map(d => ({
            left: d.x + 'em',
            top: d.y + 'em',
            height: d.height + 'em',
            width: d.width + 'em',
            style: { background: "rgba(255, 0, 0, 0.5)" },
            render: (area, index) => (
                <a href={d.link} target="_blank"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255, 255, 0, 0.5)"
                    }}
                >
                    {d.title}
                </a>
            ),
            // onMouseOver: () => console.log("map onMouseOver")
        }))
        // setMapArea(newmapARea)
    // }, [])

    // const mapArea2 = [
    //     {
    //         left: "0%",
    //         top: "6%",
    //         height: "12%",
    //         width: "33%",
    //         style: { background: "rgba(255, 0, 0, 0.5)" },
    //         onMouseOver: () => console.log("map onMouseOver")
    //     },
    //     {
    //         width: "33%",
    //         height: "12%",
    //         left: "0%",
    //         top: "36.37931034482759%",
    //         style: { background: "rgba(255, 0, 0, 0.5)" },
    //         render: (area, index) => (
    //             <span
    //                 style={{
    //                     display: "flex",
    //                     alignItems: "center",
    //                     justifyContent: "center",
    //                     background: "rgba(255, 255, 0, 0.5)"
    //                 }}
    //             >
    //                 can render map node
    //             </span>
    //         ),
    //         onMouseOver: () => console.log("map onMouseOver")
    //     }
    // ];

    // const img =
    //     "https://n.sinaimg.cn/sinacn20118/408/w690h518/20190701/a126-hzfeken6884504.jpg";

    // const ImageMapComponent = useMemo(
    //     () => (
    //         <ImageMap
    //             className="usage-map"
    //             src={img}
    //             map={mapArea2}
    //             // map={mapArea}
    //             onMapClick={onMapClick}
    //         />
    //     ),
    //     [img]
    // );
    return <div><ImageMap
    className="usage-map"
    src={src}
    map={newmapARea}
    // map={mapArea}
    onMapClick={onMapClick}
/></div>
} 