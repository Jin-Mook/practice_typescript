import express, {Request, Response, NextFunction} from 'express';
import todoRouters from './routes/todos'

const app = express()

app.use(express.json())

app.use('/todos', todoRouters);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: err.message})
})

app.listen(3000, () => {console.log('3000번 포트에서 대기 중')});