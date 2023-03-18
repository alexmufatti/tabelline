import React  from "react";
import {Box, Button, Flex, NumberInput, Title} from "@mantine/core";
import {Operation} from "./App";

export interface ResolverProps {
    operation: Operation;

    newOperation: () => void;
}

export default function Resolver({ operation, newOperation}: ResolverProps) {

    const [tentative, setTentative] = React.useState<number | null>(null);
    const [celebration, setCelebration] = React.useState<string | null>(null);
    const [image, setImage] = React.useState<string | null>(null);
    function resultChanged(value: number) {
        setTentative(value);
    }

    function check() {
        if (tentative === operation.result) {
            setCelebration("Bravo!");
            fetchNewImage();
        } else {
            setCelebration("No, peccato!");
        }
    }

    function requestNewOperation() {
        setCelebration(null);
        setTentative(null)
        setImage(null);
        newOperation();
    }

    function fetchNewImage() {
        fetch('https://dog.ceo/api/breeds/image/random').then((result) => result.json()).then((json) => setImage(json.message));
    }

    return (
        <div>
            <h1>Quanto fa {operation.first} X {operation.second}?</h1>
            <Flex justify={"center"} align={"flex-end"} >
            <NumberInput
                defaultValue={""}
                placeholder="Risposta"
                label="Risposta"
                value={tentative || ""}
                onChange={resultChanged}
                hideControls
            />
            <Button disabled={celebration !== null} onClick={check}>Verifica</Button>

            </Flex>
            {celebration && (
                <>
                <Title>{celebration}</Title>
                <Button onClick={requestNewOperation}>Di nuovo!</Button>
                {image ?
                    <Box><img alt={'puppy'} src={image }/></Box>:
                    <Box><img alt={'puppy'} src={'donkey.png'}/></Box>}
                </>
            ) }
        </div>
    );
}
