import { useFormContext } from "react-hook-form";
import { LocationService } from "../../../types";

type FormSelectInputProps = {
  name: string;
  label: string;
  disabled?: boolean;
  data: Array<LocationService>;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  idPropName?: string;
  namePropName?: string;
  htmlFor: string;
};

export default function FormSelectInput(props: FormSelectInputProps) {
  const { register } = useFormContext();

  return (
    <div className={`${props.containerClass} flex flex-col`}>
      <label
        className={props.labelClass}
        htmlFor={props.htmlFor}
      >
        {props.label}
      </label>
      <select
        className={`${props.inputClass} disabled:bg-[#f2f2f2]`}
        {...register(props.name)}
        id={props.name}
        disabled={props.disabled}
      >
        <option
          disabled
          hidden
          value=""
        >
          Select
        </option>
        {props.data.map((value) => (
          <option
            key={value.regional_entity_id}
            value={value.regional_entity_id}
          >
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
}
