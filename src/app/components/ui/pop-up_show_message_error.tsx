import React from 'react'
interface props{
message:string,
setClose:(value:{show:boolean,message:string})=>void
}
const ErrorPopUP = ({message,setClose}:props) => {
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-[90%] max-w-sm text-center">
          <div className="mb-4 text-lg text-black">{message}</div>
          <button
            className="text-purple-700 font-bold mt-2"
            onClick={() => setClose({ show: false, message: "" })}
          >
            تأكيد
          </button>
        </div>
      </div></>
  )
}

export default ErrorPopUP