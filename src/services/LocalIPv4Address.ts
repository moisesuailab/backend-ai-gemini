import os from "os";

const getLocalIPv4Address = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const networkInterfaces = os.networkInterfaces();

    let ipv4Address: string | undefined;

    for (const interfaceName in networkInterfaces) {
      const interfaces = networkInterfaces[interfaceName] || [];
      for (const info of interfaces) {
        if (info.family === "IPv4" && !info.internal) {
          ipv4Address = info.address;
          break;
        }
      }
      if (ipv4Address) break;
    }

    if (ipv4Address) {
      resolve(ipv4Address);
    } else {
      reject(new Error("Não foi possível encontrar um endereço IPv4 válido."));
    }
  });
};

export { getLocalIPv4Address };
