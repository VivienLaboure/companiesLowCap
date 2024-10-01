const yahooFinance = require('yahoo-finance2').default;

/**
 * Fonction pour obtenir les données financières d'une entreprise.
 * @param {string} symbol - Le symbole boursier (par exemple, AAPL pour Apple).
 */
async function getFinancialData(symbol) {
    try {
        // Obtenir les données avec plusieurs modules supplémentaires
        const data = await yahooFinance.quoteSummary(symbol, { modules: ['summaryDetail', 'financialData', 'defaultKeyStatistics', 'calendarEvents', 'assetProfile', 'cashflowStatementHistory'] });

        const marketCap = data.summaryDetail.marketCap;
        const totalDebt = data.financialData.totalDebt;
        const cash = data.financialData.totalCash;

        if (marketCap && totalDebt && cash) {
            const enterpriseValue = marketCap + totalDebt - cash;
            console.log(`Valeur d'entreprise (EV): ${enterpriseValue}`);
        } else {
            console.log('Impossible de calculer la valeur d\'entreprise : données manquantes.');
        }
        
        // Extraire et afficher les informations pertinentes
        console.log(`P/E Ratio: ${data.summaryDetail.trailingPE}`);
        console.log(`PEG Ratio: ${data.defaultKeyStatistics.pegRatio}`);
        console.log(`Dividende par action: ${data.summaryDetail.dividendRate}`);
        console.log(`Rendement du dividende: ${data.summaryDetail.dividendYield}`);
        console.log(`EBITDA: ${data.financialData.ebitda}`);
        console.log(`Croissance du chiffre d'affaires YOY: ${data.financialData.revenueGrowth}`);
        console.log(`Analyse des analystes (Target Price): ${data.financialData.targetMeanPrice}`);
        console.log(`Ratio dette/capitaux propres: ${data.financialData.debtToEquity}`);
        console.log(`Présence sur LinkedIn: ${data.assetProfile.website}`);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

async function getCashFlow(symbol) {
    try {
        // Récupérer les informations sur les flux de trésorerie
        const data = await yahooFinance.quoteSummary(symbol, { modules: ['cashflowStatementHistory'] });

        if (data && data.cashflowStatementHistory) {
            const cashFlows = data.cashflowStatementHistory.cashflowStatements;
            console.log('Analyse des flux de trésorerie:');
            cashFlows.forEach((statement, index) => {
                console.log(`Période: ${statement.endDate.fmt}`);
                console.log(`Net Income: ${statement.netIncome.raw}`);
                console.log(`Cash from Operating Activities: ${statement.totalCashFromOperatingActivities.raw}`);
                console.log(`Cash from Investing Activities: ${statement.totalCashflowsFromInvestingActivities.raw}`);
                console.log(`Cash from Financing Activities: ${statement.totalCashFromFinancingActivities.raw}`);
                console.log(`Capital Expenditures: ${statement.capitalExpenditures.raw}`);
                console.log('---');
            });
        } else {
            console.log('Données sur les flux de trésorerie non disponibles.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

getCashFlow('AAPL')
// Exemple d'utilisation pour Apple
//getFinancialData('AAPL');
