import toast from "react-hot-toast";

export const showErrorToast = (error) => {
  const { status, data } = error;

  // If any detail error in the array, toast it as well
  if (Array.isArray(data.data)) {
    data.data.forEach((msg) => {
      toast.error(msg, {
        duration: 4000,
      });
    });
  }

  // Toast the general error message.
  toast.error(data.message + " Status Code: " + status, {
    duration: 4000,
  });
};
