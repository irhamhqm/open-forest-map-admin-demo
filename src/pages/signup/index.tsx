import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useGetAllPilots } from "../../hooks/api/pilot";
import { useGetAllFeatures } from "../../hooks/api/feature";
import { useSignUp } from "../../hooks/api/auth";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Select, { MultiValue, SingleValue } from "react-select";
import { Snackbar } from "@mui/material";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const initialValues = {
  user_name: "",
  user_email: "",
  user_password: "",
  user_display_name: "",
  user_affiliation: "",
  user_role: "",
  pilot_id: "",
  selectedOccupation: "citizen",
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

interface OptionRole {
  label: string;
  value: string;
}

interface FormValues {
  selectedOption: string;
}

const SignUp = () => {
  const [selectedServices, setSelectedServices] = useState<Option[]>([]);
  const [availableServices, setAvaliableServices] = useState<Option[]>([]);
  const [selectedPilot, setSelectedPilot] = useState<Option | null>(null);
  const [selectedRole, setSelectedRole] = useState<OptionRole | null>(null);
  const [availablePilots, setAvaliablePilots] = useState<Option[]>([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFeaturesListActive, setIsFeaturesListActive] =
    useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageAlert, setMessageAllert] = useState("");

  const handleOpen = () => {
    setOpenSnackBar(true);
    setTimeout(() => {
      setOpenSnackBar(false);
    }, 3000); // Menutup snackbar setelah 3 detik
  };

  const occupations = [
    { value: "firefighter", label: "Firefighter" },
    { value: "police", label: "Police" },
    { value: "major", label: "Major" },
    { value: "citizen", label: "Citizen" },
  ];
  const roles = [
    { value: "client", label: "Client" },
    { value: "pilot_admin", label: "Pilot Admin" },
  ];

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onButtonClick = (values: any) => {
    const payload = {
      user_name: values.user_name,
      user_email: values.user_email,
      user_password: values.user_password,
      user_display_name: values.user_display_name,
      user_affiliation: values.user_affiliation,
      user_role: "",
      user_occupation: values.selectedOccupation,
      pilot_id: "",
      feature_ids: "",
    };

    if (!selectedRole) {
      setMessageAllert("Please select a user role");
      handleOpen();
      return;
    } else {
      payload.user_role = selectedRole.value;
      if (selectedRole.value === "client") {
        if (selectedServices.length === 0) {
          setMessageAllert(
            "Please select at least a service you wanted to subscribe"
          );
          handleOpen();
          return;
        } else {
          payload.feature_ids = selectedServices
            .map((item) => item.value)
            .join(", ");
        }
      } else {
        let pilotAdminFeatures = dataGetAllFeatures?.data.filter(
          (item) =>
            item.feature_name.toLocaleLowerCase() !==
            "multilingual alert system"
        );
        if (values.is_subscribe_mas) {
          const masFeature =
            dataGetAllFeatures?.data.filter(
              (item) =>
                item.feature_name.toLocaleLowerCase() ===
                "multilingual alert system"
            ) ?? [];
          pilotAdminFeatures = pilotAdminFeatures?.concat(masFeature);
        }
        payload.feature_ids =
          pilotAdminFeatures?.map((item) => item.feature_id).join(", ") ?? "";
      }
    }

    if (!selectedPilot) {
      setMessageAllert("Please select a pilot area");
      handleOpen();
      return;
    } else {
      payload.pilot_id = selectedPilot.value + "";
    }

    //LET'S GO....
    mutate(payload);
  };

  const handleRoleSelection = (newValue: SingleValue<OptionRole>) => {
    setSelectedRole(newValue);
    if (newValue?.value === "client") {
      setIsFeaturesListActive(true);
    } else {
      setIsFeaturesListActive(false);
    }
  };

  const handleServiceSelection = (newValue: MultiValue<Option>) => {
    setSelectedServices(newValue as Option[]);
  };

  const handlePilotSelection = (newValue: SingleValue<Option>) => {
    setSelectedPilot(newValue);
  };

  const { data: dataGetAllPilots, isSuccess: successGetAllPilots } =
    useGetAllPilots();
  const { data: dataGetAllFeatures, isSuccess: successGetAllFeatures } =
    useGetAllFeatures();
  const { mutate, isSuccess, isError, data: dataSignUp, error } = useSignUp();

  useEffect(() => {
    const features: Option[] | undefined =
      dataGetAllFeatures?.data.map((item) => {
        return { label: item.feature_name, value: item.feature_id };
      }) ?? [];
    setAvaliableServices(features);
  }, [successGetAllFeatures]);

  useEffect(() => {
    const pilots: Option[] | undefined =
      dataGetAllPilots?.data?.map((item) => {
        return { label: item.pilot_name, value: item.pilot_id };
      }) ?? [];
    setAvaliablePilots(pilots);
  }, [successGetAllPilots]);

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
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={roles}
                  onChange={handleRoleSelection as any}
                  isClearable
                  name="user_role"
                />
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
                    onChange={handleServiceSelection as any}
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
                        type="checkbox"
                      />
                      <span className="ml-2 text-gray-700">
                        I would like to subscribe{" "}
                        <b>Multilingual Forest Fire Alert System</b> service
                      </span>
                    </label>
                  </div>
                </>
              )}

              {/* PILOT AREA */}
              <div className="w-full px-3 mb-6 md:mb-4">
                <label
                  className="text-grey-darker mb-2 font-bold"
                  htmlFor="pilot_id"
                >
                  Pilot
                </label>
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={availablePilots}
                  onChange={handlePilotSelection as any}
                  isClearable
                  name="pilot_id"
                />
                <ErrorMessage
                  name="pilot_id"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* OCUPATION */}
              <div className="px-3 mb-6 md:mb-4">
                <label className="text-grey-darker mb-2 font-bold">
                  Occupation
                </label>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {occupations.map((item) => (
                    <Field
                      name="selectedOccupation"
                      key={"Field" + item.value}
                    >
                      {(
                        fieldProps: FieldProps<FormValues["selectedOption"]>
                      ) => (
                        <label
                          className="flex items-center p-4 bg-gray-200 rounded-lg cursor-pointer"
                          key={"label" + item.value}
                        >
                          <input
                            key={"radio" + item.value}
                            type="radio"
                            {...fieldProps.field}
                            value={item.value}
                            checked={fieldProps.field.value === item.value}
                            className="form-radio h-4 w-4 text-indigo-600 cursor-pointer"
                          />
                          <span
                            className="ml-2"
                            key={"span" + item.value}
                          >
                            {item.label}
                          </span>
                        </label>
                      )}
                    </Field>
                  ))}
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
                  {axios.isAxiosError(error) && error.response ? (
                    <div>
                      <p>{error.response.data.meta}</p>
                    </div>
                  ) : (
                    <>Unexpected error occured</>
                  )}
                </Alert>
              )}
            </div>
          </Form>
        </Formik>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          severity="error"
          onClose={() => setOpenSnackBar(false)}
        >
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
