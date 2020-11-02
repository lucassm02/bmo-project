
const baseQuery = require('./baseQuery');

class Feedback {

    async create(req, res) {
        console.log(req.body)
        const {stars, message} = req.body;
        console.log(stars, message)

        const sql = `INSERT INTO db_fiap.tb_feedback (feedback,stars) VALUES ("${message}" ,${stars});`;
        console.log(sql)

        try {
            
            const result =  await baseQuery(sql);
            if(result.insertId){
                res.send({result: true, message: "Feedback cadastrado com sucesso!"})
            }
            console.log(result)
        } catch (error) {
            return res.status(500).json({
                result: false,
                message: "Ocorreu um erro, tente novamente mais tarde."
            })
        }

    }

    async findAll(req, res){
        const sql = "SELECT * FROM tb_feedback;"
        try {
            const result =  await baseQuery(sql);
            return res.send({result: true, payload: result})    
        } catch (error) {
            return res.status(500).json({
                result: false,
                message: "Ocorreu um erro, tente novamente mais tarde."
            })
        }
        
    }
}

module.exports = Feedback;