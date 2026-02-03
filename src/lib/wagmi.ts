import { http, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http("https://bsc-dataseed1.binance.org"),
  },
});
