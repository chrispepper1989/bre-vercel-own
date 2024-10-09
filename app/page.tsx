import GraphComponent from "@/components/organisms/DecisionComponent";


export const dynamic = "force-dynamic"
export const revalidate= 0;


export default function Home({
                                 params,
                                 searchParams,
                             }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
     
    const {graph} = searchParams;
    
    return (
        <main >
            <GraphComponent graphFile={graph as string ?? "DanFullCheck.json"}></GraphComponent>
            {/* ... rest of your component */}
        </main>
    );
}