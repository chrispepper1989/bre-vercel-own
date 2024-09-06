import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { ZenEngine } from '@gorules/zen-engine';



async function handleMakeDecision(req: NextApiRequest, res: NextApiResponse) {
    try {
        const content = await fs.readFile('./graph.json', 'utf8');
        const engine = new ZenEngine();

        const decision = engine.createDecision({content});
       
        const result = await decision.evaluate(req.body.json);
        engine.dispose();

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Error making decision' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await handleMakeDecision(req, res);
            break;

        default:
            res.status(405).json({ message: 'Method not allowed' });
    }
}

