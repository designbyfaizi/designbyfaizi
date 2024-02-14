// PrideLogics Test Reattempt

function _gasStation(strArr) {
    const N = Number(strArr[0]);

    const stations = strArr.slice(1).map((str) => {
        const [gas, cost] = str.split(":").map(Number);
        return { gas, cost };
    });

    for (let start = 1; start <= N; start++) {
        let currentGas = 0;
        let possible = true;
        let index = start;

        for (let i = 0; i < N; i++) {
            const station = stations[index - 1];
            const { gas, cost } = station;

            currentGas += gas - cost;

            if (currentGas < 0) {
                possible = false;
                break;
            }
            index = (index % N) + 1;
        }

        if (possible) return start;
    }
    return "impossible";
}

const arr = ["4", "3:1", "2:2", "1:2", "0:1"];
const arr2 = ["4", "1:1", "2:2", "1:2", "0:1"];
const arr3 = ["4", "0:1", "10:2", "1:3", "2:4"];
console.log(_gasStation(arr)); // 1
console.log(_gasStation(arr2)); // impossible
console.log(_gasStation(arr3)); // 2