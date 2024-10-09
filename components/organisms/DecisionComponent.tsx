"use client"
import '@gorules/jdm-editor/dist/style.css';
import {DecisionGraph, JdmConfigProvider} from '@gorules/jdm-editor';
import {useState, useEffect} from 'react';
import ApiSimulator from "@/components/organisms/ApiSimulator";
import './DecisionComponent.css';

interface GraphComponentProps {
    graphFile?: string
}

function GraphComponent({graphFile}: GraphComponentProps) {

    const API_ENDPOINT = '/api/jsonFile?graph='+graphFile;
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
                const json = JSON.stringify(graph);
                console.log(json);
                await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: json,
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
        <div className="w-full graph">
            <JdmConfigProvider>
                <DecisionGraph
                    
                    value={graph}
                    onChange={(val) => setGraph(val as any)}
                />
            </JdmConfigProvider>
            <ApiSimulator graphFile={graphFile}></ApiSimulator>
        </div>
    );
}

export default GraphComponent;