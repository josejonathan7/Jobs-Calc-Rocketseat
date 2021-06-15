let data = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    }
];

module.exports = {
    get(){
        return data
    },
    update(newJob){
        data = newJob
    },
    delete(id){
        //forEach map filter, find todas essas funções tem funcionalidades parecidas
        // o filter vai compara o id do meu jobId com o id do meu job, se o id for diferente então ele vai manter aquele id
        //no meu registro nesse caso no data, se o id for igual então ele vai remover aquele Id, se ele remover algum id então ele devolve um novo array
        //sem o registro que foi removido
        data = data.filter(job => Number(job.id) !== Number(id))
    }
}