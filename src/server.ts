import { Kafka } from "kafkajs";
import app from "./config/app";

const kafka = new Kafka({
  clientId: "ms_service",
  brokers: ["kafka:29092"], // kafka e o nome do broker que esta no docker-compose.yml
});

const consumer = kafka.consumer({ groupId: "ms_service_group" });

app.listen(process.env.PORT, async () => {
  try {
    await consumer.connect();

    await consumer.subscribe({ topic: "aprovedbet_delete_client" });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const object = JSON.parse(String(message.value));
        console.log("Reciver:  ", object);
      },
    });
  } catch (error) {}
  console.log("Run Server");
});
