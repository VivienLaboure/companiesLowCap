require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

/**
 * Fonction pour récupérer les données financières clés d'une entreprise.
 * @param {string} symbol - Le symbole boursier de l'entreprise (ex : AAPL pour Apple).
 */
async function getCompanyOverview(symbol) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'OVERVIEW',
                symbol: symbol,
                apikey: API_KEY
            }
        });

        const data = response.data;
        //console.log('Données de l\'entreprise:', data);

        // Afficher les indicateurs clés
        console.log(`P/E Ratio: ${data.PERatio}`);
        console.log(`PEG Ratio: ${data.PEGRatio}`);
        console.log(`Dividende par action: ${data.DividendPerShare}`);
        console.log(`Rendement du dividende: ${data.DividendYield}`);
        console.log(`EBITDA: ${data.EBITDA}`);
        console.log(`Valeur d'entreprise: ${data.EnterpriseValue}`);
        console.log(`Croissance du chiffre d'affaires YOY: ${data.QuarterlyRevenueGrowthYOY}`);
        console.log(`Analyse des analystes (Target Price): ${data.AnalystTargetPrice}`);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error.message);
    }
}

// Exemple d'appel pour récupérer les données de Apple (AAPL)
getCompanyOverview('AAPL');
