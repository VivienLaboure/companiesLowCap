const compareEV_EBITDA = require('./functions/compareEV_EBITDA');
const comparePE = require('./functions/ComparePE');
const comparePEG = require('./functions/comparePEG');
const compareRevenueGrowth = require('./functions/compareRevenueGrowth');
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

        let dataCompany = {
            Symbol: symbol,
            TrailingPe: data.summaryDetail.trailingPE,
            PegRatio: data.defaultKeyStatistics.pegRatio,
            DividendRate: data.summaryDetail.dividendRate || "N/A",
            DividendYield: data.summaryDetail.dividendYield || "N/A",
            Ebitda: data.financialData.ebitda,
            RevenueGrowth: data.financialData.revenueGrowth,
            TargetMeanPrice: data.financialData.targetMeanPrice,
            DebtToEquity: data.financialData.debtToEquity
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

/**
 * Fonction pour comparer les ratios financiers des concurrents.
 * @param {string[]} competitors - Liste des symboles boursiers des concurrents.
 */
async function compareWithCompetitors(competitors) {
    let competitorsData = [];
    for (const competitor of competitors) {
        const competitorData = await getFinancialData(competitor);
        if (competitorData.DividendRate != 'N/A') {
            competitorsData.push(competitorData);
        } else {
            console.log("Dividendes inconnues pour ", competitor);
        }
    }

    console.log('\n--- Comparaison des entreprises ---\n');

    // Calcul des moyennes des concurrents
    let totalPe = 0, totalEvEbitda = 0;
    competitorsData.forEach(company => {
        totalPe += company.TrailingPe || 0;
        totalEvEbitda += (company.EntrepriseValue / company.Ebitda) || 0;
    });

    const peComparaison = comparePE(competitorsData);
    const evEbitdaComparaison = compareEV_EBITDA(competitorsData);
    const pegComparaison = comparePEG(competitorsData);
    const revenueGrowth = compareRevenueGrowth(competitorsData);

    console.log(`\nPourcentage de sous-évaluation sur le P/E ratio :`, peComparaison);
    console.log(`Pourcentage de sous-évaluation sur le EV/EBITDA ratio :`, evEbitdaComparaison);
    console.log(`Pourcentage de sous-évaluation sur le PEG ratio :`, pegComparaison);
    console.log(`Pourcentage de sous-évaluation sur la croissance de revenus ratio :`, revenueGrowth);

    // Trouver l'entreprise la plus sous-évaluée
    const mostUndervaluedPe = Object.keys(peComparaison).reduce((a, b) => peComparaison[a] > peComparaison[b] ? a : b);
    const mostUndervaluedEvEbitda = Object.keys(evEbitdaComparaison).reduce((a, b) => evEbitdaComparaison[a] > evEbitdaComparaison[b] ? a : b);
    const mostUndervaluedPeg = Object.keys(pegComparaison).reduce((a, b) => pegComparaison[a] > pegComparaison[b] ? a : b);
    const mostUndervaluedRevenueGrowth = Object.keys(revenueGrowth).reduce((a, b) => revenueGrowth[a] > revenueGrowth[b] ? a : b);

    console.log(`\nL'entreprise la plus sous-évaluée sur le P/E ratio est : ${mostUndervaluedPe}`);
    console.log(`L'entreprise la plus sous-évaluée sur le EV/EBITDA ratio est : ${mostUndervaluedEvEbitda}`);
    console.log(`L'entreprise la plus sous-évaluée sur le PEG ratio est : ${mostUndervaluedPeg}`);
    console.log(`L'entreprise la plus sous-évaluée sur la croissance de revenus est : ${mostUndervaluedRevenueGrowth}`);
}

// Comparer les entreprises concurrentes
compareWithCompetitors(['MSFT', 'GOOGL', 'AMZN']);