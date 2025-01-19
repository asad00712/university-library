import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
    value?: string;
    onPickChange: (color: string) => void;
};

const ColorPicker = ({ value, onPickChange }: Props) => {
    
    return (
        <div className="relative">
            <div className="flex flex-row items-center">
                <p>#</p>
                <HexColorInput color={value} onChange={onPickChange} className="hex-input" />
            </div>
            <HexColorPicker color={value} onChange={onPickChange} />
        </div>)
};

export default ColorPicker;