import client, { Connection, Channel, ConsumeMessage } from "amqplib";
import {HandlerCB, TRabbitMqConfig} from "@/components/organisms/AmpImplementation";

//todo this does not work from client, would have to be moved to server
export class RabbitMQConnectionConsumer {
    connection!: Connection;
    channel!: Channel;
    private connected!: Boolean;

    config!: TRabbitMqConfig;
    channelName!: string;

    public constructor(config: TRabbitMqConfig) {
        this.config = config;
    }

    async connect() {
        if (this.connected && this.channel) return;
        try {
            console.log(`⌛️ Connecting to Rabbit-MQ Server`);

            this.connection = await client.connect(
                `amqp://${this.config.rmqUser}:${this.config.rmqPass}@${this.config.rmqhost}:5672`
            );

            console.log(`✅ Rabbit MQ Connection is ready`);

            this.channel = await this.connection.createChannel();
      
            console.log(`🛸 Created RabbitMQ Channel successfully`);

            this.connected = true;

        } catch (error) {
            console.error(error);
            console.error(`Not connected to MQ Server`);
        }
    }


    async consume(handleIncomingNotification: HandlerCB) {

        if (!this.connected || !this.channel) {
            await this.connect();
        }
        /*await this.channel.assertQueue(this.channelName, {
            durable: true,
            
        });*/

        await this.channel?.consume(
            this.channelName,
            (msg) => {
                {
                    if (!msg) {
                        return console.error(`Invalid incoming message`);
                    }
                    
                    handleIncomingNotification(msg?.content?.toString());
                    this.channel.ack(msg);
                }
            },
            {
                noAck: false,
            }
        );

    }
}