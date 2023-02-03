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

export const schemaValidator = (
  keyType: string | undefined,
  key: string | undefined,
): boolean => {
  type KeyType = 'CPF' | 'CNPJ' | 'EMAIL' | 'TELEFONE' | 'CHAVE_ALEATORIA';

  if (!keyType || !key) return false;

  const keyTypeMap: Record<KeyType, () => boolean> = {
    CPF: function () {
      const reg = new RegExp(/^[0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}$/);
      return reg.test(key);
    },
    CNPJ: function () {
      const reg = new RegExp(
        /^[0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2}$/,
      );
      return reg.test(key);
    },
    EMAIL: function () {
      const reg = new RegExp(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/);
      return reg.test(key);
    },
    TELEFONE: function () {
      const reg = new RegExp(/^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/);
      return reg.test(key);
    },
    CHAVE_ALEATORIA: function () {
      const reg = new RegExp(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
      return reg.test(key);
    },
  } as const;

  return keyTypeMap[keyType as KeyType]() || false;
};
