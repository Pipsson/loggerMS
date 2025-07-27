/// step1 : Connect to rabbitmq

const amqp = require("amqplib");

async function consumeMessages(){


//establish a connection to RabbitMQ server
     const connection = await amqp.connect("amqp://localhost");
     //create a channel
     const channel = await connection.createChannel();
//declare an exchange
     await channel.assertExchange("logExchange", "direct");

    //declare a queue and bind it to the exchange with a routing key
     const   q  = await channel.assertQueue("InfoQueue");
     await channel.bindQueue(q.queue, "logExchange", "Info");


     channel.consume(q.queue, (msg) => {
        const  data = JSON.parse(msg.content);
        console.log("Received data:", data);
        channel.ack(msg);
     });

}

consumeMessages()