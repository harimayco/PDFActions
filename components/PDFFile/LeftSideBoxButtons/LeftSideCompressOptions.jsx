import React, {useState} from "react";

export default function LeftSideResizePDF({quality, setQuality}){
    const [qualityDesc, setQualityDesc] =  useState(getQualityDesc(quality))
    // input range slider quality low, medium, high
    const [rangeValue, setRangeValue] = useState(quality);
    const handleRangeChange = (e) => {
        setRangeValue(e.target.value);
        // quality 1=/scree, 2=medium, 3=high
        setQuality(e.target.value);
    }

    function getQualityDesc(quality = '2') {
        let q =  'Default';
        if(quality === '1'){
            q = 'Low';
        }else if(quality === '2'){
            q = 'Default';
        }else if(quality === '3'){
            q = 'Normal';
        }
        return q;
    }

    return (
        <div className="w-full mt-2 py-2 tracking-wider border-y-2 border-rose-200">
            Quality
            <div className="flex justify-between items-center">
                <input
                    type="range"
                    min="1"
                    max="3"
                    value={rangeValue}
                    onChange={handleRangeChange}
                    className="w-1/2"
                />
                <span className="w-1/2 text-center">{qualityDesc}</span>
            </div>
        </div>
    )


}