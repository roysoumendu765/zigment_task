import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './LeftSide.css'

interface jsonEditor {
    onSchemaChange : (schema: any) => void;
    toggleVal: boolean;
}

const LeftSide : React.FC<jsonEditor> = ({onSchemaChange, toggleVal}) => {
    const [rawInput, setRawInput] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setRawInput(e.target.value);

        try {
            setError(null);
            onSchemaChange(JSON.parse(e.target.value));
        } catch (error) {
            setError("Invalid JSON Format");
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(rawInput);
        if(error === null || error === ''){
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "JSON Copied Successfully!"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please Provide a Valid Input!"
            });
        }
    } 
 
  return (
    <>
    <div className={`w-full h-80 mb-10 ${toggleVal ? 'bg-dark text-white' : 'bg-light text-black'}`}>
        <textarea 
        className={`w-full h-full border rounded p-2 ${toggleVal ? 'dark' : 'light'}`}
        value={rawInput}
        onChange={handleSubmit}
        placeholder='Enter Your JSON Schema.'
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
    <button
        onClick={handleCopy}
        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
      >
        Copy Json
      </button>
    </>
  )
}

export default LeftSide