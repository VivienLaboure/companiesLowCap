import compareWithCompetitors_console from './functions/compareWithCompetitors_console.ts';
require('dotenv').config();

//exemple de symboles de concurrents pharmaceutiques à comparer 
const competitors = ['PFE', 'MRK', 'JNJ', 'GSK', 'AZN'];
compareWithCompetitors_console(competitors);