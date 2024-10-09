import React, {useState} from 'react';
import './ApiSimulator.css';
interface ApiSimulatorProps {
    graphFile?: string | undefined
}

function ApiSimulator({graphFile}: ApiSimulatorProps) {
    const [body, setBody] = useState('');
    const [response, setResponse] = useState('');

    const simulate = async () => {
        try {
            const API_ENDPOINT = '/api/result?graph='+graphFile;
             // Replace with your actual API endpoint
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            setResponse(JSON.stringify(data, null, 2)); // Pretty-print the response
        } catch (error) {
            setResponse(`Error: ${(error as { message: string }).message}`);
        }
    };

    return (
        <div className="api-simulator">
      <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter JSON body"
      />
            <textarea
                value={response}
                readOnly                
                placeholder="Response will appear here"
        
         
            />
            <button onClick={simulate}>Simulate</button>
        </div>
    );
}

export default ApiSimulator;