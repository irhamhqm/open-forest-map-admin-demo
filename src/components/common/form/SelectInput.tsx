import { LocationService } from "../../../types";

type FormSelectInputProps = {
  name: string;
  label: string;
  disabled?: boolean;
  data: Array<LocationService>;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  htmlFor: string;
  value: string;
  onChange: (value: string) => void;
};

export default function FormSelectInput(props: FormSelectInputProps) {
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
        id={props.name}
        disabled={props.disabled}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option
          disabled
          hidden
          value=""
        >
          Select
        </option>
        {props.name !== "level0" && <option value="">None</option>}
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
