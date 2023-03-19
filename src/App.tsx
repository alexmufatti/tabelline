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
    const [operations, setOperations] = React.useState<Operation[]>([])

    function newOperation(ops: Operation[]) {
        if (ops.length === 0) {
            setOperation(null);
        } else {
            const idx = Math.floor((Math.random() * (ops.length - 1)));
            setOperation(ops[idx]);
        }
    }

    function generateAllOperations(n: number): Operation[] {
        const operations: Operation[] = [];
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j <= 10; j++) {
                operations.push({first: i, second: j, result: i * j});
            }
        }
        return operations;
    }

    function start(n: number) {
        let operations = generateAllOperations(n)
        setOperations(operations);
        newOperation(operations);
    }

    return (
        <Flex direction={'column'} className="App">
            <header className="App-header">
                Vuoi imparare le tabelline?
            </header>
            {operation !== null ? (
                <Flex direction={'column'} className="App-section">
                    <Resolver operation={operation}
                              newOperation={() => newOperation(operations)}
                              onOk={() => {
                                  setOperations(operations.filter((o) => o !== operation));
                              }}
                    />
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
