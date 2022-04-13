import { useContext, useState } from "react"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { Container } from "./styles";
import { useTransaction } from "../../hooks/useTransactions";

export function Summary() {
    const { transactions } = useTransaction();


    const totalDeposits = transactions.reduce((acc, transactions) => {
        if (transactions.type == "deposit") {
            return acc += transactions.amount
        }

        return acc;
    }, 0)

    const totalSaida = transactions.reduce((acc, transactions) => {
        if (transactions.type == "withdraw") {
            return acc -= transactions.amount
        }

        return acc;

    }, 0)

    const total = transactions.reduce((acc, transactions) => {
        if (transactions.type == "deposit") {
            acc += transactions.amount
        } else {
            acc -= transactions.amount
        }

        return acc;
    }, 0)





    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat("pt-BR", {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(totalDeposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong>
                    {new Intl.NumberFormat("pt-BR", {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(totalSaida)}
                </strong>
            </div>

            <div className="background-total">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat("pt-BR", {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(total)}
                </strong>
            </div>
        </Container>
    );
}