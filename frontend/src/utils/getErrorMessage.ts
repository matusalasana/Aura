
export const getErrorMessage = (error: any) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong, please try again"
  );
};