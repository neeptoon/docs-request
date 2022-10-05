const getWorkers = async () => {
    const response = await fetch('http://localhost:3001/workers');
    return await response.json()
}

export {getWorkers}