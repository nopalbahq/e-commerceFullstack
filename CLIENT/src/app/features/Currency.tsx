import type { ICurrency } from "../model/currency";

type CurrencyProp = {
  currencies: ICurrency[];
};

export default function currency({ currencies }: CurrencyProp) {
  return (
    <div>
      <h1>Currency List</h1>
      <ul>
        {currencies.map((currency) => {
          return <li key={currency.curency_id}>{currency.currency_name}</li>;
        })}
      </ul>
    </div>
  );
}
