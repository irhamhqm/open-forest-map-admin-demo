import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import axios from 'axios';
import { useResetPassword } from "../../hooks/api/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";

const initialValues = {
  new_password: "",
  retype_password: "",
};

const validationSchema = Yup.object({
  new_password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  retype_password: Yup.string()
    .oneOf([Yup.ref('new_password'), undefined], 'Passwords must match')
    .required('Retype password is required'),
});

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const { 
    mutate: mutateResetPassword, 
    isSuccess: isSuccessResetPassword, 
    isError: isErrorResetPassword, 
    error: errorResetPassword,
  } = useResetPassword();


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRetypePasswordVisibility = () => {
    setRetypePasswordVisible(!retypePasswordVisible);
  };

  const onButtonClick = (values: any) => {
    if (values) {      
      // LET'S GOOO!
      mutateResetPassword(
        {
          token: token || '',
          new_password: values.new_password
        }
      );
    }
  };


  return (
    <div className="h-screen flex-col flex justify-center items-center md:mt-[-60px]">
      
      <img src={"/silvanus_icon.jpg"} />
      <div>
        <div className="font-bold text-4xl mb-4 mt-[-60px]">Password Reset</div>
      </div>
      <div className="pb-4 md:w-1/4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onButtonClick}
        >
          <Form>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
              {/* New Password */}
              <div className="w-full px-3 mb-6 md:mb-4">
                <label 
                  htmlFor="new_password"
                  className="text-grey-darker mb-2 font-bold"
                >
                  New Password
                </label>
                <div className="flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <Field
                      type={passwordVisible ? "text" : "password"}
                      id="new_password"
                      name="new_password"
                      placeholder="Type your new password here"
                      className="w-full border-none p-2 bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    className="px-3 text-gray-600 ml-auto"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
                
                <ErrorMessage
                  name="new_password"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
                
              </div>

              {/* Retype Password */}
              <div className="w-full px-3 mb-6 md:mb-4">
                <label 
                  htmlFor="retype_password"
                  className="text-grey-darker mb-2 font-bold"
                >
                  Retype New Password
                </label>
                <div className="flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <Field
                      type={retypePasswordVisible ? "text" : "password"}
                      id="retype_password"
                      name="retype_password"
                      placeholder="Retype your new password here"
                      className="w-full border-none p-2 bg-transparent focus:outline-none"
                  />

                  <button
                    type="button"
                    className="px-3 text-gray-600 ml-auto"
                    onClick={toggleRetypePasswordVisibility}
                  >
                    {retypePasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
                
                <ErrorMessage
                  name="retype_password"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-2">
                <button
                    type="submit"
                    className=
                    {isSuccessResetPassword? 
                      "w-full justify-between bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-xl":
                      "w-full justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer"
                    }
                    disabled={isSuccessResetPassword}
                >
                  Reset My Password
                </button>
              </div>
            </div>

            {isSuccessResetPassword && (
              <Alert
                variant="filled"
                severity="success"
                className="mt-6 w-full mt-10 rounded-lg"
              >
                <p>
                Your password has been successfully reset. Please go to the&nbsp; 
                <a
                  href="/signin"
                  className="text-blue-400 hover:text-orange-500 font-bold"
                >
                  Sign In
                </a>&nbsp;page
                </p>
              </Alert>
            )}
            
            {isErrorResetPassword && (
              <Alert
                variant="filled"
                severity="error"
                className="w-full mt-10 rounded-lg"
              >
                {(axios.isAxiosError(errorResetPassword) && errorResetPassword.response) ?  (
                <div>
                  <p>{errorResetPassword.response.data.meta}</p>
                </div>
                ) : (
                  <>
                    Unexpected error occured
                  </>
                )}
              </Alert>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
