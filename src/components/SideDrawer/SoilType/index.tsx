import FormTextInput from "../../common/form/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { usePostSoilType } from "../../../hooks/api";
import { PartialSilvanusGeoJson } from "../../../types";
import { Box, Snackbar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import store from "store2";

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "p-2 text-[#8898aa] border border-gray-400";

type FormValues = {
  soil_type: string;
  soil_texture: string;
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
      soil_texture: "",
    },
  });
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { mutate, isPending, isError, isSuccess } = usePostSoilType();
  const userData = store.get("user_data");
  const pilot_id = userData?.pilot_id;

  const onSubmit = (data: FormValues) => {
    if (partialGeoJson?.geometry.type) {
      mutate({
        type: partialGeoJson.type,
        geometry: {
          ...partialGeoJson.geometry,
          coordinates: partialGeoJson.geometry.coordinates,
        },
        properties: {
          // daterange: `${formattedStart}/${formattedEnd}`,
          soil_type: data.soil_type,
          soil_texture: data.soil_texture,
          datetime: dayjs(date).format("YYYY-MM-DD"),
          // pilot_id,
        },
      });
    } else if (state[state.length - 1]) {
      const form = new FormData();
      form.set("pilot_id", pilot_id);
      form.set("entity_code", state[state.length - 1]);
      form.set("soil_type", data.soil_type);
      form.set("soil_texture", data.soil_texture);
      form.set("datetime", dayjs(date).format("YYYY-MM-DD"));

      mutate(form);
    }
    // } else if (pilot_id) {
    //   const form = new FormData();
    //   form.set("pilot_id", pilot_id);
    //   form.set("soil_type", data.soil_type);
    //   form.set("soil_texture", data.soil_texture);
    //   form.set("datetime", dayjs(date).format("YYYY-MM-DD"));

    //   mutate(form);
    // } else {
    //   const form = new FormData();
    //   form.set("pilot_id", pilot_id);
    //   form.set("shapefile", data.shapefile[0]);
    //   form.set("soil_type", data.soil_type);
    //   form.set("soil_texture", data.soil_texture);
    //   form.set("datetime", dayjs(date).format("YYYY-MM-DD"));

    //   mutate(form);
    // }
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
            {/* SHP File
            <input
              {...register("shapefile")}
              type="file"
              accept=".zip"
              disabled={Boolean(partialGeoJson?.type)}
            /> */}
            <FormTextInput
              name="soil_type"
              label={
                <>
                  Soil Type <span className="text-red-500">* (Required)</span>
                </>
              }
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              registerOption={{
                required: "Soil type name is required",
              }}
            />
            <FormTextInput
              name="soil_texture"
              label={
                <>
                  Soil Texture<span className="text-red-500">* (Required)</span>
                </>
              }
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
              registerOption={{
                required: "Soil texture name is required",
              }}
            />
            <Box>
              Observation Date{" "}
              <>
                <span className="text-red-500">* (Required)</span>
              </>
              <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
              />
            </Box>
            <button
              className="bg-green-500 py-2 px-1 mt-6 disabled:bg-gray-300"
              type="submit"
              value="submit"
              disabled={
                !partialGeoJson?.geometry.type && !state[state.length - 1]
              }
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
