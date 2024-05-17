import { FormProvider, useForm } from "react-hook-form";
import { usePostPolicies } from "../../../hooks/api";
import { Box, Snackbar } from "@mui/material";
import FormTextInput from "../../common/form/TextInput";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import store from "store2";

type FormValues = {
  regulation_file: File[];
  regulation_file_translate: File[];
  regulation_name: string;
  regulation_description: string;
  shapefile: File[];
};

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";

export default function Policies({ state }: { state: string[] }) {
  const { handleSubmit, watch, register, ...rest } = useForm<FormValues>();
  const { mutate, isPending, isError, isSuccess } = usePostPolicies();
  // const [start, setStart] = useState<Dayjs | null>(dayjs());
  // const [end, setEnd] = useState<Dayjs | null>(dayjs());
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const userData = store.get("user_data");
  const pilot_id = userData?.pilot_id;

  // const formattedStart = useMemo(() => {
  //   return dayjs(start).format("YYYY-MM-DD");
  // }, [start]);

  // const formattedEnd = useMemo(() => {
  //   return dayjs(end).format("YYYY-MM-DD");
  // }, [end]);

  const onSubmit = (data: FormValues) => {
    const form = new FormData();

    if (state[state.length - 1]) {
      // form.set("pilot_id", pilot_id);
      form.set("entity_code", state[state.length - 1]);
      form.set("regulation_file", data.regulation_file[0]);
      form.set("regulation_engfile", data.regulation_file_translate[0]);
      form.set("regulation_name", data.regulation_name);
      form.set("regulation_description", data.regulation_description);
      // form.set("daterange", `${formattedStart}/${formattedEnd}`);
      form.set("datetime", dayjs(date).format("YYYY-MM-DD"));
      // } else if (data.shapefile && data.shapefile[0]) {
      //   // form.set("pilot_id", pilot_id);
      //   form.set("shapefile", data.shapefile[0]);
      //   form.set("regulation_file", data.regulation_file[0]);
      //   form.set("regulation_engfile", data.regulation_file_translate[0]);
      //   form.set("regulation_name", data.regulation_name);
      //   form.set("regulation_description", data.regulation_description);
      //   // form.set("daterange", `${formattedStart}/${formattedEnd}`);
      //   form.set("datetime", dayjs(date).format("YYYY-MM-DD"));
    } else {
      form.set("pilot_id", pilot_id);
      form.set("regulation_file", data.regulation_file[0]);
      form.set("regulation_engfile", data.regulation_file_translate[0]);
      form.set("regulation_name", data.regulation_name);
      form.set("regulation_description", data.regulation_description);
      // form.set("daterange", `${formattedStart}/${formattedEnd}`);
      form.set("datetime", dayjs(date).format("YYYY-MM-DD"));
    }
    mutate(form);

    // }
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
            {/* SHP File
            <input
              {...register("shapefile")}
              type="file"
              accept=".zip"
              disabled={Boolean(state[state.length - 1])}
            /> */}
            <FormTextInput
              name="regulation_name"
              label={
                <>
                  Regulation's Name
                  <span className="text-red-500">* (Required)</span>
                </>
              }
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              registerOption={{
                required: "Regulation's name is required",
              }}
            />
            <FormTextInput
              name="regulation_description"
              label={
                <>
                  Regulation's Description
                  <span className="text-red-500">* (Required)</span>
                </>
              }
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              registerOption={{
                required: "Regulation's description is required",
              }}
            />
            Document
            <span className="text-red-500">* (Required)</span>
            <input
              {...register("regulation_file", {
                required: "Document file is required",
              })}
              type="file"
              accept=".pdf"
            />
            Document(English Version)
            <input
              {...register("regulation_file_translate")}
              type="file"
              accept=".pdf"
            />
            <Box marginTop="16px">
              Regulation effective date
              <span className="text-red-500">* (Required)</span>
              <br />
              <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
              />
              {/* Regulation start date
              <DatePicker
                value={start}
                onChange={(value) => setStart(value)}
              />
              <br />
              Regulation end date
              <DatePicker
                value={end}
                onChange={(value) => setEnd(value)}
              /> */}
            </Box>
            <button
              className="bg-green-500 py-2 px-1 mt-6 disabled:bg-gray-300"
              type="submit"
              value="submit"
              disabled={!state[state.length - 1]}
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
