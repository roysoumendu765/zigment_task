import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from 'sweetalert2';
import './RightSide.css'

interface Field {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

interface Schema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

interface FormGeneratorProps {
  schema: Schema;
}

const RightSide: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { control, handleSubmit, reset } = useForm();
  const [downloadData, setDownloadData] = useState<any>({});

  const onSubmit = (data: any) => {
    console.log("Data", data);
    setDownloadData(data);
    try {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Form Generated Successfully!"
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Oops! Something Went Wrong."
      });
    }
  };

  const handleOnDownload = () => {
    if(downloadData.lenght !== 0){
      const blob = new Blob([JSON.stringify(downloadData, null, 2)], {
        type: "application/json",
      });
      const ele = document.createElement("a");
      ele.href = URL.createObjectURL(blob);
      ele.download = "formdetails.json";
      ele.click();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Oops! Something Went Wrong."
      });
    }
  }

  const handleReset = () => {
    reset();
    setDownloadData({}); 
    Swal.fire({
      icon: "info",
      title: "Form Reset",
      text: "Form has been reset successfully."
    });
  };


  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border p-4 rounded"
    >
      <h2 className="text-2xl font-bold">{schema.formTitle}</h2>
      <p className="text-lg text-gray-600">{schema.formDescription}</p>
      {schema.fields.map((field) => (
        <div key={field.id} className="flex flex-col space-y-2">
          <label htmlFor={field.id} className="font-semibold">
            {field.label}
          </label>
          <Controller
            name={field.id}
            control={control}
            defaultValue={field.options?.[0]?.value || ""}
            rules={{
              required: field.required ? `${field.label} is required` : false,
              pattern: field.validation?.pattern
                ? {
                  value: new RegExp(field.validation.pattern),
                  message: field.validation.message || "Invalid format",
                }
                : undefined,
            }}
            render={({ field: controllerField, fieldState: { error } }) => (
              <>
                {field.type === "text" && (
                  <input
                    {...controllerField}
                    id={field.id}
                    type="text"
                    placeholder={field.placeholder}
                    className="border rounded p-2"
                  />
                )}
                {field.type === "email" && (
                  <input
                    {...controllerField}
                    id={field.id}
                    type="email"
                    placeholder={field.placeholder}
                    className="border rounded p-2"
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    {...controllerField}
                    id={field.id}
                    placeholder={field.placeholder}
                    className="border rounded p-2"
                  />
                )}
                {field.type === "select" && (
                  <select
                    {...controllerField}
                    id={field.id}
                    className="border rounded p-2"
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "radio" &&
                  field.options?.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        value={option.value}
                        checked={controllerField.value === option.value}
                        onChange={() => controllerField.onChange(option.value)}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  ))}
                {error && (
                  <p className="text-red-500 text-sm">{error.message}</p>
                )}
              </>
            )}
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-2 mx-2"
      >
        Submit
      </button>
      <button
        onClick={handleReset}
        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mb-2 mx-2"
      >
        Reset
      </button>
      <button
        onClick={handleOnDownload}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-2 mx-2"
      >
        Download
      </button>
      <div className="flex-1 p-6 border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
  <h3 className="font-bold text-xl text-gray-800 mb-5">Validation Rules</h3>
  <ul className="space-y-3">
    {schema.fields.map((field) => (
      <li key={field.id} className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <strong className="text-gray-700 font-medium">{field.label}</strong>
        <div className="text-gray-600">
          {field.required ? (
            <span className="text-sm text-red-500">Required.</span>
          ): field.label ? <span className="text-sm text-green-500">Not Required.</span> : <span></span>}
          {field.validation?.pattern && (
            <span className="text-sm text-blue-500 mx-2"><b className="text-gray-500">Pattern:</b> {field.validation.pattern}.</span>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>
    </form>
  </>
  );
};

export default RightSide;
