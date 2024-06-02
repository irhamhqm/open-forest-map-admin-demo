import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useState, useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from "dayjs";
import { usePostFireEvent } from "../../../../hooks/api";
import { Snackbar } from "@mui/material";
import { PartialSilvanusGeoJson } from "../../../../types";
import { TextField } from "@mui/material";

const validationSchema = Yup.object({
    fire_size: Yup.string().matches(/^\d*\.?\d+$/, 'Must be a decimal number'),
});

const animatedComponents = makeAnimated();

interface OptionRole {
    label: string;
    value: string;
  }

const initialValues = {
    fire_size: "0",
    fire_type: "",
    fire_cause: "prescribed",
    fire_intensity: "low",
    fire_start_date: dayjs().format("YYYY-MM-DD"),
    fire_end_date: dayjs().format("YYYY-MM-DD"),
};


const FireEvents = ({
    activeTab,
    administrativeAreaState,
    partialGeoJson
    }:{
    activeTab: number;
    administrativeAreaState: string[];
    partialGeoJson: PartialSilvanusGeoJson | null;
    }) => {
    const [fireStartDate, setFireStartDate] = useState<Dayjs | null>(dayjs());
    const [fireEndDate, setFireEndDate] = useState<Dayjs | null>(dayjs());

    const fireIntensity = [
        { value: "low", label: "Low Intensity" },
        { value: "moderate", label: "Moderate Intensity" },
        { value: "high", label: "High Intensity" },
    ];

    const fireCause = [
        { value: "prescribed", label: "Prescribed" },
        { value: "wildfire", label: "Wild Fire" },
        // { value: "unknown", label: "Unknown" },
    ];

    const handleFireIntensitySelection = (newValue: SingleValue<OptionRole>) => {
        formik.setFieldValue("fire_intensity", newValue?.value || "low");
    };

    const handleFireCauseSelection = (newValue: SingleValue<OptionRole>) => {
        formik.setFieldValue("fire_cause", newValue?.value || "unknown");
    };

    
    const saveFireEvents = usePostFireEvent();

    const onSubmitFireEvents = () => {
        if(activeTab === 0 && administrativeAreaState[0] !== ""){
            const formFireEvents = new FormData();

            formFireEvents.set("entity_code", administrativeAreaState[administrativeAreaState.length - 1]);
            formFireEvents.set("daterange", `${formik.values.fire_start_date}/${formik.values.fire_end_date}`);
            formFireEvents.set("fire_intensity", formik.values.fire_intensity);
            formFireEvents.set("fire_cause", formik.values.fire_cause);
            formFireEvents.set("fire_size", formik.values.fire_size);
            formFireEvents.set("fire_type", formik.values.fire_type);

    
            // for (const entry of formFireEvents.entries()) {
            //     console.log(entry[0] + ': ' + entry[1]);
            //   } 
            
            // LET'S GOOOO!!!
            saveFireEvents.mutate(formFireEvents);
        }

        if(activeTab === 1 && partialGeoJson?.geometry.type){
            saveFireEvents.mutate({
                type: partialGeoJson.type,
                geometry: {
                  ...partialGeoJson.geometry,
                  coordinates: partialGeoJson.geometry.coordinates,
                },
                properties: {
                  daterange: `${formik.values.fire_start_date}/${formik.values.fire_end_date}`,
                  fire_intensity: formik.values.fire_intensity,
                  fire_cause: formik.values.fire_cause,
                  fire_size: formik.values.fire_size,
                  fire_type: formik.values.fire_type,
                },
              });
        }
    }


    
    useEffect(() => {     
        formik.setFieldValue('fire_size', partialGeoJson?.area || '0');
    }, [partialGeoJson]);

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: onSubmitFireEvents,
    });

    return (
        <div>
            {/* FIRE SIZE */}
            <div className="w-full px-3 mb-6 md:mb-4">
                <label 
                    htmlFor="fire_size"
                    className="text-grey-darker mb-2 font-bold"
                >
                    Fire Size (km²)
                </label>
                <TextField
                    id="fire_size"
                    name="fire_size"
                    placeholder="Put decimal number"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.fire_size}
                    onChange={formik.handleChange}
                    error={!!formik.errors.fire_size}
                    helperText={formik.errors.fire_size}
                    autoComplete="off"
                />
            </div>

            {/* FIRE TYPE */}
            <div className="w-full px-3 mb-6 md:mb-4">
                <label 
                    htmlFor="fire_type"
                    className="text-grey-darker mb-2 font-bold"
                >
                    Fire Type
                </label>
                <TextField
                    id="fire_type"
                    name="fire_type"
                    placeholder="Put Fire Type"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formik.values.fire_type}
                    onChange={formik.handleChange}
                    error={!!formik.errors.fire_type}
                    helperText={formik.errors.fire_type}
                    autoComplete="off"
                />
            </div>
            {/* FIRE CAUSE */}
            <div className="w-full px-3 mb-6 md:mb-4">
                <label 
                    htmlFor="fire_cause"
                    className="text-grey-darker mb-2 font-bold"
                >
                    Fire Cause
                </label>
                <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={fireCause}
                    onChange={handleFireCauseSelection as any}
                    isClearable
                    name="fire_cause"
                />
            </div>
            {/* FIRE INTENSITY */}
            <div className="w-full px-3 mb-6 md:mb-4">
                <label 
                    htmlFor="fire_intensity"
                    className="text-grey-darker mb-2 font-bold"
                >
                    Fire Intensity
                </label>
                <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={fireIntensity}
                    onChange={handleFireIntensitySelection as any}
                    isClearable
                    name="fire_intensity"
                />
            </div>
            {/* Fire Start Date */}
            <div className="w-full px-3 mb-6 md:mb-4">
                <label 
                    htmlFor="fire_start_date"
                    className="text-grey-darker mb-2 font-bold"
                >
                    Fire Start Date <span className="text-red-500 text-sm">* (Required)</span>
                </label>
                <DatePicker
                    name="fire_start_date"
                    value={fireStartDate}
                    onChange={(date) => {
                        setFireStartDate(date);
                        formik.setFieldValue("fire_start_date", dayjs(date).format("YYYY-MM-DD"));
                    }}
                    className="w-full"
                />
            </div>
            {/* Fire End Date */}
            <div className="w-full px-3 mb-6 md:mb-4">
                <label 
                    htmlFor="fire_end_date"
                    className="text-grey-darker mb-2 font-bold"
                >
                    Fire End Date <span className="text-red-500 text-sm">* (Required)</span>
                </label>
                <DatePicker
                    name="fire_end_date"
                    value={fireEndDate}
                    onChange={(date) => {
                        setFireEndDate(date);
                        formik.setFieldValue("fire_end_date", dayjs(date).format("YYYY-MM-DD"));
                    }}
                    className="w-full"
                />
            </div>
            <button
                type="button"
                className={"w-full justify-between bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer"}
                // disabled={isSuccess}
                onClick={formik.handleSubmit as any}
            >
                Submit Data
            </button>

            <button
                type="button"
                className={"mt-4 w-full justify-between bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer"}
                onClick={()=>{console.log('Lihat Data...')}}
            >
                View Data
            </button>

            <Snackbar
                open={saveFireEvents.isSuccess}
                autoHideDuration={3000}
                message="Succesfully added new data."
            />
            <Snackbar
                open={saveFireEvents.isError}
                autoHideDuration={3000}
                message={`An error occured`}
            />
        </div>
    );
};
export default FireEvents;