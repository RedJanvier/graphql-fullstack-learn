import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/test', (_, res) => res.sendStatus(200));

app.listen(PORT, console.log(`Server started at http://localhost:${PORT}/graphql`));

export default app;
