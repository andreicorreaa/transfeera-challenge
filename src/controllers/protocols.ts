export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<B> {
  body?: B;
  header?: any;
  params?: any;
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
