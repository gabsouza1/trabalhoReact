import React, {useState, useEffect } from 'react';
import './styles.css';

function Agendamento(){
    //Hooks de dados
    const [alunos, setAlunos] = useState([])
    const [disciplina, setDisciplina] = useState('')
    const [professor, setProfessor] = useState ('Escolha o Professor')
    const [carga, setCarga] = useState('')
    const [periodo, setPeriodo] = useState('Escolha seu periodo')
    const [verficarSelect, setVerificarSelect] = useState ('')

    function handleAdicionarNaTabela(event){
      event.preventDefault()
      if(periodo === '' || 
      periodo === 'Escolha seu periodo' ||
      professor === '' ||
      professor === 'Escolha o professor'){
        setVerificarSelect(alerta)
      } else {
        const dados = {
          id: new Date().getTime(),
          disciplina, 
          professor, 
          carga,
          periodo
        }
  
        setAlunos([...alunos, dados])
        limpaForm()
        setVerificarSelect('')
      }
    }

    function alerta(){
      alert('Alguns dados não foram preenchidos corretamente')
    }
    
     
    function handleExcluir(id){
      setAlunos(alunos.filter(alunos => alunos.id !== id))
    }

    function limpaForm(){
      setCarga('')
      setPeriodo('Escolha seu periodo')
      setDisciplina('')
      setProfessor('Escolha o Professor')
    }
    useEffect(() => {
      function loadData() {
        const armazenar = localStorage.getItem("@cadalunos:alunos");
        if (armazenar) {
          setAlunos(JSON.parse(armazenar));
        }
      }
      loadData();
    }, []);
    useEffect(() => {
      function saveData(){
          localStorage.setItem('@cadalunos:alunos', JSON.stringify(alunos))
      }
      saveData()
    }, [alunos])
    return(
      <div className='pagina'>
          <form className='formulario' onSubmit={handleAdicionarNaTabela}>
            <div>
              <label for='periodo'>Periodo</label>
                <select 
                name='Periodo' 
                placeholder="Selecione seu periodo" 
                value={periodo} 
                onChange={(event) => setPeriodo(event.target.value)}
                >
                  <option disabled>Escolha seu periodo</option>
                  <option value='1º Semestre'>1º</option>
                  <option value='2º Semestre'>2º</option>
                  <option value='3º Semestre'>3º</option>
                  <option value='4º Semestre'>4º</option>
                  <option value='5º Semestre'>5º</option>
                  <option value='6º Semestre'>6º</option>
                  <option value='7º Semestre'>7º</option>
                  <option value='8º Semestre'>8º</option>
              </select>
            </div>
            <div>
              <label>Disciplina</label>
                <input 
                type='text' 
                name='disciplina' 
                placeholder='Digite a Disciplina' 
                value={disciplina}
                onChange={(event) => setDisciplina(event.target.value)} 
                required
                />
            </div>
            <div>
              <label>Professor</label>
              <select name='Professor' 
              value={professor}
              onChange={(event) => setProfessor(event.target.value)}
              >
                <option disabled selected>Escolha o Professor</option>
                <option value='1'>Debora Amorim</option>
                <option value='2'>Salete Leone</option>
                <option value='3'>Osni Augusto</option>
                <option value='4'>Luiz Cláudio</option>
                <option value='5'>Carlos Eduardo Costa</option>
              </select>
            </div>
            <div>
              <label>Carga Horaria</label>
              <input 
              name='cargahoraria' 
              id='cargahoraria' 
              type='text' 
              maxlength='3' 
              value={carga}
              placeholder='Digite a carga horária'
              onChange={(event) => {
                if (isNaN(Number(event.target.value))) {
                  return;
                } else {
                  setCarga(event.target.value);
                }
              }}
              />
            </div>
            <div>
              <button type='submit'>Enviar</button>
            </div>

          </form>
          <p>{verficarSelect}</p>
          <table>
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Disciplina</th>
                <th>Professor</th>
                <th>Carga Horária</th>
                <th colspan={1}>Ações</th>
              </tr>
            </thead>
            <tbody>
            {alunos.map(alunos => (
              <tr key={alunos.id}>
                <td>{alunos.periodo}</td>
                <td>{alunos.disciplina}</td>
                <td>{alunos.professor}</td>
                <td>{alunos.carga}</td>
                <td>
                  <button className='Excluir'
                    onClick={() => handleExcluir(alunos.id)}
                    limpaForm
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
      </div>
    )
}


export { Agendamento };