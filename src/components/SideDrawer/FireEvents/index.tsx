import { useMemo, useState } from "react";
import FormTextInput from "../../common/form/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { PartialSilvanusGeoJson } from "../../../types";
import { usePostFireEvent } from "../../../hooks/api";
import { Box, Snackbar } from "@mui/material";

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";
const selectInputClass =
  "border border-gray-400 mt-1 text-sm font-medium p-2 w-full";

type FormValues = {
  fire_severity: "low" | "medium" | "high";
  fire_size: string;
  shapefile: File[];
};

export default function FireEvents({
  partialGeoJson,
}: {
  partialGeoJson: PartialSilvanusGeoJson | null;
}) {
  const { watch, handleSubmit, register, ...rest } = useForm<FormValues>({
    defaultValues: {
      fire_severity: "low",
      fire_size: "",
    },
  });
  const [start, setStart] = useState<Dayjs | null>(dayjs());
  const [end, setEnd] = useState<Dayjs | null>(dayjs());

  const formattedStart = useMemo(() => {
    return dayjs(start).format("YYYY-MM-DD");
  }, [start]);

  const formattedEnd = useMemo(() => {
    return dayjs(end).format("YYYY-MM-DD");
  }, [end]);

  const { mutate, isPending, isSuccess, isError } = usePostFireEvent();

  const onSubmit = (data: FormValues) => {
    if (partialGeoJson?.type) {
      mutate({
        type: partialGeoJson.type,
        geometry: {
          ...partialGeoJson.geometry,
          coordinates: partialGeoJson.geometry.coordinates.flat(),
        },
        properties: {
          daterange: `${formattedStart}/${formattedEnd}`,
          fire_severity: data.fire_severity,
          fire_size: Number(data.fire_size),
        },
      });
    } else {
      const form = new FormData();
      form.set("daterange", `${formattedStart}/${formattedEnd}`);
      form.set("fire_severity", data.fire_severity);
      form.set("fire_size", data.fire_size);
      form.set("shapefile", data.shapefile[0]);

      mutate(form);
    }
  };

  return (
    <div className="overflow-y-auto">
      {isPending ? (
        <img src={"/spinner.svg"} />
      ) : (
        <FormProvider
          watch={watch}
          handleSubmit={handleSubmit}
          register={register}
          {...rest}
        >
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            SHP File
            <input
              {...register("shapefile")}
              type="file"
              accept=".zip"
              disabled={Boolean(partialGeoJson?.type)}
            />
            <FormTextInput
              name="fire_size"
              label="Fire Size (km²)"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              type="number"
            />
            <div className={`${containerClass} flex flex-col`}>
              <label
                className={labelClass}
                htmlFor="fire_severity"
              >
                Fire Severity
              </label>
              <select
                id="fire_severity"
                className={`${selectInputClass} disabled:bg-[#f2f2f2]`}
                {...register}
              >
                <option
                  disabled
                  hidden
                  value=""
                >
                  Select
                </option>
                <option value="low">Low Intensity</option>
                <option value="medium">Medium Intensity</option>
                <option value="high">High Intensity</option>
              </select>
            </div>
            <Box>
              Fire start date
              <DatePicker
                value={start}
                onChange={(value) => setStart(value)}
              />
              <br />
              Fire end date
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
