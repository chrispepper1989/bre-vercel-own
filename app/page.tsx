import {cookies} from "next/headers";

export const dynamic = "force-dynamic"
export const revalidate= 0;
import GraphComponent from "@/components/atoms/DecisionComponent";



export default function Home() {
    cookies();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <GraphComponent></GraphComponent>
            {/* ... rest of your component */}
        </main>
    );
}