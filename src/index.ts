import { server } from "./server/Server";
import { getLocalIPv4Address } from "./services";

getLocalIPv4Address()
  .then( ipv4Address => {
    server.listen(Number(process.env.PORT) || 3333, () =>
      console.log(
        `Servidor Node.js rodando em http://${ipv4Address}:${
          process.env.PORT || 3333
        }/`
      )
    );
  })
  .catch((error) => {    
    console.error("Erro ao obter endereço IPv4:", error);
  });
