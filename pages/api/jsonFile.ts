import { ZenEngine } from '@gorules/zen-engine';
import fs from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const makeDecision = async () => {
    // Example filesystem content, it is up to you how you obtain content
    const content = await fs.readFile('./jdm_graph.json');
    const engine = new ZenEngine();

    const decision = engine.createDecision(content);
    const result = await decision.evaluate({ input: 15 });
    engine.dispose();
};

async function getJsonFile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data.json');
        const data = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(data);

        // Validate the parsed data to ensure it's a valid JSON object
        if (typeof parsedData !== 'object' || parsedData === null) {
            throw new Error('Invalid JSON data');
        }

        res.json(parsedData);
    } catch (error) {
        res.status(500).json({ error: 'Error reading JSON file' });
    }
}

async function setJsonFile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data.json');
        const data = req.body;

        // Validate the incoming data to ensure it's a valid JSON object
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid JSON data in request body');
        }

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        res.status(200).json({ message: 'JSON file updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error writing JSON file' });
    }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await getJsonFile(req, res);
            break;
        case 'POST':
            await setJsonFile(req, res);
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
    }
}