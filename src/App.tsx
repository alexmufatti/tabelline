import React from 'react';
import './App.css';
import Resolver from "./Resolver";
import {Button, Flex} from "@mantine/core";

export interface Operation {
    first: number,
    second: number,
    result: number
}

function App() {

    const [operation, setOperation] = React.useState<Operation | null>(null)
    const [tabellina, setTabellina] = React.useState<number>(0)

    function newOperation(n: number) {
        const first = Math.floor(1 + (Math.random() * (n - 1)));
        const second = Math.floor(Math.random() * 10);
        setOperation({first, second, result: first * second});
    }

    function start(n: number) {
        setTabellina(n)
        newOperation(n);
    }

    return (
        <Flex direction={'column'} className="App">
            <header className="App-header">
                Vuoi imparare le tabelline?
            </header>
            {operation !== null ? (
                <Flex direction={'column'}  className="App-section">
                    <Resolver operation={operation} newOperation={() => newOperation(tabellina)}/>
                </Flex>) : (
                <Flex direction={'column'} className="App-section">
                    <p>Fino a quale tabellina vuoi giocare?</p>
                    <Flex wrap={'wrap'} justify={'center'}>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <Button m={5} onClick={() => start(n)}>{n}</Button>)}
                </Flex>
                </Flex>)}

            <Button onClick={() => setOperation(null)}>Nuova partita</Button>
        </Flex>
    );
}

export default App;
