import express from 'express'
import todosRoutes from './routes/todos'

const app = express()
app.use(express.json())
app.use(todosRoutes)

app.listen(3000, () => {
  console.log('3000번 포트에서 대기 중')
});

