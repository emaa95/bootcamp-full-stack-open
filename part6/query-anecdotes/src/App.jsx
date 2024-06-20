import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { updateAnecdote } from './requests'


const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      console.log('Updated anecdote:', updatedAnecdote);
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => {
        return oldAnecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );
      });
    },
  });

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

 
  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),  
    refetchOnWindowFocus: false
  })  
  
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }

  if ( result.isError) {
    return <span>Error: anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
