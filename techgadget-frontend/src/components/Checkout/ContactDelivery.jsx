import React from "react";
import Dropdown from "../shared/Dropdown";

const ContactDelivery = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-4 border-b-2 pb-4">
        <h1 className="text-2xl">Contact</h1>
        <input
          type="text"
          className="w-full h-12 border"
          placeholder="Email or mobile phone number"
        />
        <div className="flex flex-row items-center gap-2">
          <input type="checkbox" />
          Email me with news and letters
        </div>
      </div>
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="text-2xl">Delivery</h1>
        <div className="w-full h-14 bg-slate-500">Dropdown</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input type="text" placeholder="First name (optional)" className="border h-12 rounded-md px-2"/>
          <input type="text" placeholder="Last name" className="border h-12 rounded-md px-2"/>
          <input type="text" placeholder="Address" className="col-span-1 md:col-span-2 border h-12 rounded-md px-2"/>
        </div>
        <div className="flex flex-col md:flex-row">
          <input type="text" placeholder="City" className="border h-12 rounded-md px-2"/>
          <Dropdown options={[1, 2, 3, 4]} onChange />
          <input type="text" placeholder="Zip code" className="border h-12 rounded-md px-2"/>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input type="checkbox" />
          Save this information for next time
        </div>
      </div>
    </div>
  );
};

export default ContactDelivery;

// ^(?:\d{10}|\w+@\w+\.\w{2,3})$
