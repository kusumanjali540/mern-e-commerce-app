import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import Dropdown from "../shared/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress, useFetchCustomerBySessionQuery } from "../../features";
import { Country, State, City } from "country-state-city";
import DropdownAddress from "../shared/DropdownAddress";

const ContactDelivery = () => {
  const deliveryAddress = useSelector((state) => state.address);
  const {
    data,
    isError: isErrorGetCustomer,
    isFetching: isFetchingCustomer,
  } = useFetchCustomerBySessionQuery();
  const dispatch = useDispatch();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [countryArr, setCountryArr] = useState([]);
  const [stateArr, setStateArr] = useState([]);
  const [cityArr, setCityArr] = useState([]);

  const countryArrRef = useRef([]);
  const stateArrRef = useRef([]);
  const cityArrRef = useRef([]);

  useEffect(() => {
    const fetchedCountryArr = Country.getAllCountries();
    countryArrRef.current = fetchedCountryArr;
    setCountryArr(fetchedCountryArr);

    const fetchedStateArr = State.getStatesOfCountry(
      country?.isoCode || undefined
    );
    stateArrRef.current = fetchedStateArr;
    setStateArr(fetchedStateArr);

    const fetchedCityArr = City.getCitiesOfState(
      country?.isoCode || undefined,
      state?.isoCode || undefined
    );
    cityArrRef.current = fetchedCityArr;
    setCityArr(fetchedCityArr);
  }, [country, state, city]);

  if (isFetchingCustomer) {
    return <div>Loading...</div>;
  }

  if (isErrorGetCustomer) {
    return <div>An error has occured when fetching user address!</div>;
  }

  if (!isErrorGetCustomer && data) {
    console.log(data.user);
    dispatch(
      updateAddress({
        ...deliveryAddress,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        address: data.user.address,
        country: data.user.country,
        city: data.user.city,
        stateName: data.user.state,
        zicode: data.user.zipcode,
      })
    );
  }

  console.log("Address", deliveryAddress);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the updateAddress action with the new address field value
    dispatch(updateAddress({ ...deliveryAddress, [name]: value }));
  };

  const handleCountryChange = (value) => {
    setCountry(value);
    dispatch(
      updateAddress({
        ...deliveryAddress,
        country: value.name,
        stateName: "",
        city: "",
      })
    );
  };
  const handleStateChange = (value) => {
    setState(value);
    if (state) {
      dispatch(updateAddress({ ...deliveryAddress, stateName: value.name }));
    }
  };
  const handleCityChange = (value) => {
    setCity(value);
    if (city) {
      dispatch(
        updateAddress({
          ...deliveryAddress,
          city: city.name,
        })
      );
    }
  };

  return (
    <form className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-4 border-b-2 pb-4">
        <h1 className="text-2xl">Contact</h1>
        <input
          type="text"
          name="emailPhone"
          className="w-full h-12 border px-2"
          placeholder="Enter email here"
          value={deliveryAddress.email}
          onChange={handleChange}
          required
        />
        {/* <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            checked={deliveryAddress.newLetterChecked}
            onChange={() =>
              dispatch(
                updateAddress({
                  ...deliveryAddress,
                  newLetterChecked: !deliveryAddress.newLetterChecked,
                })
              )
            }
          />
          Email me with news and letters
        </div> */}
      </div>
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="text-2xl">Delivery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="border h-12 rounded-md px-2"
            value={deliveryAddress.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="border h-12 rounded-md px-2"
            value={deliveryAddress.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="col-span-1 md:col-span-2 border h-12 rounded-md px-2"
            value={deliveryAddress.address}
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
                initialValue={deliveryAddress.country}
              />
            </div>

            <div className="flex flex-col">
              State/Province
              <DropdownAddress
                options={stateArr}
                onChange={handleStateChange}
                initialValue={deliveryAddress.stateName}
              />
            </div>
            <div className="flex flex-col">
              City/District
              <DropdownAddress
                options={cityArr}
                onChange={handleCityChange}
                initialValue={deliveryAddress.city}
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="zipcode"
              placeholder="Zip code"
              className="border h-12 w-32 rounded-md px-2"
              value={deliveryAddress.zipcode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactDelivery;
