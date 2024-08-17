import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchCustomerBySessionQuery } from "../../features";
import AddressForm from "../../components/UserInformation/AddressForm";

const AddressDetail = ({ onEdit, data }) => (
  <div className="w-full">
    <div className="mt-4 text-xl font-semibold">Default Address</div>
    <div className="mt-8">
      <div>{data.user.firstName + " " + data.user.lastName}</div>
      <div>{data.user.email}</div>
      <div>
        {data.user.city + ", " + data.user.state + ", " + data.user.country}
      </div>
      <div>{data.user.address}</div>
    </div>
    <div className="mt-20">
      <button className="underline" onClick={onEdit}>
        Edit
      </button>
    </div>
  </div>
);

const Address = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, isError } = useFetchCustomerBySessionQuery();

  console.log(data);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error has occured!</div>;
  }

  return (
    <div className="w-full md:px-32 lg:px-64">
      <div className="w-full h-auto p-8 flex flex-col justify-center items-center gap-8">
        <div className="text-3xl font-semibold">Address</div>
        <div className="thebox w-full h-[70%] p-8 border-slate-400 border-[1px] rounded-md flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="detail"
                initial={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AddressDetail data={data} onEdit={handleEditClick} />
              </motion.div>
            ) : (
              <motion.div
                key="edit"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AddressForm data={data} onSave={handleSaveClick} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Address;
