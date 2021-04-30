import cacheData from "memory-cache";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  cacheData.clear();
  res.status(204).send('cleared')
}
