"use client"
import Image from "next/image";
import '@gorules/jdm-editor/dist/style.css';
import { DecisionGraph, JdmConfigProvider } from '@gorules/jdm-editor';
import { useState, useEffect } from 'react';

// Assuming your API endpoint is '/api/jsonFile'
const API_ENDPOINT = '/api/jsonFile';

export default function Home() {
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
                await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(graph),
                });
            } catch (error) {
                console.error('Error saving data:', error);
            }
        };

        if (graph) {
            saveData();
        }
    }, [graph]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full">
                <JdmConfigProvider>
                    <DecisionGraph
                        value={graph}
                        onChange={(val) => setGraph(val as any)}
                    />
                </JdmConfigProvider>
            </div>
            {/* ... rest of your component */}
        </main>
    );
}