import { ZenEngine } from '@gorules/zen-engine';
import fs from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import {exec} from "child_process";



class VersionControlHandler
{
    hasGit:boolean = false;
    public GitHandler()
    {

        const { exec } = require("child_process");
        exec('git --version', (error:any, stdout:any, stderr:any) => {
            if (error) {
                console.error('Git is not installed');
            } else {
                console.log('Git version:', stdout);
                this.hasGit = true;
            }
        });
    }
    public async UpdateVersion(filePath: string)
    {
        if(!this.hasGit)
            return;
        
        const { exec } = require("child_process");
        // Add the file to Git staging
        await exec('git add ' + filePath);

        // Commit the changes with a descriptive message
        await exec('git commit -m "Updated graph.json"');

        await exec('git push"');
    }
    
}

async function getJsonFile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const  {graph} = req.query;
        const graphFile = (graph as string) ?? 'graph.json';
        const filePath = path.join(process.cwd(), 'public', graphFile);
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
        const  {graph} = req.query;
        
       
        const graphFile = (graph as string) ?? 'graph-new.json';
        const filePath = path.join(process.cwd(), 'public', graphFile);
        const data = req.body;

        // Validate the incoming data to ensure it's a valid JSON object
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid JSON data in request body');
        }

        
        const vc = new VersionControlHandler()
        await vc.UpdateVersion(filePath);
        
         
        //if(!data.error)
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