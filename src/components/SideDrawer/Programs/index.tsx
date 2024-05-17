import { FormProvider, useForm } from "react-hook-form";
import { usePostPrograms } from "../../../hooks/api";
import { Box, Snackbar } from "@mui/material";
import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import FormTextInput from "../../common/form/TextInput";
import { DatePicker } from "@mui/x-date-pickers";
import store from "store2";

type FormValues = {
  program_file: File[];
  program_engfile: File[];
  program_name: string;
  program_description: string;
  program_size: string;
  program_budget?: string;
  shapefile: File[];
};

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";

export default function Programs({ state }: { state: string[] }) {
  const { handleSubmit, watch, register, ...rest } = useForm<FormValues>();
  const { mutate, isPending, isError, isSuccess } = usePostPrograms();
  const [start, setStart] = useState<Dayjs | null>(dayjs());
  const [end, setEnd] = useState<Dayjs | null>(dayjs());
  const userData = store.get("user_data");
  const pilot_id = userData?.pilot_id;

  const formattedStart = useMemo(() => {
    return dayjs(start).format("YYYY-MM-DD");
  }, [start]);

  const formattedEnd = useMemo(() => {
    return dayjs(end).format("YYYY-MM-DD");
  }, [end]);

  const onSubmit = (data: FormValues) => {
    const form = new FormData();
    // if (pilot_id) {
    //   form.set("pilot_id", pilot_id);
    //   form.set("program_file", data.program_file[0]);
    //   form.set("program_engfile", data.program_engfile[0]);
    //   form.set("program_name", data.program_name);
    //   form.set("program_description", data.program_description);
    //   form.set("program_size", data.program_size);
    //   form.set("program_budget", data.program_budget || "");
    //   form.set("daterange", `${formattedStart}/${formattedEnd}`);
    // } else
    if (state[state.length - 1]) {
      // form.set("pilot_id", pilot_id);
      form.set("entity_code", state[state.length - 1]);
      form.set("program_file", data.program_file[0]);
      form.set("program_engfile", data.program_engfile[0]);
      form.set("program_name", data.program_name);
      form.set("program_description", data.program_description);
      form.set("program_size", data.program_size);
      form.set("program_budget", data.program_budget || "");
      form.set("daterange", `${formattedStart}/${formattedEnd}`);
      // } else if (data.shapefile && data.shapefile[0]) {
      //   // form.set("pilot_id", pilot_id);
      //   form.set("shapefile", data.shapefile[0]);
      //   form.set("program_file", data.program_file[0]);
      //   form.set("program_engfile", data.program_engfile[0]);
      //   form.set("program_name", data.program_name);
      //   form.set("program_description", data.program_description);
      //   form.set("program_size", data.program_size);
      //   form.set("program_budget", data.program_budget || "");
      //   form.set("daterange", `${formattedStart}/${formattedEnd}`);
    } else {
      form.set("pilot_id", pilot_id);
      form.set("program_file", data.program_file[0]);
      form.set("program_engfile", data.program_engfile[0]);
      form.set("program_name", data.program_name);
      form.set("program_description", data.program_description);
      form.set("program_size", data.program_size);
      form.set("program_budget", data.program_budget || "");
      form.set("daterange", `${formattedStart}/${formattedEnd}`);
    }
    mutate(form);
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
              name="program_name"
              label={
                <>
                  Programme Name{" "}
                  <span className="text-red-500">* (Required)</span>
                </>
              }
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              registerOption={{
                required: "Programme name is required",
              }}
            />
            <FormTextInput
              name="program_description"
              label={
                <>
                  Programme Description{" "}
                  <span className="text-red-500">* (Required)</span>
                </>
              }
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              registerOption={{
                required: "Programme description is required",
              }}
            />
            <FormTextInput
              name="program_size"
              label="Programme Size"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              type="number"
            />
            <FormTextInput
              name="program_budget"
              label="Programme Budget"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              type="number"
            />
            Document
            <input
              {...register("program_file")}
              type="file"
              accept=".pdf"
            />
            Document(English Version)
            <input
              {...register("program_engfile")}
              type="file"
              accept=".pdf"
            />
            <Box marginTop="16px">
              Programme effective date
              <>
                <span className="text-red-500">* (Required)</span>
              </>{" "}
              <br />
              Programme start date
              <DatePicker
                value={start}
                onChange={(value) => setStart(value)}
              />
              <br />
              Programme end date
              <DatePicker
                value={end}
                onChange={(value) => setEnd(value)}
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
