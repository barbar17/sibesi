"use client";

export default function InputCustom({ value, onChange, placeholder }: { value: any; onChange: (data: string) => void; placeholder: string }) {
  return <input className="input-text" value={value} onChange={(evt) => onChange(evt.target.value)} placeholder={placeholder} />;
}
