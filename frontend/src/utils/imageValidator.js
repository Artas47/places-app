export function checkIfFilesAreTooBig(file) {
  let valid = true;
  if (file[0]) {
    const size = file[0].size / 1024 / 1024;
    if (size > 5) {
      valid = false;
    }
  }
  return valid;
}

export function checkIfFilesAreCorrectType(file) {
  let valid = true;
  if (file[0]) {
    if (!["image/jpg", "image/jpeg", "image/png"].includes(file[0].type)) {
      valid = false;
    }
  }
  return valid;
}
