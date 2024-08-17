import React, { useEffect, useRef, useState } from "react";
import DropdownAddress from "../shared/DropdownAddress";
import { Country, State, City } from "country-state-city";
import { useEditCustomerBySessionMutation } from "../../features";
import { showErrorToast } from "../../services/showErrorToast";

const AddressForm = ({ data, onSave }) => {
  const [address, setAddress] = useState({
    email: data.user.email || "",
    firstName: data.user.firstName || "",
    lastName: data.user.lastName || "",
    address: data.user.address || "",
    country: data.user.country || "",
    city: data.user.city || "",
    state: data.user.state || "",
    zipcode: data.user.zipcode || "",
  });

  const [putCustomer, { isLoading, isError }] =
    useEditCustomerBySessionMutation();

  const [country, setCountry] = useState(data.user.country || "");
  const [state, setState] = useState(data.user.state || "");
  const [city, setCity] = useState(data.user.city || "");
  const [countryArr, setCountryArr] = useState([]);
  const [stateArr, setStateArr] = useState([]);
  const [cityArr, setCityArr] = useState([]);

  const countryArrRef = useRef([]);
  const stateArrRef = useRef([]);
  const cityArrRef = useRef([]);

  console.log("Address to be push", address);

  useEffect(() => {
    const fetchedCountryArr = Country.getAllCountries();
    countryArrRef.current = fetchedCountryArr;
    setCountryArr(fetchedCountryArr);

    if (country) {
      const fetchedStateArr = State.getStatesOfCountry(country?.isoCode);
      stateArrRef.current = fetchedStateArr;
      setStateArr(fetchedStateArr);
    }

    if (country && state) {
      const fetchedCityArr = City.getCitiesOfState(
        country?.isoCode,
        state?.isoCode
      );
      cityArrRef.current = fetchedCityArr;
      setCityArr(fetchedCityArr);
    }
  }, [country, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleCountryChange = (value) => {
    setCountry(value);
    setAddress((prevAddress) => ({
      ...prevAddress,
      country: value.name,
      state: "",
      city: "",
    }));
    setStateArr([]);
    setCityArr([]);
    setState(""); // Reset state
    setCity(""); // Reset city
  };

  const handleStateChange = (value) => {
    setState(value);
    setAddress((prevAddress) => ({
      ...prevAddress,
      state: value.name,
      city: "",
    }));
    setCityArr([]);
  };

  const handleCityChange = (value) => {
    setCity(value);
    setAddress((prevAddress) => ({
      ...prevAddress,
      city: value.name,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putCustomer(address);
      onSave();
    } catch (err) {
      showErrorToast(err);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-4 border-b-2 pb-4">
        <h1 className="text-2xl">Contact</h1>
        <input
          type="text"
          name="email"
          className="w-full h-12 border px-2"
          placeholder="Enter email here"
          value={address.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="text-2xl">Delivery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="border h-12 rounded-md px-2"
            value={address.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="border h-12 rounded-md px-2"
            value={address.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="col-span-1 md:col-span-2 border h-12 rounded-md px-2"
            value={address.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="flex flex-col">
              Country
              <DropdownAddress
                options={countryArr}
                onChange={handleCountryChange}
                initialValue={address.country}
              />
            </div>

            <div className="flex flex-col">
              State/Province
              <DropdownAddress
                options={stateArr}
                onChange={handleStateChange}
                initialValue={address.state}
              />
            </div>
            <div className="flex flex-col">
              City/District
              <DropdownAddress
                options={cityArr}
                onChange={handleCityChange}
                initialValue={address.city}
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="zipcode"
              placeholder="Zip code"
              className="border h-12 w-32 rounded-md px-2"
              value={address.zipcode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <button className="underline" type="submit">
        Save
      </button>
    </form>
  );
};

export default AddressForm;
