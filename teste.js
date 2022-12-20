async function upload(passChance) {
    return new Promise((resolve, reject) => {
        if (passChance)
            resolve("Upload concluído com sucesso ");
        else
            reject("Upload falhou ")
    })
}

function generatePassPercent(percent) {
    return (Math.random() < percent ? 1 : 0);
}

const requests = Array.from({length: 5}, () => generatePassPercent(0.8));

let total = 0
let totalSucesso = 0
let totalRejeitadas = 0
let falha = []


async function fazerUpload() {
    const promises = requests.map(async passChance => {
        return await upload(passChance)
    })

    await Promise.allSettled(promises)
        .then((resultados) => resultados.forEach((resultado) => {
            total++
            if (resultado.status == 'fulfilled') {
                totalSucesso++
            } else if (resultado.status == 'rejected') {
                totalRejeitadas++
                falha.push(resultado)
            }
        }))

    if (falha == "") {
        falha = ['Nenhuma promise rejeitada']
    }

    return ({
        quantidadeTotalDePromises: total,
        quantidadeDePromisesResolvidas: totalSucesso,
        quantidadeDePromisesRejeitadas: totalRejeitadas,
        registroPromisesRejeitadas: falha,
    })
}

(async () => {
    console.log(await fazerUpload())
})()