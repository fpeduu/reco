import { Acordo } from "@/models/Acordos";

async function fetchContracts() {
    const response = await fetch('http://localhost:3000/contract/api/');
    const contractList: Acordo[] = await response.json();
    return contractList;
}

async function createContract() {
    const response = await fetch('http://localhost:3000/contract/api/', {
        method: 'POST',
        body: JSON.stringify({
            id: 0,
            descricao: "Teste",
            devedorCpf: "12345678910",
            diaPagamento: new Date(),
            valor: 1000,
            status: "Pendente",
            juros: 0.1,
            qtdParcelas: 10,
            usuarioEmail: "teste@email.com",
        })
    });
    const newContract: Acordo = await response.json();
    return newContract;
}

async function deleteContracts() {
    const response = await fetch('http://localhost:3000/contract/api/', {
        method: 'DELETE',
        body: JSON.stringify({})
    });
    const deletedContracts: Acordo[] = await response.json();
    return deletedContracts;
}

export default async function ContractPage() {
    const contracts = await fetchContracts();

    return (
        <div>
            <h1>Contratos</h1>
            {contracts.map((contract) => (
                <div key={contract.id}>
                    <p>CPF: {contract.devedorCpf}</p>
                    <p>Descrição: {contract.descricao}</p>
                    <p>Valor: R${contract.valor}</p>
                    <p>Status: {contract.status}</p>
                    <p>Juros: {contract.juros * 100}%</p>
                    <p>Parcelas: {contract.qtdParcelas}</p>
                    <p>Administrador(a): {contract.usuarioEmail}</p>
                </div>
            ))}
        </div>
    );
}