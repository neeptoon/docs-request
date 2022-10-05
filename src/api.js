const BASE_URL = 'http://localhost:3001/workers'

const getWorkers = async () => {
    const response = await fetch(BASE_URL);
    return await response.json()
}

const getAllOrdersOfWorker = async (workerID) => {
    const response = await fetch(`${BASE_URL}/${workerID}`);
    const data = await response.json()
    return data.orders
}

const getQuantityOfOrders = async () => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    const orders = data.map(worker => worker.orders).flat();
    return  orders.reduce((acc, next) => {
        if (acc[next] >= 1) {
            acc[next] += 1;
            return acc;
        }

        acc[next] = 1;
        return acc;
    }, {})
}

const sendOrder = async ({doc, workerID}) => {
    const order = doc.toUpperCase();

    const currentOrders = await getAllOrdersOfWorker(workerID);

    if (currentOrders.includes(order)) {
        alert('вы уже запросили этот документ')
    } else {
        const newOrders = [...currentOrders, order]
        const response = await fetch(`${BASE_URL}/${workerID}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({orders: newOrders})
        })
        const data = await response.json();
    }
}
export {getWorkers, sendOrder, getQuantityOfOrders}