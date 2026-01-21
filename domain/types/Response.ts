export default interface Response<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}
