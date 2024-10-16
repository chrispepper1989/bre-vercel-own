import PubNub from "pubnub";
import {undefined} from "zod";
import {IFinanceScannerQueue} from "@/components/organisms/QuoteList";

export class PubNubImplementation<T> implements IFinanceScannerQueue<T> {

    pubnub = new PubNub({
        publishKey: "pub-c-a01b31d5-61bf-428e-bd87-69cce079dfc7",
        subscribeKey: "sub-c-a67ff09b-e10a-47b0-ad44-d892f870f841",
        userId: "chris.pepper@ivendi.com"
    });

   

    listner?: {} = undefined;

    onListen(onEvent: (event: { message: T }) => void) {
        if (this.listner) {
            //only one listener at a time
            this.pubnub.removeListener(this.listner);
        }
        console.log("listening")
        this.listner = {
            message: function (event: { message: T }) {
                onEvent(event);
            }
        }
        this.pubnub.addListener(this.listner);
    };

    subscribe(channel: string) {

        console.log("subbing to ")
        console.log(channel)

        this.pubnub.subscribe({channels: [channel]});

    };

    cleanUp() {
        if (this.listner)
            this.pubnub.removeListener(this.listner);

        this.pubnub.unsubscribeAll();
    }

}