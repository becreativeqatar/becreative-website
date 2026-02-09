"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export default function AnimatedInput({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 6,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const isActive = isFocused || value.length > 0;

  const inputClasses = cn(
    "w-full px-0 py-3 bg-transparent border-0 border-b-2 text-white placeholder-transparent",
    "focus:outline-none focus:ring-0 transition-colors duration-300",
    isFocused ? "border-red-spark" : "border-white/20",
    "peer"
  );

  return (
    <div className="relative group">
      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || label}
          rows={rows}
          className={cn(inputClasses, "resize-none")}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || label}
          className={inputClasses}
        />
      )}

      {/* Floating label */}
      <motion.label
        htmlFor={name}
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none",
          isActive
            ? "text-xs font-medium -top-2"
            : "text-sm top-3"
        )}
        animate={{
          color: isFocused ? "#E0251C" : isActive ? "#D7D1CA" : "#999999",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
        {required && <span className="text-red-spark ml-1">*</span>}
      </motion.label>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-spark to-purple-dream"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />
    </div>
  );
}

interface AnimatedSelectProps {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

export function AnimatedSelect({
  label,
  name,
  required = false,
  value,
  onChange,
  options,
}: AnimatedSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative group">
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "w-full px-0 py-3 bg-transparent border-0 border-b-2 text-white",
          "focus:outline-none focus:ring-0 transition-colors duration-300 appearance-none cursor-pointer",
          isFocused ? "border-red-spark" : "border-white/20",
          !value && "text-transparent"
        )}
      >
        <option value="" className="bg-core-black text-text-muted">
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-core-black text-white">
            {opt.label}
          </option>
        ))}
      </select>

      {/* Floating label */}
      <motion.label
        htmlFor={name}
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none",
          isActive
            ? "text-xs font-medium -top-2"
            : "text-sm top-3"
        )}
        animate={{
          color: isFocused ? "#E0251C" : isActive ? "#D7D1CA" : "#999999",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>

      {/* Dropdown arrow */}
      <div className="absolute right-0 top-3 pointer-events-none">
        <svg className="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-spark to-purple-dream"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />
    </div>
  );
}
