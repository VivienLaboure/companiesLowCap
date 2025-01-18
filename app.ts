import { compareWithCompetitors_console } from './src/functions/compareWithCompetitors_console';
require('dotenv').config();
//exemple de symboles de concurrents pharmaceutiques à comparer 
const competitors = ['PFE', 'MRK', 'JNJ', 'GSK', 'AZN'];
compareWithCompetitors_console(competitors, process.env.MOCK_DATA === 'true');