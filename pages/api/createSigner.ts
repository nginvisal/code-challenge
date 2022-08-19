
import { NextApiResponse, NextApiRequest } from 'next';
import { createSigner } from '../../services/signerRequest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    npwp,
    statusTaxpayer,
    signatory,
    defaultSignatory
  } = req.body;
  const signer = await createSigner({
    name,
    npwp,
    statusTaxpayer,
    signatory,
    defaultSignatory
  });
  res.status(200).json(signer);
};

export default handler;
