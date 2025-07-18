// ✅ UpdatePropertyForm.jsx
import { useCallback } from "react";
import { FormTextField, FormSelectField, CountrySelectField } from "../../components";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InfoIcon from "@mui/icons-material/Info";
import BungalowIcon from "@mui/icons-material/Bungalow";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CircularProgress from "@mui/material/CircularProgress";
import countryToCurrency from "country-to-currency";
import { countries } from "../../utils/countryList";

const UpdatePropertyForm = ({ values, setFormValues, isProcessing }) => {
  const currentCountry = countries.find(
    (country) => country.label === values.country
  );

  const handleChange = useCallback(
    (e) => {
      setFormValues({ ...values, [e.target.name]: e.target.value });
    },
    [values, setFormValues]
  );

  const handleAmenityChange = (e) => {
    const { checked, value } = e.target;
    const newAmenities = checked
      ? [...(values.amenities || []), value]
      : (values.amenities || []).filter((a) => a !== value);
    setFormValues({ ...values, amenities: newAmenities });
  };

  return (
    <>
      <div className="flex flex-wrap flex-col gap-2 ml-5">
        <div className="flex flex-col gap-4 my-2">
          <h5 className="mb-1">
            <InfoIcon /> Initial Details
          </h5>
          <TextField label="Title" color="tertiary" disabled value={values.title || ""} />
          <TextField
            label="Description"
            multiline
            rows={4}
            color="tertiary"
            name="description"
            value={values.description || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-4 my-2">
          <h5 className="mb-1">
            <BungalowIcon /> Property Info
          </h5>
          <TextField
            label="Price"
            name="price"
            type="number"
            value={values.price || ""}
            color="tertiary"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {countryToCurrency[currentCountry?.code]}
                </InputAdornment>
              ),
            }}
          />

          <FormSelectField
            label="Category"
            name="category"
            options={["House", "Apartment", "Room", "Shop Space", "Office Space"]}
            value={values.category || ""}
            handleChange={handleChange}
          />

          <FormSelectField
            label="Property Type"
            name="type"
            options={["Rent", "Sale"]}
            value={values.type || ""}
            handleChange={handleChange}
          />

          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-gray-700">Amenities</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["WiFi", "AC", "Parking", "Furnished", "Elevator", "Swimming Pool"].map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    checked={values.amenities?.includes(amenity)}
                    onChange={handleAmenityChange}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <TextField
            label="Area"
            name="area"
            type="number"
            value={values.area || ""}
            color="tertiary"
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">sq. feet</InputAdornment>,
            }}
          />
          <TextField
            label="Floors"
            name="floors"
            type="number"
            value={values.floors || ""}
            color="tertiary"
            onChange={handleChange}
            InputProps={{ endAdornment: <InputAdornment position="end">floors</InputAdornment> }}
          />
          <TextField
            label="Bedrooms"
            name="bedrooms"
            type="number"
            value={values.bedrooms || ""}
            color="tertiary"
            onChange={handleChange}
            InputProps={{ endAdornment: <InputAdornment position="end">Bedrooms</InputAdornment> }}
          />
          <TextField
            label="Bathrooms"
            name="bathrooms"
            type="number"
            value={values.bathrooms || ""}
            color="tertiary"
            onChange={handleChange}
            InputProps={{ endAdornment: <InputAdornment position="end">Bathrooms</InputAdornment> }}
          />

          <FormSelectField
            label="Property Facing"
            name="facing"
            options={["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]}
            value={values.facing || ""}
            handleChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-4 my-2">
          <h5 className="mb-1">
            <LocationOnIcon /> Address
          </h5>
          <FormTextField
            label="Street Name / Landmark"
            name="streetName"
            value={values.streetName || ""}
            handleChange={handleChange}
          />
          <FormTextField
            label="City"
            name="city"
            value={values.city || ""}
            handleChange={handleChange}
          />
          <FormTextField
            label="State"
            name="state"
            value={values.state || ""}
            handleChange={handleChange}
            required={false}
          />

          <CountrySelectField
            value={values.country || ""}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
        </div>
      </div>

      <div className="text-center mt-2">
        <Button
          disabled={isProcessing}
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "primary.dark", opacity: [0.9, 0.8, 0.7] },
            width: "25%",
          }}
        >
          {isProcessing ? <CircularProgress size={26} sx={{ color: "#fff" }} /> : "Update"}
        </Button>
      </div>
    </>
  );
};

export default UpdatePropertyForm;
