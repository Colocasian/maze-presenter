import formSchema from "./formSchema";

export const dataForm = document.getElementById("dataForm");

export function getFormValues() {
  return new Promise((resolve, reject) => {
    const dataFormData = new FormData(dataForm);
    let formEntries = {};
    for (let pair of dataFormData.entries()) formEntries[pair[0]] = pair[1];
    formSchema
      .validate(formEntries)
      .then((entries) => resolve(entries))
      .catch((err) => reject(err));
  });
}
