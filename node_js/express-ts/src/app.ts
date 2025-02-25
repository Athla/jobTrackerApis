import express, { Request, Response } from "express"

const app = express()


const port = process.env.PORT || 3000


app.get("/", (req: Request, res: Response) => {
	res.json(
		{
			message: "This is a tryout for express + typescript and node.",
			hello: "world"
		}
	)
})

app.listen(port, () => {
	console.log(`The server is running at port: ${port}`)
})
