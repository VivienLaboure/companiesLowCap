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
        console.log('---------')
        console.log(symbol)
        console.log('---------')

        console.log(dataCompany)
        console.log('---------')
        //return dataCompany;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

/**
 * Fonction pour comparer les ratios financiers d'une entreprise avec ses concurrents.
 * @param {string} mainSymbol - Le symbole boursier de l'entreprise principale.
 * @param {string[]} competitors - Liste des symboles boursiers des concurrents.
 */
async function compareWithCompetitors(mainSymbol, competitors) {
    try {
        const mainCompanyData = await getFinancialData(mainSymbol);

        let competitorsData = [];
        for (const competitor of competitors) {
            const competitorData = await getFinancialData(competitor);
            console.log("competitorData: ",competitors)
            if (competitorData) {
                competitorsData.push(competitorData);
            }
        }

        console.log('\n--- Comparaison des entreprises ---\n');
        console.log(`Données de l'entreprise principale (${mainSymbol}):`, mainCompanyData);

        //Calcul des moyennes des concurrents
        let totalPe = 0, totalEvEbitda = 0;
        competitorsData.forEach(company => {
            totalPe += company.trailPe || 0;
            totalEvEbitda += (company.EntrepriseValue / company.Ebitda) || 0;

        });

        const avgPe = totalPe / competitors.length;
        const avgEvEbitda = totalEvEbitda / competitors.length;

        console.log(`\nMoyenne P/E des concurrents: ${avgPe.toFixed(2)}`);
        console.log(`Moyenne EV/EBITDA des concurrents: ${avgEvEbitda.toFixed(2)}`);

        // Comparaison avec l'entreprise principale
        console.log('\n--- Résultat de la comparaison ---');
        if (mainCompanyData.TrailingPe < avgPe) {
            console.log(`${mainSymbol} est potentiellement sous-évaluée sur la base du P/E ratio.`);
        } else {
            console.log(`${mainSymbol} n'est pas sous-évaluée sur la base du P/E ratio.`);
        }

        const mainEvEbitda = mainCompanyData.EntrepriseValue / mainCompanyData.Ebitda;
        if (mainEvEbitda < avgEvEbitda) {
            console.log(`${mainSymbol} est potentiellement sous-évaluée sur la base du ratio EV/EBITDA.`);
        } else {
            console.log(`${mainSymbol} n'est pas sous-évaluée sur la base du ratio EV/EBITDA.`);
        }

    } catch (error) {
        console.error('Erreur lors de la comparaison', error);
    }
}

compareWithCompetitors('AAPL', ['MSFT', 'GOOGL', 'AMZN']);


