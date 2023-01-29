import { HttpResponse, HttpStatusCode } from './protocols';
export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body,
  };
};

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.OK,
    body,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: 'Internal Error',
  };
};
