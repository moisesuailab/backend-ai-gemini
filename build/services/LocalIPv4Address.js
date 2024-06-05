"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIPv4Address = void 0;
const os_1 = __importDefault(require("os"));
const getLocalIPv4Address = () => {
    return new Promise((resolve, reject) => {
        const networkInterfaces = os_1.default.networkInterfaces();
        let ipv4Address;
        for (const interfaceName in networkInterfaces) {
            const interfaces = networkInterfaces[interfaceName] || [];
            for (const info of interfaces) {
                if (info.family === "IPv4" && !info.internal) {
                    ipv4Address = info.address;
                    break;
                }
            }
            if (ipv4Address)
                break;
        }
        if (ipv4Address) {
            resolve(ipv4Address);
        }
        else {
            reject(new Error("Não foi possível encontrar um endereço IPv4 válido."));
        }
    });
};
exports.getLocalIPv4Address = getLocalIPv4Address;
