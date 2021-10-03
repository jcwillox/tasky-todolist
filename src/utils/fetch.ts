export class ApiError extends Error {
  res: Response;
  constructor(res: Response) {
    super(res.statusText);
    this.name = "ApiError";
    this.message = res.statusText;
    this.res = res;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ApiValidationError extends ApiError {
  res: Response;
  errors: ValidationErrorItem[];
  constructor(res: Response, errors: ValidationErrorItem[]) {
    super(res);
    this.name = "ApiValidationError";
    this.message = res.statusText;
    this.res = res;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiValidationError.prototype);
  }
}

export type ValidationErrorItem = {
  path: string;
  message: string;
};

/** Make a request to the backend that returns a JSON response */
export const apiJSON = async (
  endpoint: string,
  data?: object
): Promise<any> => {
  return (await api(endpoint, { data })).json();
};

/** Make a request to the backend API */
export const api = async (
  endpoint: string,
  { data, method }: { data?: object; method?: string }
) => {
  let options: RequestInit = {
    method: method || "get",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };
  if (data) {
    options = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        ...options.headers,
        "Content-Type": "application/json"
      }
    };
  }
  let res = await fetch("/api" + endpoint, options);
  if (!res.ok) {
    if (res.status === 422) {
      const data = await res.json();
      throw new ApiValidationError(res, data.errors || []);
    } else {
      throw new ApiError(res);
    }
  }
  return res;
};
