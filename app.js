// Se crea la funcion express y bodyParser.
const express = require('express');
const bodyParser = require('body-parser');
// Se inicializa express y se indica el puerto asignado.
const app=express();
const port=process.env.port || 5000;
// Procesos para el bodyparser.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Se crean los usuarios.
const users = [{dni: 1, firstname: 'Pepe', lastname: 'Figueres', Email: 'pepe.f@gmail.com'},
{dni: 2, firstname: 'Andrea', lastname: 'Castro', Email: 'andrec@gmail.com'},
{dni: 3, firstname: 'Luis', lastname: 'Gonzales', Email: 'gonzales.l@gmail.com'},
{dni: 4, firstname: 'Maria', lastname: 'Solano', Email: 'marisol@gmail.com'}]
//se crean tabla todos.
const all=[{dni:1,title:'Escuela',keywords:'Institución',userdni:1},
{dni:2,title:'Colegio',keywords:'Institución',userdni:2},
{dni:3,title:'Trabajo',keywords:'Salario',userdni:3},
{dni:4,title:'Oficina',keywords:'Trabajo',userdni:4}]

const task=[{dni:1,title:'Tarea',completed:1,todoid:1,userdni:1},
{dni:2,title:'Examen',completed:0,todoid:2,userdni:2},
{dni:3,title:'Pagos',completed:1,todoid:3,userdni:3},
{dni:4,title:'Días libres',completed:0,todoid:4,userdni:4}]

//se crea el get para la captura del resultado y send la ejecuta en la pagina principal.


app.get('/users',(_,res)=>{
    res.json({ok: true, users});
});

app.get('/user/all/:id', (req, res) =>{
    const{id} = req.params;
	const userall = all.filter((userall) => userall.userdni === Number(id))[0];
    const usertask = task.filter((usertask) => usertask.userdni === Number(id))[0];
	res.json({ok: true, userall,usertask});
});

//captura el id del usuario
app.get('/user/:id', (req, res) =>{
	const{id} = req.params;
	const user = users.filter((user) => user.dni === Number(id))[0];
	res.json({ok: true, user});
});
//captura el id más el id dentro de todos.
app.get('/user/:id/:all', (req, res) =>{
	const{id} = req.params;
	const user = all.filter((user) => user.userdni === Number(id))[0];
	res.json({ok: true, user});
});

app.post('/adduser',(req,res)=>{
    const {dni, firstname, lastname, Email } = req.body;
    if(dni && firstname && lastname && Email){
        users.push({dni, firstname, lastname, Email});
        res.json({ok: true, users});
    }
});

app.post('/all/:id/task',(req,res)=>{
    const {title,completed} = req.body;
    const {id} = req.params;
    const dni = id;
    let cont = 1;
    todoid = id;
    userdni = id;
    if(title && completed){
        task.forEach((x) => {
            if (x.dni == cont) {
                cont++;
            }

        });
        task.push({dni, title, completed, todoid, userdni});
        const tasks = task[task.length - 1];
        res.json({ok: true, tasks});
    }
});

// indica el puerto de transmision.
app.listen(port,()=>{
console.log(`Server is run on port: ${port}`);
});