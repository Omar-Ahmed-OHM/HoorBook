'use client'

import Container from "@/app/components/Container"
import FormField from "@/app/components/ui/Formfield"
import SmartNavbar from "@/app/components/ui/Navbar"
import { FieldForm } from "@/app/lib/type"
import { useState } from "react"
import { Smartphone, Asterisk } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { BaseUrl ,headers} from "@/app/components/Baseurl"

export default function Update_Password() {
  const [reset, setreset] = useState<Record<string, any>>({})

  const fields: FieldForm[] = [
    {
      label: "كلمة المرور القديمه",
      name: "old_password",
      requierd: true,
      type: "password",
      placeholder: "أدخل كلمة المرور القديمه",
    },
    {
      label: "كلمة المرور الجديده",
      name: "password",
      requierd: true,
      type: "password",
      placeholder: "أدخل كلمة المرور الجديده ",
    },
    {
      label: "تأكيد كلمة المرور الجديده ",
      name: "password_confirmation",
      requierd: true,
      type: "password",
      placeholder: "أدخل تأكيد كلمة المرور الجديده ",
    },
  ]
const handelsupmit=async()=>{
    try{
        const res=await axios.patch(`${BaseUrl}/api/user/reset-password`,reset,{headers});
        console.log(res.data);
        toast.success('تم تغيير كلمة المرور بنجاح ')
    }
    catch(error){
        console.log(error);
        toast.error('خطأ فى البيانات')
    }
}
  return (
    <Container>
      <section className="pb-8 md:pb-14">
        <SmartNavbar />
      </section>

      <section className="text-center">
        <h1 className="text-2xl font-bold mb-6">تحديث كلمه السر</h1>

        {/* الأيقونة */}
        <div className="relative w-32 h-32 mx-auto mb-8 bg-purple-100 rounded-full flex items-center justify-center">
          <Smartphone className="w-16 h-16 text-purple-700" />
          <div className="absolute -top-3 -right-3 bg-purple-700 p-2 rounded-full">
            <Asterisk className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* الحقول + الزر */}
        <div className="max-w-md mx-auto px-4 space-y-4">
          <FormField fields={fields} data={reset} onChange={setreset} />

          <button
          onClick={handelsupmit}
            className="w-full py-2 rounded-md text-white font-bold bg-gradient-to-r from-purple-800 to-orange-400 hover:opacity-90 transition"
          >
            تغيير
          </button>
        </div>
      </section>
    </Container>
  )
}
