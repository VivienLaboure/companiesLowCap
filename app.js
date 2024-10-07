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
        // Extraire et afficher les informations pertinentes
        /*console.log('---------')
        console.log(symbol)
        console.log('---------')

        console.log(dataCompany)
        console.log('---------')*/
        return dataCompany;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

/**
 * Fonction pour comparer les ratios financiers d'une entreprise avec ses concurrents et déterminer laquelle est la plus sous-évaluée.
 * @param {string} mainSymbol - Le symbole boursier de l'entreprise principale.
 * @param {string[]} competitors - Liste des symboles boursiers des concurrents.
 */
async function compareWithCompetitors(mainSymbol, competitors) {
    try {
        const mainCompanyData = await getFinancialData(mainSymbol);

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
        console.log(`Données de l'entreprise principale (${mainSymbol}):`, mainCompanyData);

        // Calcul des moyennes des concurrents
        let totalPe = 0, totalEvEbitda = 0;
        competitorsData.forEach(company => {
            totalPe += company.TrailingPe || 0;
            totalEvEbitda += (company.EntrepriseValue / company.Ebitda) || 0;
        });

        const avgPe = totalPe / competitorsData.length;
        const avgEvEbitda = totalEvEbitda / competitorsData.length;

        console.log(`\nMoyenne P/E des concurrents: ${avgPe.toFixed(2)}`);
        console.log(`Moyenne EV/EBITDA des concurrents: ${avgEvEbitda.toFixed(2)}`);

        // Comparaison des entreprises et calcul du pourcentage de sous-évaluation
        let sousEvaluationPe = {};
        let sousEvaluationEvEbitda = {};

        const mainPeDiff = ((avgPe - mainCompanyData.TrailingPe) / avgPe) * 100;
        const mainEvEbitdaDiff = ((avgEvEbitda - (mainCompanyData.EntrepriseValue / mainCompanyData.Ebitda)) / avgEvEbitda) * 100;

        sousEvaluationPe[mainSymbol] = mainPeDiff;
        sousEvaluationEvEbitda[mainSymbol] = mainEvEbitdaDiff;

        competitorsData.forEach(company => {
            const peDiff = ((avgPe - company.TrailingPe) / avgPe) * 100;
            const evEbitdaDiff = ((avgEvEbitda - (company.EntrepriseValue / company.Ebitda)) / avgEvEbitda) * 100;

            sousEvaluationPe[company.Symbol] = peDiff;
            sousEvaluationEvEbitda[company.Symbol] = evEbitdaDiff;
        });

        console.log(`\nPourcentage de sous-évaluation sur le P/E ratio :`, sousEvaluationPe);
        console.log(`Pourcentage de sous-évaluation sur le EV/EBITDA ratio :`, sousEvaluationEvEbitda);

        // Trouver l'entreprise la plus sous-évaluée
        const mostUndervaluedPe = Object.keys(sousEvaluationPe).reduce((a, b) => sousEvaluationPe[a] > sousEvaluationPe[b] ? a : b);
        const mostUndervaluedEvEbitda = Object.keys(sousEvaluationEvEbitda).reduce((a, b) => sousEvaluationEvEbitda[a] > sousEvaluationEvEbitda[b] ? a : b);

        console.log(`\nL'entreprise la plus sous-évaluée sur le P/E ratio est : ${mostUndervaluedPe}`);
        console.log(`L'entreprise la plus sous-évaluée sur le EV/EBITDA ratio est : ${mostUndervaluedEvEbitda}`);

    } catch (error) {
        console.error('Erreur lors de la comparaison', error);
    }
}


compareWithCompetitors('AAPL', ['MSFT', 'GOOGL', 'AMZN']);
//getFinancialData('AAPL');

