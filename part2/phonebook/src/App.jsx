import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    }, [])
    console.log('render', persons.length, 'persons')
  })

  const addPerson = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (foundPerson) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (confirmed) {
        personService.update(foundPerson.id, personObject)
        .then(updatePerson => {
          setPersons(persons.map(person => 
              person.id === updatePerson.id ? updatePerson : person
            ))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error updating person:', error)
        })
      }
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePerson = id => {
    const personToRemove = persons.find(person=> person.id === id)

    const confirmed = window.confirm(`Delete ${personToRemove.name} ? `)
    
    if (confirmed) {
    personService.remove(id).then(() => {
      setPersons(persons.filter(person => person.id !== id));
    }).catch(error => {
      console.error('Error removing person:', error);
    });
    } 
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} onSubmit={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      
      <Persons persons={filteredPersons} removePerson={removePerson}/>
    </div>
  )
}

export default App
