
import { NextApiResponse, NextApiRequest } from 'next';
import { updateSigner } from '../../../services/signerRequest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    npwp,
    statusTaxpayer,
    signatory,
    defaultSignatory
  } = req.body;
  const signer = await updateSigner(
    req.query.pid,
    {
    name,
    npwp,
    statusTaxpayer,
    signatory,
    defaultSignatory
  });
  res.status(200).json(signer);
};

export default handler;
