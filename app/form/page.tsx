import MultiStepForm from "@/components/organisms/MultiStepForm";

export const dynamic = "force-dynamic"
export const revalidate= 0;




export default function Form({
                                 params,
                                 searchParams,
                             }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
  


   
    const {graph} = searchParams;
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <MultiStepForm></MultiStepForm>
        </main>
    );
}