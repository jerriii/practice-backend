import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => string | null;
  customMessage?: string;
};

export type ValidationSchema = Record<string, ValidationRule>;

export type FormErrors = Record<string, string>;

//Helper function to generate field label
const getFieldLabel = (field: string, customLabels?: Record<string, string>): string => {
  if(customLabels && customLabels[field]) {
    return customLabels[field];
  }
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

/**
 * Validates form data against a validation schema
 * @param formData The form data to validate
 * @param validationSchema The validation rules for each field
 * @returns An object containing errors (if any) and a boolean indicating if the form is valid
 */
export const validateForm = <T extends Record<string, any>>(
  formData: T,
  validationSchema: ValidationSchema,
  customLabels?: Record<string, string>
): { errors: FormErrors; isValid: boolean } => {
  const errors: FormErrors = {};

  for (const field in validationSchema) {
    const value = formData[field];
    const rules = validationSchema[field];
    let errorMessage = "";

    // Required Validation
    if (rules.required) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && !value.trim()) ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errorMessage = rules.customMessage || `${getFieldLabel(field, customLabels)} is required`;
      }
    }

    // Skip other validations if field is empty and not required
    if (
      !errorMessage &&
      (value === undefined || value === null || value === "")
    ) {
      continue;
    }

    //length validations
    if (typeof value === "string") {
      if (rules.minLength && value.length < rules.minLength) {
        errorMessage = rules.customMessage || `${getFieldLabel(field, customLabels)} must be at least ${rules.minLength} characters`;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        errorMessage = rules.customMessage || `${getFieldLabel(field, customLabels)} must be no more than ${rules.maxLength} characters`;
      }
    }

    //pattern validations
    if (
      !errorMessage &&
      rules.pattern &&
      typeof value === "string" &&
      !rules.pattern.test(value)
    ) {
      errorMessage = rules.customMessage || `Invalid ${getFieldLabel(field, customLabels)} format`;
    }

    //custom validations
    if (!errorMessage && rules.customValidator) {
      const customError = rules.customValidator(value);
      if (customError) {
        errorMessage = customError;
      }
    }

    if (errorMessage) {
      errors[field] = errorMessage;
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export const truncateText = (text: string, maxLength: number = 20) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
