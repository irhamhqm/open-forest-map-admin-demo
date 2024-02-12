import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import CustomTabPanel from "../CustomTabPanel";
import FormTextInput from "../common/form/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import FormSelectInput from "../common/form/SelectInput";
import {
  useGetLocationServiceById,
  useGetLocationServicesByLevel,
} from "../../hooks/api";
import { LocationService } from "../../types";

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const textInputClass = "px-2.5 py-3 text-[#8898aa] border border-gray-400";
const selectInputClass =
  "border border-gray-400 mt-1 text-sm font-medium p-2 w-full";

type FormValues = {
  name: string;
  value: string;
  size: string;
  level0: string;
  level1: string;
  level2: string;
  level3: string;
};

export default function FireEventsInput() {
  const [value, setValue] = useState(0);
  const { watch, handleSubmit, ...rest } = useForm<FormValues>({
    defaultValues: {
      name: "",
      value: "",
      size: "",
      level0: "",
      level1: "",
      level2: "",
      level3: "",
    },
  });

  const servicesLevel0 = useGetLocationServicesByLevel({ level: 0 });
  const servicesLevel1 = useGetLocationServicesByLevel({
    level: 1,
    parent_id: Number(watch("level0")),
  });
  const servicesLevel2 = useGetLocationServicesByLevel({
    level: 2,
    parent_id: Number(watch("level1")),
  });
  const servicesLevel3 = useGetLocationServicesByLevel({
    level: 3,
    parent_id: Number(watch("level2")),
  });
  const serviceById = useGetLocationServiceById({ id: watch("level0") });

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FormValues) => {};

  return (
    <div className="overflow-y-auto h-[510px]">
      <span className="mb-2 text-[#212529]">Location</span>
      <Tabs
        value={value}
        onChange={(_, value) => setValue(value)}
      >
        <Tab
          label="Draw"
          value={0}
        />
        <Tab
          label="Administrative"
          value={1}
        />
      </Tabs>
      <FormProvider
        watch={watch}
        handleSubmit={handleSubmit}
        {...rest}
      >
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4">
            <CustomTabPanel
              value={value}
              index={0}
            >
              <div className="bg-green-500 text-sm font-medium p-4 mb-4 text-center">
                Use the drawing tools on the left.
              </div>
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={1}
            >
              <FormSelectInput
                htmlFor="level0"
                name="level0"
                label="Select Location"
                containerClass={containerClass}
                labelClass={labelClass}
                inputClass={selectInputClass}
                disabled={
                  servicesLevel0.isPending ||
                  servicesLevel0.isLoading ||
                  servicesLevel0.isError
                }
                namePropName="name"
                idPropName="regional_entity_id"
                data={servicesLevel0.data || []}
              />
              {!servicesLevel0.isPending &&
                !servicesLevel0.isLoading &&
                !servicesLevel0.isError &&
                servicesLevel0.data?.find(
                  (value: LocationService) =>
                    value.regional_entity_id === Number(watch("level0"))
                ) && (
                  <FormSelectInput
                    htmlFor="level1"
                    name="level1"
                    label="Select Location"
                    containerClass={containerClass}
                    labelClass={labelClass}
                    inputClass={selectInputClass}
                    disabled={
                      servicesLevel1.isPending ||
                      servicesLevel1.isLoading ||
                      servicesLevel1.isError
                    }
                    namePropName="name"
                    idPropName="regional_entity_id"
                    data={servicesLevel1.data || []}
                  />
                )}
              {/* <FormSelectInput
                htmlFor="level2"
                name="level2"
                label="Select Location"
                containerClass={containerClass}
                labelClass={labelClass}
                inputClass={selectInputClass}
                disabled={
                  servicesLevel2.isPending ||
                  servicesLevel2.isLoading ||
                  servicesLevel2.isError
                }
                namePropName="name"
                idPropName="regional_entity_id"
                data={servicesLevel2.data || []}
              />
              <FormSelectInput
                htmlFor="level3"
                name="level3"
                label="Select Location"
                containerClass={containerClass}
                labelClass={labelClass}
                inputClass={selectInputClass}
                disabled={
                  servicesLevel3.isPending ||
                  servicesLevel3.isLoading ||
                  servicesLevel3.isError
                }
                namePropName="name"
                idPropName="regional_entity_id"
                data={servicesLevel3.data || []}
              /> */}
            </CustomTabPanel>
          </div>
          <FormTextInput
            name="name"
            label="Name"
            containerClass={containerClass}
            labelClass={labelClass}
            inputClass={textInputClass}
          />
          <FormTextInput
            name="value"
            label="Value"
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
          <button
            className="bg-green-500 py-2 px-1"
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
