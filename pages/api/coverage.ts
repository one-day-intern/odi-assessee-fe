import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  coverage?: any; 
}

export default (req: NextApiRequest,
  res: NextApiResponse<Data>) => {
    res.status(200).json({
      coverage: global.__coverage__ || null
    })
}