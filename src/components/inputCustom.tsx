"use client";

export default function InputCustom({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
}: {
  value: any;
  onChange: (data: string) => void;
  placeholder: string;
  className?: string;
  type?: string;
}) {
  return <input type={type} className={`input-text ${className}`} value={value} onChange={(evt) => onChange(evt.target.value)} placeholder={placeholder} />;
}
