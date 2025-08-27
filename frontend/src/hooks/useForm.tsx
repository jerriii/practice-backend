import { useReducer } from "react";

type FormAction<T> =
  | {
      type: "SET_FIELD";
      field: keyof T;
      value: T[keyof T];
    }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "RESET"; initialState: T }
  | { type: "SET_FORM_DATA"; payload: Partial<T> };

function formReducer<T>(
  state: { formData: T; errors: Record<string, string> },
  action: FormAction<T>
) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field as string]: "" },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET":
      return { formData: action.initialState, errors: {} };
    case "SET_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
}

export function useForm<T>(initialState: T) {
  const [state, dispatch] = useReducer(formReducer<T>, {
    formData: initialState,
    errors: {},
  });

  const setField = (field: keyof T, value: T[keyof T]) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const setErrors = (errors: Record<string, string>) => {
    dispatch({ type: "SET_ERRORS", errors });
  };

  const resetForm = () => {
    dispatch({ type: "RESET", initialState });
  };

  const setFormData = (payload: Partial<T>) => {
    dispatch({ type: "SET_FORM_DATA", payload });
  };

  return {
    formData: state.formData,
    errors: state.errors,
    setField,
    setErrors,
    resetForm,
    setFormData,
  };
}
