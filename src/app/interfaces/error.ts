export type TErrorDocs = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: 400;
  message: string;
  errorDocs: TErrorDocs;
};
