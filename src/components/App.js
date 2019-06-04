import React from 'react';
import '../App.css';



class App extends React.Component {
  state = {
    todo: '',
    todos: [{
      text: 'Finis cette to do list',
      done: false,
    }],
  }

  handleChange = (event) => {
    this.setState({
      todo: event.currentTarget.value,
    });
  }

  handleCheckbox = (index) => {
     // récupérer les informations sur le state
    const { todos } = this.state;
    // gère le state de la checkbox 
    todos[index].done = !todos[index].done;
    this.setState({
       todos,
    });
 }

 handleSubmit = (event) => {
   // récupérer les informations sur le state
   const { todos } = this.state; // resultat
   // ajout d'une nouvelle tâche avec le state par défaut à la liste des tâches
   this.setState({
      todo: '',
      todos: [
         {
            text: event.currentTarget.todo.value,
            done: false,
         },
         ...todos,
      ],
   });
   event.preventDefault();
}

handleRemove = (index) => {
  const { todos } = this.state;
  // elimine un todo dans le todos &
  //  crée un tableau excluant la valeur du todo en fonction de l'index
  this.setState({
     todo: '',
     todos: [
       ...todos.slice(0, index),
       ...todos.slice(index + 1),
     ],
   });
}

  render() {
    const { todo, todos } = this.state;
    return (
      <div className="App">
        <div class="container-fluid">
          <div class="row">    <header style={{ margin: '20px 0 40px 0' }} className="App-header col-12 col" >
            <h1>Bienvenue sur Mydo</h1>
          </header>
            <main className="col col-12">
              <form onSubmit={this.handleSubmit} style={{ marginBottom: '20px' }}>
                <input name="todo" onChange={this.handleChange} value={this.state.todo} className="form-control" type="text" placeholder="Renseiner une tâche à faire...[Appuies Enter]" autoComplete="off" />
              </form>
              <ul className="todos list-groups" style={{ padding: 0 }}>
                {(todos.length === 0)
                  ? (<li className="todo list-group-item">Aucune tâche à faire pour le moment</li>)
                  : (todos.map((item, key) => (
                    <li checked={item.done} key={`list-${(key + 1)}`} className="todo list-group-item">
                      <input onChange={() => this.handleCheckbox(key)} checked={item.done} className="form-control" type="checkbox" />
                      <span style={{
                        top: 0,
                        bottom: 0,
                        left: '3rem',
                        right: '5rem',
                        lineHeight: '62px',
                        display: 'block',
                        position: 'absolute',
                        textDecoration: (item.done) ? 'line-through' : 'none',
                      }}
                      >
                        {item.text}
                      </span>
                      <button
                       onClick={() => this.handleRemove(key)}
                        type="button"
                        className="btn btn-sm btn-danger"
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          right: '1.25rem',
                          margin: 'auto 0',
                          height: '25px',
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                      >
                        &times;
            </button>
                    </li>
                  )))
                }
              </ul>
            </main></div>
        </div>
      </div>
    );
  }
}

export default App;
