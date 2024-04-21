import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../shared/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../../features";
import { Country, State, City } from "country-state-city";
import DropdownAddress from "../shared/DropdownAddress";

const ContactDelivery = () => {
  const deliveryAddress = useSelector((state) => state.address);
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
        lat: "",
        lon: "",
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
          lat: city.latitude,
          lon: city.longitude,
        })
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-4 border-b-2 pb-4">
        <h1 className="text-2xl">Contact</h1>
        <input
          type="text"
          name="emailPhone"
          className="w-full h-12 border"
          placeholder="Email or mobile phone number"
          value={deliveryAddress.emailPhone}
          onChange={handleChange}
        />
        <div className="flex flex-row items-center gap-2">
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
        </div>
      </div>
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="text-2xl">Delivery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First name (optional)"
            className="border h-12 rounded-md px-2"
            value={deliveryAddress.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="border h-12 rounded-md px-2"
            value={deliveryAddress.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="col-span-1 md:col-span-2 border h-12 rounded-md px-2"
            value={deliveryAddress.address}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="flex flex-col">
              Country
              <DropdownAddress
                options={countryArr}
                onChange={handleCountryChange}
              />
            </div>

            <div className="flex flex-col">
              State/Province
              <DropdownAddress
                options={stateArr}
                onChange={handleStateChange}
              />
            </div>
            <div className="flex flex-col">
              City/District
              <DropdownAddress options={cityArr} onChange={handleCityChange} />
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
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            checked={deliveryAddress.isSaveInfo}
            onChange={() =>
              dispatch(
                updateAddress({
                  ...deliveryAddress,
                  isSaveInfo: !deliveryAddress.isSaveInfo,
                })
              )
            }
          />
          Save this information for next time
        </div>
      </div>
    </div>
  );
};

export default ContactDelivery;

// ^(?:\d{10}|\w+@\w+\.\w{2,3})$
