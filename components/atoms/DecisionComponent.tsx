"use client"
import '@gorules/jdm-editor/dist/style.css';
import { DecisionGraph, JdmConfigProvider } from '@gorules/jdm-editor';
import { useState, useEffect } from 'react';
// Assuming your API endpoint is '/api/jsonFile'
const API_ENDPOINT = '/api/jsonFile';



function GraphComponent() {


    const [graph, setGraph] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                const data = await response.json();
                setGraph(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const saveData = async () => {
            try {
                console.log("trying to save")
                await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(graph),
                });
                console.log("done save")
            } catch (error) {
                console.error('Error saving data:', error);
            }
        };

        if (graph) {
            saveData();
        }
    }, [graph]);
    
    return (
        <div className="w-full">
            <JdmConfigProvider>
                <DecisionGraph
                    value={graph}
                    onChange={(val) => setGraph(val as any)}
                />
            </JdmConfigProvider>
        </div>
    );
}

export default GraphComponent;