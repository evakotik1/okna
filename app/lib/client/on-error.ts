import { FieldError, FieldErrors } from "react-hook-form";

function GetErrorMessage(error: FieldError | undefined) {
  if (!error) return;
  if (error.message) return error.message;

  const arrayError = (
    error as unknown as Record<string, Record<string, FieldError>>
  )[Object.keys(error)[0] ?? "invalid"];

  if (!arrayError) return;

  return GetErrorMessage(arrayError[Object.keys(arrayError)[0] ?? "invalid"]);
}

export function OnError(errors: FieldErrors) {
  const err = GetErrorMessage(
    errors[Object.keys(errors)[0] ?? "invalid"] as FieldError,
  );
  if (!err) return;
  console.error(err);
//   toast.error(err);
}