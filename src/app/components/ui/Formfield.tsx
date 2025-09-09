"use client"
import { useEffect, useState } from "react";
import Container from "../Container";
import {ApiResponse, type  FieldForm } from "@/app/lib/type";
import { fetchData } from "@/app/lib/methodes";
import { Mail } from "lucide-react";

type Props = {
fields: FieldForm[];
data: Record<string, any>;
onChange: (updatedData: Record<string, any>) => void;
};
type Option = {
  label: string;
  value: string;
};

export default function FormField({ fields, data, onChange }: Props){
  const [formData, setFormData] = useState(data);
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, Option[]>>({});
  const [passwordError, setPasswordError] = useState<string | null>(null);

useEffect(()=>{
    fields.forEach(async(field)=>{
     if (field.type === "select" && field.fetchUrl) {
  const res: ApiResponse<any> = await fetchData(field.fetchUrl);
  const options = res.data.map((item: any) => ({
    label: item.label, 
    value: item.value, 
  }));
  setDynamicOptions((prev) => ({ ...prev, [field.name]: options }));
}

    })
},[fields])
const handelchange=(field:string,value:any)=>{
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
}
    return (
      <Container>
      <div dir="rtl" className="space-y-4 text-right text-black font-sans ">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="block mb-1 text-sm">{field.label}</label>

         {field.type === "select" ? (
<div className="bg-purple-100 rounded-xl p-2 flex justify-between items-center text-center overflow-hidden">
{(
  (field.options?.map((opt: any) =>
    typeof opt === "string"
      ? { label: opt, value: opt }
      : opt
  ) || dynamicOptions[field.name] || []) as Option[]
).map((opt, idx, arr) => (
  <div
    key={opt.value}
    className={`flex-1 py-2 cursor-pointer relative transition
      ${formData[field.name] === opt.value
        ? "bg-purple-600 text-white"
        : "text-purple-800 hover:bg-purple-200"}
      ${idx === 0 ? "rounded-r-lg" : ""}
      ${idx === arr.length - 1 ? "rounded-l-lg" : ""}
      ${idx !== arr.length - 1 ? "border-l border-purple-300" : ""}
    `}
    onClick={() => handelchange(field.name, opt.value)}
  >
    {opt.label}
  </div>
))}

</div>


) : field.type==="password" ? (
  <>
  <input
    name={field.name}
    type={field.type}
    value={formData[field.name] || ""}
    onChange={(e) =>{
      handelchange(field.name, e.target.value)
    }}

    placeholder={field.placeholder}
    minLength={8}
    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        onBlur={(e) => {
        const value = e.target.value;
        if (value.length < 8) {
          setPasswordError("كلمة المرور يجب أن تكون 8 أحرف أو أكثر");
        } else {
          setPasswordError(null);
        }
      }}
    />
   {passwordError && (
      <p className="text-sm text-red-600 mt-1">{passwordError}</p>
    )}
      </>
  
)  : field.type === "email" ? (
                            <div className="relative mb-4">
                                <Mail className="w-5 h-5 text-gray-500 mb-2 mx-auto absolute right-3 top-3" />
                                <input
                                    name={field.name}
                                    type={field.type}
                                    value={formData[field.name] || ""}
                                    onChange={(e) =>
                                        handelchange(field.name, e.target.value)
                                    }
                                    placeholder={field.placeholder}
                                    className="w-full p-2 mb-4 border-2 border-gray-500 rounded-lg pr-10 text-black outline-none"
                                    required
                                />
                            </div>
                        ): (
  <input
    name={field.name}
    type={field.type}
    value={formData[field.name] || ""}
    onChange={(e) => handelchange(field.name, e.target.value)}
    placeholder={field.placeholder}
    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
  />
)}

          </div>
        ))}
      </div>
    </Container>
    )
}