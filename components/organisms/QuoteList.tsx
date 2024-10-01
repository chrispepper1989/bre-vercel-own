"use client"
import React, { useEffect, useState } from "react";
import PubNub from "pubnub";
import './QuoteList.css';
import Pubnub from "pubnub";
import {undefined} from "zod";


// Define the structure for a Quote
interface Quote {
    productId: number;
    eligibilityStatus: string;
    eligibilityMessages: { message: string }[];
    standardInfo: any;
    offeredInfo: any;
}

// Define the structure for a Finance Scan Response
interface FinanceScanResponse {
    financeScannerId: string;
    quotes: Quote[];
}

const QuoteList: React.FC<{ eligibilityId: string, channel: string }> = ({eligibilityId, channel}) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const baseURL = process.env.API_URL ?? "https://localhost:7075/api";
    const url = `${baseURL}/FinanceScan/run/${eligibilityId}`;
    console.log("url is:")
    console.log(url);




    const pubnub = new PubNub({
        publishKey: "pub-c-a01b31d5-61bf-428e-bd87-69cce079dfc7",
        subscribeKey: "sub-c-a67ff09b-e10a-47b0-ad44-d892f870f841",
        userId:"chris.pepper@ivendi.com"
    });

    useEffect(() => {

        console.log("subbing to ")
        console.log(channel)
        
        pubnub.subscribe({ channels: [channel] });

        const listener = {
            
            message: (event: { message: FinanceScanResponse }) => {
                console.log("received message")
                console.log(event.message);
                const newQuotes = event.message.quotes;
                setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
                
            },
        };

        pubnub.addListener(listener);



        fetch(url, {

            headers: {
                'accept': '*/*'
            },

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
                console.log('ran scan with ID:', eligibilityId);
                console.log('channel to sub to is:', channel);

            })

            .catch((error) => {
                console.error('Error:', error);
            });
        

        return () => {
            pubnub.removeListener(listener);
            pubnub.unsubscribeAll();
        };
    }, [eligibilityId, pubnub]);

    const renderCard = (quote: Quote, index: number) => {
        const {
            standardInfo,
            offeredInfo,
            eligibilityStatus,
            eligibilityMessages,
        } = quote;

        // Function to determine if standard and offered info match
        const isInfoDifferent = (standard: any, offered: any) => {
            return JSON.stringify(standard) !== JSON.stringify(offered);
        };

        return (
            <div key={index} className="quote-card">
                <h3>Product ID: {quote.productId}</h3>
                <p>Status: {eligibilityStatus}</p>
                <div className="eligibility-messages">
                    {eligibilityMessages.map((msg, idx) => (
                        <p key={idx}>Message: {msg.message}</p>
                    ))}
                </div>

                {isInfoDifferent(standardInfo, offeredInfo) ? (
                    <div className="quote-info">
                        <h4>Standard Info:</h4>
                        <pre>{JSON.stringify(standardInfo, null, 2)}</pre>
                        <h4>Offered Info (Different APR):</h4>
                        <pre>{JSON.stringify(offeredInfo, null, 2)}</pre>
                    </div>
                ) : (
                    <div className="quote-info">
                        <h4>Offered Info:</h4>
                        <pre>{JSON.stringify(offeredInfo, null, 2)}</pre>
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
