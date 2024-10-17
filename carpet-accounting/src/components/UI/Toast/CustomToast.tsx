
 type ToastProps={
  text?: string;
  color?: string;

 }

const CustomToast = ({ text, color }:ToastProps) => {
  return (
    <div
      className="px-8 py-4 bg-white rounded-lg  border-red-500"
      style={{ borderLeft: `8px solid ${color}`, borderColor: color }}
    >
      <p className="text-lg font-semibold">{text}</p>
    </div>
  );
};

export default CustomToast;
