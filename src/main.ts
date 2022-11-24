import { Order } from "./dto/order.dto";

async function averageCalculator() {
  const orders = await fetchOrders("MATICUSDT", 100);
  const bidsAveragePrice =
    orders.bids.reduce((prev, cur) => (prev += cur.price), 0) /
    orders.bids.length;
  const asksAveragePrice =
    orders.asks.reduce((prev, cur) => (prev += cur.price), 0) /
    orders.asks.length;

  console.log("AVERAGE PRICE");
  if (bidsAveragePrice > asksAveragePrice) {
    console.log(`BIDS: ${bidsAveragePrice} > ASKS: ${asksAveragePrice}`);
  } else {
    console.log(`BIDS: ${bidsAveragePrice} < ASKS: ${asksAveragePrice}`);
  }
}

async function fetchOrders(pair: string, limit: number) {
  const response = await fetch(
    `https://api.binance.com/api/v3/depth?limit=${limit}&symbol=${pair}`
  );

  const data = await response.json();

  const bids: Order[] = [];
  for (let i = 0; i < data.bids.length; i++) {
    const [price, amount] = data.bids[i];
    bids.push(new Order(price, amount));
  }

  const asks: Order[] = [];
  for (let i = 0; i < data.asks.length; i++) {
    const [price, amount] = data.asks[i];
    asks.push(new Order(price, amount));
  }

  return {
    bids,
    asks,
  };
}

function averagePrice(orders: Order[]): number {
  let sum = 0;

  for (let i = 0; i < orders.length; i++) {
    sum += orders[i].price;
  }

  return sum / orders.length;
}

function averageAmount(orders: Order[]): number {
  let sum = 0;

  for (let i = 0; i < orders.length; i++) {
    sum += orders[i].amount;
  }

  return sum / orders.length;
}

function bootstrap() {
  averageCalculator();
}

bootstrap();
