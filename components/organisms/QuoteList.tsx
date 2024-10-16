"use client"
import React, {useEffect, useState} from "react";
import './QuoteList.css';
import {AmpImplementation} from "@/components/organisms/AmpImplementation";
import {PubNubImplementation} from "@/components/organisms/PubNubImplementation";


// Define the structure for a Quote
interface Quote {
    ProductId: number;
    EligibilityStatus: string;
    EligibilityMessages: { message: string }[];
    StandardInfo: any;
    OfferedInfo: any;
}

// Define the structure for a Finance Scan Response
export interface FinanceScanResponse {
    FinanceScannerId: string;
    Quotes: Quote[];
}

export interface IFinanceScannerQueue<T>{
    onListen: (event: (event:{message: T})=>void)=>void
    subscribe: (channel: string)=>void
    cleanUp:()=>void
}

const QuoteList: React.FC<{
   
    vechicleId?: string | string[] | undefined,
    customerId?: string | string[] | undefined,
    quoteIds?: string[]
}> = ({vechicleId, customerId, quoteIds}) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    //https://localhost:7162/api/v1/scans
    const baseURL = process.env.API_URL ?? "https://localhost:7162/api";
    const url = `${baseURL}/v1/scans`;
    console.log("url is:")
    console.log(url);

    const usePubNub = true;
    const queue :IFinanceScannerQueue<FinanceScanResponse> = !usePubNub ? new AmpImplementation<FinanceScanResponse>(
        {
            rmqhost:"localhost",
            rmqPass:"guest",
            rmqUser:"guest",
        }
    ) : new PubNubImplementation<FinanceScanResponse>();
   

    useEffect(() => {       

        queue.onListen((event: { message: FinanceScanResponse }) => {
            
            console.log("received message")
            console.log(event.message);
            
            const newQuotes = event.message.Quotes;
            if(!newQuotes || newQuotes.length === 0) return;

          //  console.log(event.message.Quotes.length);
            
            setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);

        });



        fetch(url, {

       
            method: 'POST', // or 'PUT', 'PATCH', etc. depending on your use case
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json' // or other appropriate content type
            },
            body: JSON.stringify({
                VehicleId: vechicleId,
                CustomerId:customerId,
                QuoteIds: quoteIds,
  
            })

        })
            .then( async  (response) => {
                if (!response.ok) {
                    // If response status is not 2xx, throw an error
                    console.log("Validation errors!")
                    console.log(response)
                    console.log(response.status)
                    const errorData = await response.json(); // Extract the error message
                    console.log('Validation errors:', errorData);
                    throw new Error('Validation failed');
                }
                const data:{message:string, channel:string} = await response.json(); // Extract the data
                console.log('ran scan with ID:', vechicleId);
                console.log('channel to sub to is:', data.channel);
                console.log(data.message);
                queue.subscribe(data.channel)

            })

            .catch((error) => {
                console.error('Error:', error);
            });
        

        return () => {
            queue.cleanUp();
            
        };
    }, [vechicleId,customerId, queue]);

    const renderCard = (quote: Quote, index: number) => {
        const {
            StandardInfo,
            OfferedInfo,
            EligibilityStatus,
            EligibilityMessages,
        } = quote;

        // Function to determine if standard and offered info match
        const isInfoDifferent = (standard: any, offered: any) => {
            return JSON.stringify(standard) !== JSON.stringify(offered);
        };

        return (
            <div key={index} className="quote-card">
                <h3>Product ID: {quote.ProductId}</h3>
                <p>Status: {EligibilityStatus}</p>
                <div className="eligibility-messages">
                    {EligibilityMessages.map((msg, idx) => (
                        <p key={idx}>Message: {msg.message}</p>
                    ))}
                </div>

                {isInfoDifferent(StandardInfo, OfferedInfo) ? (
                    <div className="quote-info">
                        <h4>Standard Info:</h4>
                        <pre>{JSON.stringify(StandardInfo, null, 2)}</pre>
                        <h4>Offered Info (Different APR):</h4>
                        <pre>{JSON.stringify(OfferedInfo, null, 2)}</pre>
                    </div>
                ) : (
                    <div className="quote-info">
                        <h4>Offered Info:</h4>
                        <pre>{JSON.stringify(OfferedInfo, null, 2)}</pre>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="quote-list">
            <h2>Quotes</h2>
            {quotes.length > 0 ? (
                quotes.map((quote, index) => renderCard(quote, index))
            ) : (
                <p>No quotes yet...</p>
            )}
        </div>
    );
};

export default QuoteList;
