import React, { useEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineStar, AiOutlineUpload } from "react-icons/ai";
import { usePostReviewMutation } from "../../features";
import Rating from "react-rating";
import { validateReviewForm } from "../../services/validateFormService";
import { useParams } from "react-router-dom";
import { showErrorToast } from "../../services/showErrorToast";
import toast from "react-hot-toast";

const ReviewWriting = ({ className, style, onClose }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productId: id,
    title: "",
    comment: "",
    reviewer: "",
    email: "",
    star: 0,
  });

  const [image, setImage] = useState();
  const inputRef = useRef(null);
  const [formErrors, setFormErrors] = useState([]);
  const [postReview, { isLoading, isError }] = usePostReviewMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImagePickerClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    //Image
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleRatingChange = (e) => {
    console.log(e);
    setFormData((prevData) => ({
      ...prevData,
      star: e,
    }));
    console.log(formData);
  };

  const handleSubmitForm = async () => {
    const validationErrors = validateReviewForm(formData);
    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      setFormErrors(validationErrors);
      return; // Stop form submission if validation errors exist
    } else {
      setFormErrors([]);
    }

    const newFormData = new FormData();

    for (let key in formData) {
      newFormData.append(key, formData[key]);
    }

    if (image) {
      newFormData.append("image", image);
    }

    for (const entry of newFormData.entries()) {
      console.log(entry);
    }
    try {
      await postReview(newFormData);

      toast.success("Review got submitted!");
    } catch (err) {
      showErrorToast(err);
    }
  };

  return (
    <div
      className="w-full mt-4 flex flex-col justify-center items-center border-y-2 transition-all overflow-hidden"
      style={style}
    >
      <h1 className="text-2xl font-bold mb-4">Writing a Review</h1>
      <div className="w-full mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Review Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="mt-1 p-2 w-full border border-black"
          placeholder="Give your review a title"
          value={formData.title}
          onChange={handleFormDataChange}
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="reviewText"
          className="block text-sm font-medium text-gray-700"
        >
          Review
        </label>
        <textarea
          name="comment"
          id="comment"
          rows="4"
          className="mt-1 p-2 w-full border border-black"
          placeholder="Write your comments here"
          value={formData.comment}
          onChange={handleFormDataChange}
        ></textarea>
      </div>
      <div className="w-full mb-4">
        <label htmlFor="image">Picture (optional)</label>
        <div className="my-1">
          <div className="w-24 h-24 relative" onClick={handleImagePickerClick}>
            {!image ? (
              <div className="flex justify-center items-center w-full h-full opacity-70 hover:opacity-40 hover:cursor-pointer border-2 border-black">
                <AiOutlineUpload className="text-4xl" />
              </div>
            ) : (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="object-cover"
              />
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name (display publicly like{" "}
          <span className="font-semibold">John Smith</span>)
        </label>
        <input
          type="text"
          name="reviewer"
          id="reviewer"
          className="mt-1 p-2 w-full border border-black"
          placeholder="Enter your name (public)"
          value={formData.reviewer}
          onChange={handleFormDataChange}
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 p-2 w-full border border-black"
          placeholder="Enter your email (private)"
          value={formData.email}
          onChange={handleFormDataChange}
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Rating
        </label>
        <Rating
          emptySymbol={<AiOutlineStar />}
          fullSymbol={<AiFillStar />}
          initialRating={formData.star}
          onChange={handleRatingChange}
        />
      </div>

      <div className="w-full overflow-y-auto mb-4 text-xs">
        {formErrors.length > 0 && (
          <ul className="list-disc list-inside text-red-500">
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full flex flex-col">
        <button
          type="submit"
          onClick={handleSubmitForm}
          disabled={isLoading}
          className={`px-4 py-2 mb-2 ${
            isLoading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
        <button
          type="button"
          className="px-4 py-2 border border-black"
          onClick={onClose}
        >
          Cancel Review
        </button>
      </div>
    </div>
  );
};

export default ReviewWriting;
