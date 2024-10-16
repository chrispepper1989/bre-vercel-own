import client, {Channel, Connection} from "amqplib";
import {TRabbitMqConfig} from "@/components/organisms/AmpImplementation";

export class RabbitMQConnectionPublisher {
    connection!: Connection;
    channel!: Channel;
   
    private connected!: Boolean;

    config!: TRabbitMqConfig;
    
    public constructor(config: TRabbitMqConfig) {
        this.config = config;
    }

    async connect() {
        if (this.connected && this.channel) return;
        else this.connected = true;

        try {
            console.log(`⌛️ Connecting to Rabbit-MQ Server`);
            this.connection = await client.connect(
                `amqp://${this.config.rmqUser}:${this.config.rmqPass}@${this.config.rmqhost}:5672`
            );

            console.log(`✅ Rabbit MQ Connection is ready`);

            this.channel = await this.connection.createChannel();

            console.log(`🛸 Created RabbitMQ Channel successfully`);
        } catch (error) {
            console.error(error);
            console.error(`Not connected to MQ Server`);
        }
    }

    async sendToQueue(queue: string, message: any) {
        try {
            if (!this.channel) {
                await this.connect();
            }

            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}