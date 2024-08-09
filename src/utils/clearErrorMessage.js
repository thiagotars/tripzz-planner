export const clearErrorMessage = (setErrorMessage) => {
  setTimeout(() => {
    setErrorMessage("");
  }, 3000); // Clear the error message after 3 seconds
};
