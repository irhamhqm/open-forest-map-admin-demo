import { FormProvider, useForm } from "react-hook-form";
import { usePostPrograms } from "../../../hooks/api";
import { Box, Snackbar } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import FormTextInput from "../../common/form/TextInput";
import { DatePicker } from "@mui/x-date-pickers";

type FormValues = {
  program_file: File[];
  program_file_translate: File[];
  program_name: string;
  program_scope: string;
  program_budget: string;
};

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";

export default function Programs({ state }: { state: string[] }) {
  const { handleSubmit, watch, register, ...rest } = useForm<FormValues>();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { mutate, isPending, isError, isSuccess } = usePostPrograms();

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("entity_code", state[state.length - 1]);
    formData.append("program_file", data.program_file[0]);
    formData.append("program_file_translate", data.program_file_translate[0]);
    formData.append("program_name", data.program_name);
    formData.append("program_scope", data.program_scope);
    formData.append("program_budget", data.program_budget);
    formData.append("datetime", dayjs(date).format("YYYY-MM-DD"));
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
            <FormTextInput
              name="program_name"
              label="Program's Name"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            <FormTextInput
              name="program_scope"
              label="Program's Scope"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            <FormTextInput
              name="program_budget"
              label="Program's Budget"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              type="number"
            />
            Document
            <input
              {...register("program_file", {
                required: "Document file is required",
              })}
              type="file"
              accept=".pdf"
            />
            Document(English Version)
            <input
              {...register("program_file_translate", {
                required: "Document file is required",
              })}
              type="file"
              accept=".pdf"
            />
            <Box marginTop="16px">
              Program's effective date
              <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
              />
            </Box>
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
