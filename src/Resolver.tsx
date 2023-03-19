import React from "react";
import {Box, Button, Flex, Image, NumberInput, Title} from "@mantine/core";
import {Operation} from "./App";
import donkey from './images/donkey.png';
import {modals} from '@mantine/modals';


export type Celebration = 'OK' | 'NO' | null

export interface ResolverProps {
    operation: Operation;

    newOperation: () => void;
}

export interface Results {
    oks: number

    kos: number
}

export default function Resolver({operation, newOperation}: ResolverProps) {

    const [tentative, setTentative] = React.useState<number | null>(null);
    const [results, setResults] = React.useState<Results>({oks: 0, kos: 0});
    const [celebration, setCelebration] = React.useState<Celebration>(null);
    const [image, setImage] = React.useState<string | null>(null);

    function resultChanged(value: number) {
        setTentative(value);
    }

    function check() {
        if (tentative === operation.result) {
            setResults({oks: results.oks + 1, kos: results.kos});
            setCelebration("OK");
            fetchNewImage();
        } else {
            setResults({oks: results.oks, kos: results.kos + 1})
            setCelebration("NO");
        }
    }

    function requestNewOperation() {
        setCelebration(null);
        setTentative(null)
        setImage(null);
        newOperation();
    }

    function showResults() {
        modals.open({
            title: 'Risultati',
            centered: true,
            children: <Box>Hai dato {results.oks} risposte corrette e {results.kos} sbagliate!</Box>,
        });
    }

    function fetchNewImage() {
        fetch('https://dog.ceo/api/breeds/image/random').then((result) => result.json()).then((json) => setImage(json.message));
    }

    function getCelebrationImage() {
        let ret = <></>;

        if (celebration === 'OK') {
            ret = <Box><Image alt={'puppy'} src={image ?? ""}/></Box>
        } else if (celebration === 'NO') {
            ret = <Box><Image alt={'donkey'} src={donkey}/></Box>
        }
        return ret
    }

    function getCelebrationString() {
        let ret = "";

        if (celebration === 'OK') {
            ret = "Bravo!"
        } else if (celebration === 'NO') {
            ret = "Eh, no!";
        }
        return ret
    }

    return (
        <>
            <h1>Quanto fa {operation.first} X {operation.second}?</h1>
            <Flex justify={"center"} align={"flex-end"}>
                <NumberInput
                    disabled={celebration !== null}
                    defaultValue={""}
                    placeholder="Risposta"
                    label="Risposta"
                    value={tentative || ""}
                    onChange={resultChanged}
                    hideControls
                />
                <Button disabled={celebration !== null} onClick={check}>Verifica</Button>

            </Flex>
            <Flex direction={'column'}>
                <Title>{getCelebrationString()}</Title>
                {celebration !== null &&
                    <>
                        <Button m={5} onClick={requestNewOperation}>Di nuovo!</Button>
                        <Button m={5} onClick={showResults}>Risultati</Button>
                    </>}
                {getCelebrationImage()}
            </Flex>
        </>
    );
}
