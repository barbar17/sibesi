"use client";

export default function InputCustom({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: any;
  onChange: (data: string) => void;
  placeholder: string;
  className?: string;
}) {
  return <input className={`input-text ${className}`} value={value} onChange={(evt) => onChange(evt.target.value)} placeholder={placeholder} />;
}
