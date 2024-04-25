import React, { useState } from "react";
import { useSubmitContactFormMutation } from "../features";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [submitContactForm, { isLoading, isError }] =
    useSubmitContactFormMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      await submitContactForm(formData);

      console.log(isLoading, isError);

      if (!isLoading && !isError) {
        toast.success("Form submitted successfully!");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        comment: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
      err.data.data?.forEach((msg) => {
        toast.error(msg);
      });
    }
  };

  return (
    <div className=" px-4 md:px-40 lg:px-40 xl:px-96 py-20">
      <h1 className="text-5xl">Contact Us</h1>
      <div className="flex flex-col my-16 gap-8">
        <div className="font-bold">Welcome to Tech Gadget KV!</div>
        <div>
          My name is Kha - the owner of the store. Thank you for taking the time
          to explore our site. Your presence is greatly appreciated. At Tech
          Gadget KV, ensuring your satisfaction is our top priority, and we're
          here to assist you promptly.
        </div>
        <div>
          Feel free to use the contact form below to share any questions or
          feedback. We genuinely value your experience and aim to respond within
          30 minutes, or at the latest, within 24 hours.
        </div>
        <div>We look forward to serving you. Here is our email address:</div>
        <div>info@wirelesstechgadget.com</div>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4 col-span-2 md:col-span-1">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:outline-none focus:border-black focus:border-2"
            placeholder="Name *"
            required
          />
        </div>
        <div className="mb-4 col-span-2 md:col-span-1">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:outline-none focus:border-black focus:border-2"
            placeholder="Email *"
            required
          />
        </div>
        <div className="mb-4 col-span-2">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:outline-none focus:border-black focus:border-2"
            placeholder="Phone number"
          />
        </div>
        <div className="mb-4 col-span-2">
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:outline-none focus:border-black focus:border-2"
            placeholder="Comment *"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className=" bg-black text-white py-3 px-9 transform hover:scale-[101%]"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default Contact;
