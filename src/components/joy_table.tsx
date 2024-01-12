import React from "react";


interface TableProps {
    axes?: readonly number[];
    buttons?: readonly GamepadButton[];
};



const columns = ["Index", "Axes", "Buttons"];

const JoyTable: React.FC<TableProps> = ({ axes, buttons }) => {
    if (!axes || !buttons) {
        return null;
    }

    const maxLength = Math.max(axes.length, buttons.length);

    const indexArray = Array.from({ length: maxLength }, (_, index) => index);


    


    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr>
                {columns.map(column => (
                    <th key={column} className="border p-2 w-20">{column}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {indexArray.map(index => (
                    <tr key={index} className="">
                        <td className="border p-2">{index}</td>
                        <td className="border p-2">{axes[index]?.toFixed(4)}</td>
                        <td className="border p-2">{buttons[index]?.value.toFixed(4)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}




export default JoyTable;