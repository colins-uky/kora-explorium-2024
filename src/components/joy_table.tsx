import React from "react";


interface TableProps {
    axes?: readonly number[];
    buttons?: readonly GamepadButton[];
    last_message: string;
    dead_man_switch: boolean;
    gamepadType: string;
};



const columns = ["Index", "Axes", "Buttons"];

const JoyTable: React.FC<TableProps> = ({ axes, buttons, last_message, dead_man_switch, gamepadType }) => {
    if (!axes || !buttons) {
        return null;
    }

    const maxLength = Math.max(axes.length, buttons.length);

    const indexArray = Array.from({ length: maxLength }, (_, index) => index);


    


    return (
        <table className="min-w-full table-auto font-mono text-lg">
            <thead>
                <tr>
                {columns.map(column => (
                    <th key={column} className="border p-2 w-20">{column}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {indexArray.map(index => (
                    <tr key={index}>
                        <td className="border p-2">{index}</td>
                        <td className="border p-2">{axes[index]?.toFixed(4)}</td>
                        <td className="border p-2">{buttons[index]?.value.toFixed(4)}</td>
                    </tr>
                ))}

                <tr>
                    <td className="border p-2">Gamepad Type: {gamepadType}</td>
                    <td className="border p-2">Last message to websocket: {last_message}</td>
                    <td className="border p-2">Dead man&apos;s switch: {dead_man_switch ? "True" : "False"}</td>
                    
                </tr>
            </tbody>
        </table>
    );
}




export default JoyTable;