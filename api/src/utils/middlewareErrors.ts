import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const checkErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const newErrors = errors.array().map((errItem) => ({
      ...errItem,
      severity: 'error',
    }));

    return res.status(400).json({ errors: newErrors });
  }
};

export default checkErrors;
