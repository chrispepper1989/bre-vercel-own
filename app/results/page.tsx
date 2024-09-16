
import QuoteList from "@/components/organisms/QuoteList";





export default function Results({
                                 params,
                                 searchParams,
                             }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {

   
    const {id,channel } = searchParams;
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <QuoteList eligibilityId={(id as string) ?? 1} channel={(channel as string) ?? ""} />/
        </main>
    );
}