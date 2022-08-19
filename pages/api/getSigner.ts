import { NextApiResponse, NextApiRequest } from 'next';
import { getSignerList } from '../../services/signerRequest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signers = await getSignerList();
  res.status(200).json(signers.data);
};

export default handler;
