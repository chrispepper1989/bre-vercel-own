
import QuoteList, {FinanceScanResponse} from "@/components/organisms/QuoteList";
import {AmpImplementation} from "@/components/organisms/AmpImplementation";





export default function Results({
                                 params,
                                 searchParams,
                             }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {

   
  //  const {id,channel } = searchParams;
    const {vid,cid,quidsAsString } = searchParams;
    //default is just to save typing
    const quoteIds: string[] = quidsAsString ? (quidsAsString as string).split(",") : ['1','2','3','4','5','6','7','8','9','10'];
   
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <QuoteList  vechicleId={vid ?? "ford_car"} customerId={cid ?? "john_smith"} quoteIds={quoteIds} />/
        </main>
    );
}