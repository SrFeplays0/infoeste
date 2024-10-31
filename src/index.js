import  express  from "express";

const app = express();

app.use(express.json());

let usuarios = [
    {id: 1, nome: 'João', email: "joao@email.com", idade: 25},
    {id: 2, nome: 'felipe', email: "felipe@email.com", idade: 20},
    {id: 3, nome: 'pedro', email: "pedro@email.com", idade: 100},
    {id: 4, nome: 'lucas', email: "lucas@email.com", idade: 12}
]

app.get("/", (req, res) =>{
    res.send("Hello Wolrd => Olá Mundo");
});

app.get("/usuarios", (req, res)=>{
    res.status(200).json({succes: true, data: usuarios})
});

app.get("/usuarios/:id", (req,res) => {
    const id = req.params.id;

    if(!id){
        res.status(400).json({sucess: false, message: "Manda o ID"});
    }else{
        const usuarioEncontrado = usuarios.find((usuario) => usuario.id === Number(id)
        );
        
    if(usuarioEncontrado !== undefined){
        res.status(200).json({
            sucess: true,
            data: usuarioEncontrado,
        });
    }else{
        res.status(404).json({
            succes: false,
            message: "Usuario nao encontrado"
        })
    }
    }
});



app.post("/usuarios",(req, res) =>{
    const {nome, email, idade} = req.body;

    if(!nome || !email || !idade){
        res.status(400).json({
            sucess: false,
            message: "Informaçoes invalidas",
        })
    }else{
        const novoUsuario = {
            id: usuarios[usuarios.length - 1].id + 1,
            nome,
            email,
            idade,
        }

        usuarios.push(novoUsuario);

        res.status(200).json({sucess: true, message: "Usuario criado com sucesso!"});
    }
})



app.listen(5000, () =>{
    console.log('Servidor rodando na porta 5000');
})