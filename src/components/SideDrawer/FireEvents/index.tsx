import { useState } from "react";
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

type FormValues = {
  name: string;
  value: string;
  size: string;
};

export default function FireEvents({
  partialGeoJson,
}: {
  partialGeoJson: PartialSilvanusGeoJson;
}) {
  const { watch, handleSubmit, ...rest } = useForm<FormValues>({
    defaultValues: {
      name: "",
      value: "",
      size: "",
    },
  });
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const { mutate, isPending, isSuccess, isError } = usePostFireEvent();

  const onSubmit = (data: FormValues) => {
    console.log(data, partialGeoJson);
    const { type } = partialGeoJson;
    console.log(data);

    mutate({
      type,
      geometry: { ...partialGeoJson.geometry },
      properties: {
        datetime: date?.unix() || dayjs().unix(),
        name: data.name,
        value: Number(data.value),
        size: Number(data.size),
      },
    });
  };

  return (
    <div className="overflow-y-auto">
      {isPending ? (
        <img src={"/spinner.svg"} />
      ) : (
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
              name="value"
              label="Fire Severity"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            <FormTextInput
              name="size"
              label="Size"
              containerClass={containerClass}
              labelClass={labelClass}
              inputClass={textInputClass}
            />
            <Box>
              Date
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
