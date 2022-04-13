import { useContext } from "react";
import Modal from "react-modal"
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeModalImg from "../../assets/close.svg"
import inComeImg from "../../assets/income.svg"
import outComeImg from "../../assets/outcome.svg"
import { FormEvent, useState } from "react";
import { api } from "../../services/api";
import { useTransaction } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const { createTransaction } = useTransaction()

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [type, setType] = useState("deposit")



   async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        
        setTitle("");
        setAmount(0);
        setCategory("")
        setType("deposit")
        
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                >
                
                <img src={closeModalImg} alt="Fechar Modal"/>
            </button>

            <Container onSubmit={handleCreateNewTransaction}>

                <h2>Cadastrar transação</h2>

                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => {setType("deposit")} }
                        isActive={type == "deposit"}
                        activeColor = "green"
                    >
                        <img src={inComeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => {setType("withdraw")} }
                        isActive={type == "withdraw"}
                        activeColor = "red"
                    >
                        <img src={outComeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>

                </TransactionTypeContainer>
     
                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>           
            </Container>

        </Modal>
    );
}