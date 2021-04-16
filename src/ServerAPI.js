import regeneratorRuntime from "regenerator-runtime"
const SERVER_ADDRESS = "http://localhost:8081";
const type = "mathemagician";

const parse = async (fetchPromise) => {
    const response = await fetchPromise;
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error((await response.json()).error);
    }
};

const startGame = ( rounds ) => {
    return parse(
        fetch(SERVER_ADDRESS + "/games", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                type: type,
                rounds: rounds
            }),
        })
    );
};

const postAnswer = ({answer, id} ) => {
    return parse(
        fetch(SERVER_ADDRESS + "/games/" + id + "/moves", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ guess: answer }),
        })
    );
};

export const createServer = () => {
    return {
        startGame: (params) => startGame(params),
        postAnswer: (params) => postAnswer(params),
    };
};
