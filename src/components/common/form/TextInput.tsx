import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type FormTextInputProps = {
  name: string;
  label: string;
  type?: "text" | "password" | "number";
  icon?: ReactNode;
  placeholder?: string;
  registerOption?: object;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
};

export default function FormTextInput(props: FormTextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${props.containerClass} flex flex-col`}>
      <label
        className={props.labelClass}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div className={`${props.inputClass} flex items-center`}>
        {props.icon && <div className="w-4">{props.icon}</div>}
        <input
          className={`${props.icon ? "ml-2" : ""} flex-1`}
          {...register(props.name, props.registerOption || {})}
          id={props.name}
          type={props.type}
          placeholder={props.placeholder}
        />
      </div>
      {errors[props.name] && (
        <span className="text-red-500 mt-2">{`${
          errors[props.name]?.message
        }`}</span>
      )}
    </div>
  );
}
