import React from 'react';
import './App.css';
import Resolver from "./Resolver";
import {Button, Flex, Text} from "@mantine/core";
import {modals} from "@mantine/modals";

export interface Operation {
    first: number,
    second: number,
    result: number
}

export interface Results {
    oks: number

    kos: number
}

function App() {

    const [operation, setOperation] = React.useState<Operation | null>(null)
    const [operations, setOperations] = React.useState<Operation[]>([])

    const [results, setResults] = React.useState<Results>({oks: 0, kos: 0});

    function newOperation(ops: Operation[]) {
        if (ops.length === 0) {
            showResult();
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

    function showResult() {
        modals.open({
            title: 'Risultati',
            centered: true,
            children: <Text>Hai dato {results.oks} risposte corrette <br/> e {results.kos} sbagliate!</Text>,
        });
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
                                  setResults({oks: results.oks + 1, kos: results.kos});
                                  setOperations(operations.filter((o) => o !== operation));
                              }}
                              onKo={() => {
                                  setResults({oks: results.oks, kos: results.kos + 1})
                              }}
                              openResults={() => {
                                      showResult();
                              }}
                    />
                </Flex>) : (
                <Flex direction={'column'} className="App-section">
                    <p>Fino a quale tabellina vuoi giocare?</p>
                    <Flex wrap={'wrap'} justify={'center'}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <Button m={5} onClick={() => start(n)}>{n}</Button>)}
                    </Flex>
                </Flex>)}

            <Button onClick={() => setOperation(null)}>Nuova partita</Button>
        </Flex>
    );
}

export default App;
