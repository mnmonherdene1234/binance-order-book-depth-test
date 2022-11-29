import { GetPriceDto } from "../dto/get-price.dto";
import { Order } from "../dto/order.dto";

export async function fetchOrders(pair: string, limit: number) {
  const response = await fetch(
    `https://api.binance.com/api/v3/depth?limit=${limit}&symbol=${pair}`
  );

  const data = await response.json();

  const bids: Order[] = [];
  for (let i = 0; i < data.bids.length; i++) {
    const [price, amount] = data.bids[i];
    bids.push(new Order(+price, +amount));
  }

  const asks: Order[] = [];
  for (let i = 0; i < data.asks.length; i++) {
    const [price, amount] = data.asks[i];
    asks.push(new Order(+price, +amount));
  }

  return {
    bids,
    asks,
  };
}

export async function getPrice(pair: string): Promise<number> {
  const response = await fetch(
    `https://www.binance.com/api/v3/ticker/price?symbol=${pair}`
  );

  const data: GetPriceDto = await response.json();

  return +data.price;
}

export function averagePrice(orders: Order[]): number {
  let sum = 0;

  for (let i = 0; i < orders.length; i++) {
    sum += orders[i].price;
  }

  return sum / orders.length;
}

export function averageAmount(orders: Order[]): number {
  let sum = 0;

  for (let i = 0; i < orders.length; i++) {
    sum += orders[i].amount;
  }

  return sum / orders.length;
}

export function percentageDifference(a: number, b: number): number {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
}

export function sortByAmountDesc(orders: Order[]): Order[] {
  return orders.sort((a, b) => (a.amount < b.amount ? 1 : -1));
}

export function sortByAmountAsc(orders: Order[]): Order[] {
  return orders.sort((a, b) => (a.amount > b.amount ? 1 : -1));
}
