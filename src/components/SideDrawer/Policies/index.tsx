import { FormProvider, useForm } from "react-hook-form";
import { usePostPolicies } from "../../../hooks/api";
import { Snackbar } from "@mui/material";
import FormTextInput from "../../common/form/TextInput";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

type FormValues = {
  document: File[];
  translate: File[];
  name: string;
  brief: string;
};

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";

export default function Policies() {
  const { handleSubmit, watch, register, ...rest } = useForm<FormValues>();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { mutate, isPending, isError, isSuccess } = usePostPolicies();

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    //name, brief, datetime, pilot
    formData.append("document", data.document[0]);
    formData.append("translate", data.translate[0]);
    formData.append("name", data.name);
    formData.append("brief", data.brief);
    formData.append(
      "datetime",
      date?.unix().toString() || dayjs().unix().toString()
    );
    // formData.append("pilot", "indonesia");
    mutate(formData);
  };

  return (
    <div className="overflow-y-auto">
      {isPending ? (
        <img src={"/spinner.svg"} />
      ) : (
        <FormProvider
          watch={watch}
          register={register}
          handleSubmit={handleSubmit}
          {...rest}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            Document
            <input
              {...register("document", {
                required: "Document file is required",
              })}
              type="file"
              accept=".pdf"
            />
            Translated Document
            <input
              {...register("translate")}
              type="file"
              accept=".pdf"
            />
            <FormTextInput
              name="name"
              label="Name"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            <FormTextInput
              name="brief"
              label="Brief"
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
      )}
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        message="Succesfully added new data."
      />
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        message="An error occured."
      />
    </div>
  );
}
