import { useEffect, useState } from "react";
import FormTextInput from "../common/form/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";

type FormValues = {
  name: string;
  description: string;
};

export default function SoilType() {
  const { watch, handleSubmit, ...rest } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="overflow-y-auto">
      <FormProvider
        watch={watch}
        handleSubmit={handleSubmit}
        {...rest}
      >
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormTextInput
            name="name"
            label="Name"
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={textInputClass}
          />
          <FormTextInput
            name="description"
            label="description"
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={textInputClass}
          />
          <DatePicker
            value={date}
            onChange={(value) => setDate(value)}
          />
          <button
            className="bg-green-500 py-2 px-1 mt-6"
            type="submit"
            value="submit"
          >
            Add data
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
