import {cookies, headers} from "next/headers";

export const dynamic = "force-dynamic"
export const revalidate= 0;
import GraphComponent from "@/components/atoms/DecisionComponent";
import {redirect, useSearchParams} from "next/navigation";
import {NextResponse} from "next/server";



export default function Home({
                                 params,
                                 searchParams,
                             }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    cookies();


   
    const {graph} = searchParams;
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <GraphComponent graphFile={graph as string ?? "graph.json"}></GraphComponent>
            {/* ... rest of your component */}
        </main>
    );
}