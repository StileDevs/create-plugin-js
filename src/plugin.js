import { TextPacket, Peer, Client } from "growtopia.js";
import { readFileSync } from "fs";
import consola from "consola";

// This used to identifies your plugins config, e.g plugin name, version, necessary dependencies & etc.
const PluginPackage = JSON.parse(readFileSync("./package.json", "utf-8"));

export class Plugin {
  /**
   * @param {Client} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Initialize plugin
   */
  init() {
    this.pluginConf = PluginPackage;
    consola.info(`Loaded ${this.pluginConf.name} v${this.pluginConf.version}`);
  }

  /**
   * Emitted when client successfully connected to ENet server.
   * Peer state will change into CONNECTED state.
   * @param {number} netID
   */
  onConnect(netID) {
    consola.log("Client connected", this.client.cache);
    const peer = new Peer(this.client, netID);
    peer.send(TextPacket.from(0x1));
  }

  /**
   * Emitted when client disconnected from the ENet server.
   * Peer state will changed, depends what type of disconnected was used.
   * @param {number} netID
   */
  onDisconnect(netID) {
    consola.log("Client disconnected", this.client.cache);
  }

  /**
   * Emitted when client sending a bunch of buffer data.
   * @param {number} netID
   * @param {Buffer} data
   */
  onRaw(netID, data) {
    consola.log(`Received raw data from netID: ${netID}`, data);
  }
}
