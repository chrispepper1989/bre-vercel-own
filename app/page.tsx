import {cookies} from "next/headers";

export const dynamic = "force-dynamic"
export const revalidate= 0;
import GraphComponent from "@/components/atoms/DecisionComponent";
import {useSearchParams} from "next/navigation";



export default function Home() {
    cookies();
    const searchParams = useSearchParams()
   
    const graphFile = searchParams?.get('graph') ?? "graph.json";
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <GraphComponent graphFile={graphFile}></GraphComponent>
            {/* ... rest of your component */}
        </main>
    );
}