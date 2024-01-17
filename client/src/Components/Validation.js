const Validation = (input) => {
  const error = {};
  const name_pattern = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const contact_pattern = /^[0-9]{1,10}$/;

  if (input.name === "") {
    error.name = "Please enter the Name";
  } else if (!name_pattern.test(input.name)) {
    error.name = "Please enter only characters";
  } else {
    error.name = "";
  }

  if (input.email === "") {
    error.email = "Please enter the Email";
  } else if (!email_pattern.test(input.email)) {
    error.email = "Please enter valid Email Id";
  } else {
    error.email = "";
  }

  if (input.contact === "") {
    error.contact = "Please enter the Contact";
  } else if (!contact_pattern.test(input.contact)) {
    error.contact = "Please enter only Digits";
  } else if (input.contact.length > 10) {
    error.contact = "Number Length must be 10";
  } else {
    error.contact = "";
  }

  return error;
};

export default Validation;
