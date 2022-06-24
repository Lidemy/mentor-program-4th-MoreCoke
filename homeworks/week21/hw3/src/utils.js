const reMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePhone = /^(09)\d{8}$/;

export const mailValid = (value) => {
  return value && reMail.test(value);
};

export const phoneValid = (value) => {
  return value && rePhone.test(value);
};
