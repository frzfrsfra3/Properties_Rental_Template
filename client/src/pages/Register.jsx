import { useEffect, useState, useCallback } from "react";
import {
  Logo,
  FormTextField,
  FormPasswordField,
  FormSelectField,
  AlertToast,
  DatePicker,
  CountrySelectField,
  LanguageSwitcher
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  registerOwner,
  registerTenant,
  clearAlert,
  stateClear,
  createAlert,
} from "../features/auth/authSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import registerImg from "../assets/images/registerImg.svg";
import { Button, CircularProgress } from "@mui/material";
import moment from "moment";
import { ageCalculator } from "../utils/valueFormatter";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const { success, userType, errorFlag, errorMsg, isLoading, alertType } =
    useSelector((store) => store.auth);
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      navigate(`/login/${userType}`);
      dispatch(stateClear());
    }
  }, [navigate, userType, success, dispatch]);

  const [values, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phoneNumber: "",
    gender: "",
    password: "",
  });

  const [date, setDate] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const previewImage = () => {
    if (image) {
      return (
        <div className="p-2">
          <img src={image} alt={t('registerProfilePreview')} className="h-24 md:h-28" />
        </div>
      );
    }
  };

  const handleChange = useCallback(
    (e) => {
      setFormValues({ ...values, [e.target.name]: e.target.value });
    },
    [values]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);
    formData.append("role", param.role);
    const dob = moment(date).format("YYYY-MM-DD");
    const age = ageCalculator(dob);
    if (age < 18) {
      dispatch(createAlert(t('registerAgeRestriction')));
      return;
    }
    formData.append("dateOfBirth", moment(date).format("YYYY-MM-DD"));

    if (param.role === "owner") {
      dispatch(registerOwner({ formData }));
    } else if (param.role === "tenant") {
      dispatch(registerTenant({ formData }));
    }
  };

  const handleClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(clearAlert());
    },
    [dispatch]
  );

  return (
    <div>
      <header className="flex m-1 shadow-sm">
        <Logo />
        <div className="flex flex-col justify-center ml-2">
          <h5 className="font-display">{t('appName')}</h5>
          <p className="hidden text-xs md:block md:text-sm">
            {t('appTagline')}
          </p>
        </div>
        <div className="ml-auto flex items-center">
          <LanguageSwitcher />
        </div>
      </header>

      <main className="px-6 h-full mt-12 mb-12">
        <div className="flex md:justify-around justify-center g-6">
          <form onSubmit={handleSubmit} id="form">
            <div className="flex flex-col w-full gap-6">
              <div className="flex justify-center w-full">
                <h3 className="text-center">{t('registerTitle')}</h3>
              </div>
              <div className="flex flex-col gap-4 justify-center w-full">
                <FormTextField
                  label={t('registerFirstName')}
                  name="firstName"
                  type={"text"}
                  value={values.firstName}
                  handleChange={handleChange}
                  autoFocus={true}
                />
                <FormTextField
                  label={t('registerLastName')}
                  name="lastName"
                  type={"text"}
                  value={values.lastName}
                  handleChange={handleChange}
                />
                <FormTextField
                  label={t('registerEmail')}
                  name="email"
                  type={"email"}
                  value={values.email}
                  handleChange={handleChange}
                />
                <FormTextField
                  label={t('registerAddress')}
                  name="address"
                  type={"text"}
                  value={values.address}
                  handleChange={handleChange}
                />
                <FormTextField
                  label={t('registerCity')}
                  name="city"
                  type={"text"}
                  value={values.city}
                  handleChange={handleChange}
                />
                <CountrySelectField
                  value={values.country}
                  setFormValues={setFormValues}
                  handleChange={handleChange}
                  label={t('registerCountry')}
                />

                <FormTextField
                  label={t('registerPhoneNumber')}
                  name="phoneNumber"
                  type={"text"}
                  value={values.phoneNumber}
                  handleChange={handleChange}
                />
                <DatePicker
                  value={date}
                  label={t('registerDob')}
                  handleChange={useCallback(
                    (date) => {
                      setDate(date);
                    },
                    [setDate]
                  )}
                />
                <FormSelectField
                  label={t('registerGender')}
                  name="gender"
                  options={[t('registerMale'), t('registerFemale'), t('registerOther')]}
                  value={values.gender}
                  handleChange={handleChange}
                />

                <div className="flex flex-col justify-center my-2">
                  <label
                    htmlFor="profileImg"
                    className="mb-2 cursor-pointer font-robotoNormal self-center"
                  >
                    {t('registerUploadImage')}
                  </label>

                  <input
                    required
                    name="profileImage"
                    className="font-robotoNormal w-full px-3 py-1.5 text-base font-normal border border-solid border-gray-300 rounded cursor-pointer focus:border-primary focus:outline-none"
                    type="file"
                    id="profileImg"
                    onChange={handleImageChange}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {t('registerFileRequirements')}
                  </p>
                  <div className="self-center border mt-2">
                    {previewImage()}
                  </div>
                </div>
                <FormPasswordField
                  value={values.password}
                  handleChange={handleChange}
                  label={t('registerPassword')}
                />
              </div>

              <div className="text-center mt-10">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  disabled={isLoading}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      opacity: [0.9, 0.8, 0.7],
                    },
                    width: "100%",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      sx={{
                        color: "#fff",
                      }}
                    />
                  ) : (
                    t('registerButton')
                  )}
                </Button>
                <p className="text-sm font-medium mt-4 md:text-base">
                  {t('registerHaveAccount')}{" "}
                  <Link
                    to={`/login/${param.role}`}
                    className="text-secondary hover:text-secondaryDark transition duration-200 ease-in-out"
                  >
                    {t('registerLoginLink')}
                  </Link>
                </p>
              </div>
            </div>
          </form>
          <div className="hidden mb-12 md:mb-0 md:block mt-8 w-1/2">
            <img src={registerImg} className="w-full" alt={t('registerBannerAlt')} />
          </div>
        </div>
      </main>
      <AlertToast
        alertFlag={errorFlag}
        alertMsg={errorMsg}
        alertType={alertType}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Register;