import app from './app.js';
import { PORT } from './config/env';

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
