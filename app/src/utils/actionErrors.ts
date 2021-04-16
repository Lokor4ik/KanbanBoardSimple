import { VariantType } from 'notistack';

const defaultError: Array<{ msg: string; severity: VariantType | undefined }> = [
  { msg: 'Something went wrong', severity: 'error' },
];

const handleErrors = (error: Array<{ msg: string; severity: VariantType | undefined }> | Error) =>
  error instanceof Array ? error : defaultError;

export default handleErrors;
