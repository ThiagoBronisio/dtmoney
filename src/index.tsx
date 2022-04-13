import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from "miragejs"

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createAt: new Date("2022-03-27 10:47:00"),
        },

        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1000,
          createAt: new Date("2022-01-01 08:47:00")
        }
      ]
    })
  },


  routes() {
    this.namespace = "api";

    this.get("/transaction", () => {
      return this.schema.all('transaction')
    })

    this.post("/transaction", (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
