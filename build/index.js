"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const services_1 = require("./services");
(0, services_1.getLocalIPv4Address)()
    .then(ipv4Address => {
    Server_1.server.listen(Number(process.env.PORT) || 3333, () => console.log(`Servidor Node.js rodando em http://${ipv4Address}:${process.env.PORT || 3333}/`));
})
    .catch((error) => {
    console.error("Erro ao obter endereço IPv4:", error);
});
