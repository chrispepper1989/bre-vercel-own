import {undefined} from "zod";
import {IFinanceScannerQueue} from "@/components/organisms/QuoteList";

import {RabbitMQConnectionConsumer} from "@/components/organisms/RabbitMQConnectionConsumer";

export type TRabbitMqConfig = {
    
    rmqUser: string;
    rmqPass: string;
    rmqhost: string;
  /*  rmqPort?: number;
    rmqVhost?: string;
    rmqQueue?: string;
    rmqExchange?: string;
    rmqRoutingKey?: string;*/

}

export type HandlerCB = (msg: string) => any;



export class AmpImplementation<T> implements IFinanceScannerQueue<T> {

    
    mqConnection!:RabbitMQConnectionConsumer;
    public constructor(config: TRabbitMqConfig) {
        this.mqConnection = new RabbitMQConnectionConsumer(
            config
        );
    }

    listner?: {} = undefined;

    onListen(onEvent: (event: { message: T }) => void) {

        return this.mqConnection.consume((msg) => {
            let obj: T = JSON.parse(msg);
            
            onEvent({message:obj}); 
        
        });
    };
    
    subscribe(channel: string) {
        return this.mqConnection.connect();
        
    };

    cleanUp() {
        if (this.listner) {

        }
        
    }

}