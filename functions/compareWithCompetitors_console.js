const compareDebtToEquity = require("./compare/compareDebtToEquity");
const compareEV_EBITDA = require("./compare/compareEV_EBITDA");
const compareFCFYield = require("./compare/compareFCYIELD");
const comparePE = require("./compare/comparePE");
const comparePEG = require("./compare/comparePEG");
const comparePS = require("./compare/comparePS");
const compareRevenueGrowth = require("./compare/compareRevenueGrowth");
const compareROI = require("./compare/compareROI");
const getFinancialData = require("./getFinancialData");

/**
 * Fonction pour comparer les ratios financiers des concurrents.
 * @param {string[]} competitors - Liste des symboles boursiers des concurrents.
 */
async function compareWithCompetitors_console(competitors) {
    let competitorsData = [];
    for (const competitor of competitors) {
        const competitorData = await getFinancialData(competitor);
        if (competitorData.DividendRate != 'N/A') {
            competitorsData.push(competitorData);
        } else {
            console.log("Dividendes inconnues pour ", competitor);
        }
    }

    // Calcul des moyennes des concurrents
    let totalPe = 0, totalEvEbitda = 0;
    competitorsData.forEach(company => {
        totalPe += company.TrailingPe || 0;
        totalEvEbitda += (company.EntrepriseValue / company.Ebitda) || 0;
    });

    const peComparaison = comparePE(competitorsData);
    const evEbitdaComparaison = compareEV_EBITDA(competitorsData);
    const pegComparaison = comparePEG(competitorsData);
    const revenueGrowthComparaison = compareRevenueGrowth(competitorsData);
    const debtToEquityComparaison = compareDebtToEquity(competitorsData);
    const roiComparaison = compareROI(competitorsData);
    const fcYieldComparaison = compareFCFYield(competitorsData);
    const psComparaison = comparePS(competitorsData);

    // Trouver l'entreprise la plus sous-évaluée
    const mostUndervaluedPe = Object.keys(peComparaison).reduce((a, b) => peComparaison[a] > peComparaison[b] ? a : b);
    const mostUndervaluedEvEbitda = Object.keys(evEbitdaComparaison).reduce((a, b) => evEbitdaComparaison[a] > evEbitdaComparaison[b] ? a : b);
    const mostUndervaluedPeg = Object.keys(pegComparaison).reduce((a, b) => pegComparaison[a] > pegComparaison[b] ? a : b);
    const mostUndervaluedRevenueGrowth = Object.keys(revenueGrowthComparaison).reduce((a, b) => revenueGrowthComparaison[a] > revenueGrowthComparaison[b] ? a : b);
    const mostUndervaluedDebtToEquity = Object.keys(debtToEquityComparaison).reduce((a, b) => debtToEquityComparaison[a] > debtToEquityComparaison[b] ? a : b);
    const mostUndervaluedRoi = Object.keys(roiComparaison).reduce((a, b) => roiComparaison[a] > roiComparaison[b] ? a : b);
    const mostUndervaluedFcYield = Object.keys(fcYieldComparaison).reduce((a, b) => fcYieldComparaison[a] > fcYieldComparaison[b] ? a : b);
    const mostUndervaluedPs = Object.keys(psComparaison).reduce((a, b) => psComparaison[a] > psComparaison[b] ? a : b);


    console.log(`\nSous-évaluée sur le P/E ratio est : ${mostUndervaluedPe}`);
    console.log(`Sous-évaluée sur le EV/EBITDA ratio est : ${mostUndervaluedEvEbitda}`);
    console.log(`Sous-évaluée sur le PEG ratio est : ${mostUndervaluedPeg}`);
    console.log(`Sous-évaluée sur la croissance de revenus est : ${mostUndervaluedRevenueGrowth}`);
    console.log(`Sous-évaluée sur le ratio d'endettement est : ${mostUndervaluedDebtToEquity}`);
    console.log(`Sous-évaluée sur le ratio de retour sur investissement est : ${mostUndervaluedRoi}`);
    console.log(`Sous-évaluée sur le ratio de combien une entreprise génère de flux de trésorerie libre par rapport à sa valeur marchande est : ${mostUndervaluedFcYield}`);
    console.log(`Sous-évaluée sur le ratio de la valorisation de l'entreprise à son chiffre d'affaires est : ${mostUndervaluedPs}`);



        let score =
            (peComparaison[actualSymbol] * 0.25) +
            (evEbitdaComparaison[actualSymbol] * 0.25) +
            (pegComparaison[actualSymbol] * 0.25) +
            (revenueGrowthComparaison[actualSymbol] * 0.25) +
            (debtToEquityComparaison[actualSymbol] * 0.25) +
            (roiComparaison[actualSymbol] * 0.25) +
            (fcYieldComparaison[actualSymbol] * 0.25) +
            (psComparaison[actualSymbol] * 0.25);


            console.log(`Score de ${actualSymbol}: ${score.toFixed(2)}`)

        const ratings = competitor.recommendationTrend.trend;
        ratings.forEach((rating) => {
            const trends =
                `Période: ${rating.period} | ` +
                `Strong Buy: ${rating.strongBuy} | ` +
                `Buy: ${rating.buy} | ` +
                `Hold: ${rating.hold} | ` +
                `Sell: ${rating.sell} | ` +
                `Strong Sell: ${rating.strongSell}`;

            console.log({ name: `Avis des analystes ${actualSymbol}`, value: trends });
        });
    }

module.exports = compareWithCompetitors_console;