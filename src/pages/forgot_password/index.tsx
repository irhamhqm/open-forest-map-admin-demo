import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import axios from 'axios';
import { Snackbar } from "@mui/material";
import { useForgotPassword } from "../../hooks/api/auth";

const initialValues = {
  user_email: "",
};

const validationSchema = Yup.object({
  user_email: Yup.string().email("Invalid email format").required("Required"),
});

const ForgotPassword = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageAlert, setMessageAllert] = useState("");

  const { 
    mutate: mutateForgotPassword, 
    isSuccess: isSuccessForgotPassword, 
    isError: isErrorForgotPassword, 
    error: errorForgotPassword,
  } = useForgotPassword();

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
    setTimeout(() => {
      setOpenSnackBar(false);
    }, 5000); // Menutup snackbar setelah 5 detik
  };

  const onButtonClick = (values: any) => {
    if (values) {
      if(!values.iam_sure) {
        setMessageAllert("Please make sure that this is your valid email address");
        handleOpenSnackBar();
        return;
      }

      // LET'S GOOO!
      mutateForgotPassword(
        {
          user_email: values.user_email
        }
      );
    }
  };


  return (
    <div className="h-screen flex-col flex justify-center items-center md:mt-[-60px]">
      
      <img src={"/silvanus_icon.jpg"} />
      <div>
        <div className="font-bold text-4xl mb-4 mt-[-60px]">
          <p className="text-center">
          Password Reset Request
          </p>
        </div>
      </div>
      <div className="pb-4 md:w-1/4">
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
                  htmlFor="user_email"
                  className="text-grey-darker mb-2 font-bold"
                >
                  E-mail Address
                </label>
                <Field
                  type="text"
                  id="user_email"
                  name="user_email"
                  placeholder="Enter your valid email address"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="user_email"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-4">
                <label className="flex items-center space-x-2">
                  <Field
                    // checked={true}
                    className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    name="iam_sure"
                    type="checkbox"
                  />
                  <span className="ml-2 text-gray-700">
                    I'm sure this is my {" "}
                    <b>valid email address</b>
                  </span>
                </label>
              </div>
              
              <div className="w-full px-3 mb-6 md:mb-2">
                <button
                    type="submit"
                    className=
                    {isSuccessForgotPassword? 
                      "w-full justify-between bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-xl":
                      "w-full justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer"
                    }
                    disabled={isSuccessForgotPassword}
                >
                  Send Request
                </button>
              </div>
            </div>

            {isSuccessForgotPassword && (
              <Alert
                variant="filled"
                severity="success"
                className="mt-6 w-full mt-10 rounded-lg"
              >
                Password Reset Token has been sent to your email.
                <br />
                Please check it.
              </Alert>
            )}
            
            {isErrorForgotPassword && (
              <Alert
                variant="filled"
                severity="error"
                className="w-full mt-10 rounded-lg"
              >
                {(axios.isAxiosError(errorForgotPassword) && errorForgotPassword.response) ?  (
                <div>
                  <p>
                    {errorForgotPassword.response.data.meta}{'!'}
                    <br />
                    I think it's better for you to&nbsp;
                    <a
                      href="/signup"
                      className="text-blue-400 hover:text-orange-500 font-bold"
                    >
                    register
                    </a>&nbsp;your new account
                  </p>
                </div>
                ) : (
                  <>
                    Unexpected error occured
                  </>
                )}
              </Alert>
            )}

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
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
