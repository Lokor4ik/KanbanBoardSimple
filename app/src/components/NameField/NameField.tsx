import TextField from '@material-ui/core/TextField';

import { NameFieldProps } from './types';

const NameField: React.FC<NameFieldProps> = ({ formik }) => (
  <TextField
    fullWidth
    id="name"
    name="name"
    label="Name"
    value={formik.values.name}
    onChange={formik.handleChange}
    error={formik.touched.name && Boolean(formik.errors.name)}
    helperText={formik.touched.name && formik.errors.name}
  />
);

export default NameField;
