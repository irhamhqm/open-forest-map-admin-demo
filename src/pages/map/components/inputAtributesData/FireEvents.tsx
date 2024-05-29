import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select, { SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useState, useMemo } from "react";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from "dayjs";
import { usePostFireEvent } from "../../../../hooks/api";
import { Snackbar } from "@mui/material";


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
};


const FireEvents = ({
    administrativeAreaState
    }:{
    administrativeAreaState: string[];
    }) => {
    const [selectedFireIntensity, setSelectedFireIntensity] = useState<OptionRole | null>(null);
    const [fireStartDate, setFireStartDate] = useState<Dayjs | null>(dayjs());
    const [fireEndDate, setFireEndDate] = useState<Dayjs | null>(dayjs());

    const fireIntensity = [
        { value: "low", label: "Low Intensity" },
        { value: "moderate", label: "Moderate Intensity" },
        { value: "high", label: "High Intensity" },
    ];

    const handleFireIntensitySelection = (newValue: SingleValue<OptionRole>) => {
        setSelectedFireIntensity(newValue);
    };

    const formattedFireStartDate = useMemo(() => {
        return dayjs(fireStartDate).format("YYYY-MM-DD");
      }, [fireStartDate]);
    
    const formattedFireEndDate = useMemo(() => {
        return dayjs(fireEndDate).format("YYYY-MM-DD");
      }, [fireEndDate]);

    const saveFireEvents = usePostFireEvent();

    const onSubmitFireEvents = (values: any) => {
        if(administrativeAreaState[0] !== ""){
            const formFireEvents = new FormData();

            formFireEvents.set("entity_code", administrativeAreaState[administrativeAreaState.length - 1]);
            formFireEvents.set("daterange", `${formattedFireStartDate}/${formattedFireEndDate}`);
            formFireEvents.set("fire_intensity", selectedFireIntensity?.value || "low");
            formFireEvents.set("fire_size", values.fire_size || "0");
            formFireEvents.set("fire_type", values.fire_type);

    
            for (const entry of formFireEvents.entries()) {
                console.log(entry[0] + ': ' + entry[1]);
              } 
            
            // LET'S GOOOO!!!
            saveFireEvents.mutate(formFireEvents);
        }
    }

    console.log('saveFireEvents: ', saveFireEvents)

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitFireEvents}
            >
                <Form>
                    {/* FIRE SIZE */}
                    <div className="w-full px-3 mb-6 md:mb-4">
                        <label 
                            htmlFor="fire_size"
                            className="text-grey-darker mb-2 font-bold"
                        >
                            Fire Size (km²)
                        </label>
                        <Field
                            type="text"
                            id="fire_size"
                            name="fire_size"
                            placeholder="Put decimal number"
                            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="fire_size"
                            component="div"
                            className="text-red-500 text-xs italic"
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
                        <Field
                            type="text"
                            id="fire_type"
                            name="fire_type"
                            placeholder="Put Fire Type"
                            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="fire_type"
                            component="div"
                            className="text-red-500 text-xs italic"
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
                        <ErrorMessage
                            name="fire_intensity"
                            component="div"
                            className="text-red-500 text-xs italic"
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
                            onChange={(date) => setFireStartDate(date)}
                            className="w-full"
                        />
                        <ErrorMessage
                            name="fire_start_date"
                            component="div"
                            className="text-red-500 text-xs italic"
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
                            onChange={(date) => setFireEndDate(date)}
                            className="w-full"
                        />
                        <ErrorMessage
                            name="fire_end_date"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>

                    <button
                        type="submit"
                        className={"w-full justify-between bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer"}
                        // disabled={isSuccess}
                    >
                        Submit Data
                    </button>

                    <button
                        type="button"
                        className={"mt-4 w-full justify-between bg-orange-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer"}
                        onClick={()=>{console.log('Lihat Data...')}}
                    >
                        View Data
                    </button>
                </Form>
            </Formik>
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