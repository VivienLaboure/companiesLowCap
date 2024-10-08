const compareEV_EBITDA = require('./functions/compare/compareEV_EBITDA');
const comparePE = require('./functions/compare/comparePE');
const comparePEG = require('./functions/compare/comparePEG');
const compareRevenueGrowth = require('./functions/compare/compareRevenueGrowth');
const compareDebtToEquity = require('./functions/compare/compareDebtToEquity');
const compareROI = require('./functions/compare/compareROI');
const yahooFinance = require('yahoo-finance2').default;

/**
 * Fonction pour obtenir les données financières d'une entreprise.
 * @param {string} symbol - Le symbole boursier (par exemple, AAPL pour Apple).
 * @returns {Object} Données financières formatées de l'entreprise.
 */
async function getFinancialData(symbol) {
    try {
        const data = await yahooFinance.quoteSummary(symbol, { modules: ['summaryDetail', 'financialData', 'defaultKeyStatistics', 'calendarEvents', 'assetProfile', 'cashflowStatementHistory'] });

        const marketCap = data.summaryDetail.marketCap;
        const totalDebt = data.financialData.totalDebt;
        const cash = data.financialData.totalCash;
        const initialInvestment = 1000; // Montant fixe de l'investissement initial
        const roi = ((marketCap - initialInvestment) / initialInvestment) * 100;


        let dataCompany = {
            Symbol: symbol,
            TrailingPe: data.summaryDetail.trailingPE,
            PegRatio: data.defaultKeyStatistics.pegRatio,
            DividendRate: data.summaryDetail.dividendRate || "N/A",
            DividendYield: data.summaryDetail.dividendYield || "N/A",
            Ebitda: data.financialData.ebitda,
            RevenueGrowth: data.financialData.revenueGrowth,
            TargetMeanPrice: data.financialData.targetMeanPrice,
            DebtToEquity: data.financialData.debtToEquity,
            Roi: roi
        }

        if (data && data.cashflowStatementHistory) {
            const cashFlows = data.cashflowStatementHistory.cashflowStatements;
            let perPeriod = [];
            cashFlows.forEach((statement, index) => {
                if (!perPeriod[index]) {
                    perPeriod[index] = [];
                }

                perPeriod[index].push(statement.maxAge);
                perPeriod[index].push(statement.endDate);
                perPeriod[index].push(statement.netIncome);

                dataCompany['AnalyseCashFlow'] = data.cashflowStatementHistory.maxAge;
                dataCompany['CashFlow'] = perPeriod;
            });
        } else {
            console.log('Données sur les flux de trésorerie non disponibles.');
        }

        if (marketCap && totalDebt && cash) {
            const enterpriseValue = marketCap + totalDebt - cash;
            dataCompany['EntrepriseValue'] = enterpriseValue;
        } else {
            console.log('Impossible de calculer la valeur d\'entreprise : données manquantes.');
        }

        return dataCompany;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}


// Comparer les entreprises concurrentes
compareWithCompetitors(['MSFT', 'GOOGL', 'AAPL']);