import { FormProvider, useForm } from "react-hook-form";
import { usePostPolicies } from "../../../hooks/api";
import { Box, Snackbar } from "@mui/material";
import FormTextInput from "../../common/form/TextInput";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

type FormValues = {
  regulation_file: File[];
  regulation_file_translate: File[];
  regulation_name: string;
  regulation_brief: string;
};

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";

export default function Policies({ state }: { state: string[] }) {
  const { handleSubmit, watch, register, ...rest } = useForm<FormValues>();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { mutate, isPending, isError, isSuccess } = usePostPolicies();

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("entity_code", state[state.length - 1]);
    formData.append("regulation_file", data.regulation_file[0]);
    formData.append(
      "regulation_file_translate",
      data.regulation_file_translate[0]
    );
    formData.append("regulation_name", data.regulation_name);
    formData.append("regulation_brief", data.regulation_brief);
    formData.append("datetime", dayjs(date).format("YYYY-MM-DD"));

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
              name="regulation_name"
              label="Regulation's Name"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            <FormTextInput
              name="regulation_bref"
              label="Regulation's Brief"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            Document
            <input
              {...register("regulation_file", {
                required: "Document file is required",
              })}
              type="file"
              accept=".pdf"
            />
            Translated Document
            <input
              {...register("regulation_file_translate", {
                required: "Document file is required",
              })}
              type="file"
              accept=".pdf"
            />
            <Box marginTop="16px">
              Regulation Effective Date
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
