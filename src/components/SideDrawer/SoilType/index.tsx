import FormTextInput from "../../common/form/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { usePostSoilType } from "../../../hooks/api";
import { PartialSilvanusGeoJson } from "../../../types";
import { Box, Snackbar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";

type FormValues = {
  soil_type: string;
  soil_description: string;
  shapefile: File[];
};

export default function SoilType({
  partialGeoJson,
  state,
}: {
  partialGeoJson: PartialSilvanusGeoJson | null;
  state: string[];
}) {
  const { watch, handleSubmit, register, ...rest } = useForm<FormValues>({
    defaultValues: {
      soil_type: "",
      soil_description: "",
    },
  });
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { mutate, isPending, isError, isSuccess } = usePostSoilType();
  const pilot_id = null; //TODO

  const onSubmit = (data: FormValues) => {
    if (partialGeoJson?.type) {
      mutate({
        type: partialGeoJson.type,
        geometry: {
          ...partialGeoJson.geometry,
          coordinates: partialGeoJson.geometry.coordinates.flat(),
        },
        properties: {
          // daterange: `${formattedStart}/${formattedEnd}`,
          soil_type: data.soil_type,
          soil_description: data.soil_description,
        },
      });
    } else if (state[state.length - 1]) {
      const form = new FormData();
      form.set("entity_code", state[state.length - 1]);
      form.set("soil_type", data.soil_type);
      form.set("soil_description", data.soil_description);
      form.set("datetime", dayjs(date).format("YYYY-MM-DD"));

      mutate(form);
    } else if (pilot_id) {
      const form = new FormData();
      form.set("pilot_id", pilot_id);
      form.set("soil_type", data.soil_type);
      form.set("soil_description", data.soil_description);
      form.set("datetime", dayjs(date).format("YYYY-MM-DD"));

      mutate(form);
    } else {
      const form = new FormData();
      form.set("shapefile", data.shapefile[0]);
      form.set("soil_type", data.soil_type);
      form.set("soil_description", data.soil_description);
      form.set("datetime", dayjs(date).format("YYYY-MM-DD"));

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
              name="soil_type"
              label="Soil Type"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            <FormTextInput
              name="soil_description"
              label="Soil Texture"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            <Box>
              Observation Date
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
