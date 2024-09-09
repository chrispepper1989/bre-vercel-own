import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { ZenEngine } from '@gorules/zen-engine';
import path from "path";



async function handleMakeDecision(req: NextApiRequest, res: NextApiResponse) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'graph.json');
        const data = await fs.readFile(filePath, 'utf8');
        const engine = new ZenEngine();
        const parsedData = JSON.parse(data);
        const decision = engine.createDecision(parsedData);
        
       
        const result = await decision.evaluate(req.body);
        
        engine.dispose();

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Error making a decision' });
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

