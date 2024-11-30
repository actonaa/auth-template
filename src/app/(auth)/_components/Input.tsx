type PropsInput = {
  htmlfor: string;
  label: string;
  type: string;
  id: string;
  name: string;
};

export default function Input({ htmlfor, label, type, id, name }: PropsInput) {
  return (
    <div className="flex flex-col mb-3 text-slate-700">
      <label htmlFor={htmlfor} className="mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="w-full bg-slate-200 outline-none p-2 mb-2 rounded-sm"
      />
    </div>
  );
}
