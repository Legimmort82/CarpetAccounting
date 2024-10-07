
type props = {
  text: string
}
function SimpleInput({text}: props) {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <label className="text-xl">{text}</label>
        <input type="text" className="w-full py-2 px-4 bg-gray-50 focus:ring-1 focus:ring-black rounded-md" />
      </div>
    </>
  )
}

export default SimpleInput