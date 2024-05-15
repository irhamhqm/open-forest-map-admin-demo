import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useGetAllPilots } from "../../hooks/api/pilot";
import { useGetAllFeatures } from "../../hooks/api/feature";
import { useSignUp } from "../../hooks/api/auth";
import Alert from "@mui/material/Alert";
import axios from 'axios';
import Select, {ActionMeta,  MultiValue} from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


const initialValues = {
  user_name: "",
  user_email: "",
  user_password: "",
  user_display_name: "",
  user_affiliation: "",
  user_role: "",
  pilot_id: "",
};

const validationSchema = Yup.object({
  user_name: Yup.string().required("Required"),
  user_email: Yup.string().email("Invalid email format").required("Required"),
  user_password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  user_display_name: Yup.string().required("Required"),
  user_affiliation: Yup.string().required("Required"),
  // user_role: Yup.string().required('Required'),
  // pilot_id: Yup.string().required('Required'),
});

interface Option {
  label: string;
  value: number;
}

interface FormValues {
  selectedOption: string;
}

const SignUp = () => {
  const [selectedServices, setSelectedServices] = useState<Option[]>([]);
  const [availableServices, setAvaliableServices] = useState<Option[]>([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFeaturesListActive, setIsFeaturesListActive] =
    useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState("");
  const occupations = [
    {value:"firefighter", label: "Firefighter"},
    {value:"police", label: "Police"},
    {value:"major", label: "Major"},
    {value:"citizen", label: "Citizen"},
  ]

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onButtonClick = (values: any) => {
    const { feature_ids, ...payload } = values;
    payload["user_role"] = selectedRole;
    if (selectedRole === "client") {
      payload["feature_ids"] = feature_ids.join(", ");
      delete payload.pilot_id;
    } else {
      const allFeaturesId = dataGetAllFeatures?.data.map(
        (item) => item.feature_id
      );
      payload["feature_ids"] = allFeaturesId?.join(", ");
    }

    if (payload) {
      mutate(payload);
    }
  };

  const handleServiceSelection = (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    setSelectedServices(newValue as Option[])
  };

  const { data: dataGetAllPilots } = useGetAllPilots();
  const { data: dataGetAllFeatures, isSuccess: successGetAllFeatures } = useGetAllFeatures();
  const { mutate, isSuccess, isError, data: dataSignUp, error } = useSignUp();

  useEffect(()=>{
    const features: Option[] | undefined = dataGetAllFeatures?.data.map((item) => {
      return ({label:item.feature_name, value: item.feature_id})
    }) ?? []
    setAvaliableServices(features)
  },[
    successGetAllFeatures
  ])


  return (
    <div className="flex-col flex justify-center items-center overflow-y-auto">
      <img
        src={"/silvanus_icon.jpg"}
        className="w-48 h-auto"
      />
      <div>
        <div className="font-bold text-4xl mb-4 mt-[-60px]">Sign Up</div>
      </div>
      <div className="pb-4 w-1/2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onButtonClick}
        >
          <Form>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
              
              {/* USERNAME */}
              <div className="w-full px-3 mb-6 md:mb-4">
                <label
                  className="text-grey-darker mb-2 font-bold"
                  htmlFor="user_name"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="user_name"
                  name="user_name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="user_name"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* EMAIL */}
              <div className="w-full px-3 mb-6 md:mb-2">
                <label
                  className="text-grey-darker mb-2 font-bold"
                  htmlFor="user_email"
                >
                  E-Mail
                </label>
                <Field
                  type="email"
                  id="user_email"
                  name="user_email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="user_email"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* DISPLAY NAME */}
              <div className="w-full px-3 mb-6 md:mb-4">
                <label
                  className="text-grey-darker mb-2 font-bold"
                  htmlFor="user_display_name"
                >
                  Display Name
                </label>
                <Field
                  type="text"
                  id="user_display_name"
                  name="user_display_name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="user_display_name"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* USER AFFILIATION */}
              <div className="w-full px-3 mb-6 md:mb-4">
                <label
                  className="text-grey-darker mb-2 font-bold"
                  htmlFor="user_affiliation"
                >
                  User Affiliation
                </label>
                <Field
                  type="text"
                  id="user_affiliation"
                  name="user_affiliation"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="user_affiliation"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* USER ROLE */}
              <div className="w-full px-3 mb-6 md:mb-4">
                <label
                  className="text-grey-darker mb-2 font-bold"
                  htmlFor="user_role"
                >
                  User Role
                </label>
                <Field
                  value={selectedRole}
                  name="user_role"
                  as="select"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(event: any) => {
                    setSelectedRole(event.target.value);
                    setIsFeaturesListActive(event.target.value === "client");
                  }}
                >
                  <option
                    disabled={true}
                    value=""
                  >
                    Select A Role
                  </option>
                  <option
                    key="client"
                    value="client"
                  >
                    Client
                  </option>
                  <option
                    key="pilot_admin"
                    value="pilot_admin"
                  >
                    Pilot Admin
                  </option>
                </Field>
                <ErrorMessage
                  name="user_role"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* LAYANAN YANG DITAWARKAN */}
              {isFeaturesListActive && (
                <div className="w-full px-3 mb-6 md:mb-4">
                  <label
                    className="text-grey-darker mb-2 font-bold"
                    htmlFor="feature_ids"
                  >
                    Select Services
                  </label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={availableServices}
                    onChange={handleServiceSelection}
                    name="feature_ids"
                  />             
                  <ErrorMessage
                    name="feature_ids"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              )}

              {!isFeaturesListActive && (
                <>
                  {/* LAYANAN MULTILINGUAL */}
                  <div className="w-full px-3 mb-6 md:mb-4">
                    <label className="flex items-center space-x-2">
                      <Field 
                        // checked={true} 
                        className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" 
                        name="is_subscribe_mas" 
                        type="checkbox" />
                      <span 
                        className="ml-2 text-gray-700">
                          I would like to subscribe <b>Multilingual Alert System</b> service
                      </span>
                    </label>
                  </div>

                  {/* PILOT AREA */}
                  <div className="w-full px-3 mb-6 md:mb-4">
                    <label
                      className="text-grey-darker mb-2 font-bold"
                      htmlFor="pilot_id"
                    >
                      Pilot
                    </label>
                    <Field
                      name="pilot_id"
                      as="select"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option
                        disabled={true}
                        value=""
                      >
                        Select A Pilot
                      </option>
                      {dataGetAllPilots?.data?.map((pilot) => (
                        <option
                          key={pilot.pilot_id}
                          value={pilot.pilot_id}
                        >
                          {pilot.pilot_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="pilot_id"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </>
              )}

              {/* OCUPATION */}
              <div className="px-3 mb-6 md:mb-4">
                <label className="text-grey-darker mb-2 font-bold">
                  Occupation
                </label>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {occupations.map((item) => (
                    <Field name="selectedOption" key={'Field'+item.value}>
                    {(fieldProps: FieldProps<FormValues['selectedOption']>) => (
                      <label 
                        className="flex items-center p-4 bg-gray-200 rounded-lg cursor-pointer"
                        key={'label'+item.value}
                      >
                        <input
                          key={'radio' + item.value}
                          type="radio"
                          {...fieldProps.field}
                          value={item.value}
                          checked={fieldProps.field.value === item.value}
                          className="form-radio h-4 w-4 text-indigo-600 cursor-pointer"
                        />
                        <span className="ml-2" key={'span'+item.value}>{item.label}</span>
                      </label>
                      )}
                      </Field>
                    )
                  )}
                </div>
              </div>


              {/* PASSWORD */}
              <div className="w-full px-3 mb-6 md:mb-2">
                <div className="w-full">
                  <label
                    className="text-grey-darker mb-2 font-bold"
                    htmlFor="user_password"
                  >
                    Password
                  </label>
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    id="user_password"
                    name="user_password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="user_password"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                  <button
                    type="button"
                    className="px-3 text-gray-600 ml-auto"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={
                  isSuccess
                    ? "w-full justify-between bg-green-300 text-white font-bold py-2 px-4 rounded-lg text-xl"
                    : "w-full justify-between bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer"
                }
                disabled={isSuccess}
              >
                Sign Up
              </button>
              {isSuccess && (
                <Alert
                  variant="filled"
                  severity="success"
                  className="mt-6 w-full mt-10 rounded-lg"
                >
                  {dataSignUp.meta}
                  <br />
                  Please&nbsp;
                  <a
                    href="/signin"
                    className="text-blue-400 hover:text-orange-500 font-bold"
                  >
                    click here
                  </a>
                  &nbsp;to redirect you to the
                  <br />
                  Sign Up page
                </Alert>
              )}
              {isError && (
              <Alert
                variant="filled"
                severity="error"
                className="w-full mt-10 rounded-lg"
              >
                {(axios.isAxiosError(error) && error.response) ?  (
                <div>
                  <p>{error.response.data.meta}</p>
                </div>
                ) : (
                  <>
                    Unexpected error occured
                  </>
                )}
              </Alert>
            )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
