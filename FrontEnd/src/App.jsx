
import { useRoutes } from 'react-router-dom'

import { routes } from './routes.jsx'
import { Container } from '@chakra-ui/react'
import './App.css'
function App() {
 
const elements = useRoutes(routes)
  return (
    <div style={{height: '100%',backgroundColor: '#f7f7f7fa'}} >
    <Container  height='100vh' maxW='80%' bg='white' color='#262626'>
     {elements}
    </Container>
  </div>
  )
}

export default App
