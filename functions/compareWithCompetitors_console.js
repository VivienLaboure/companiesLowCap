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
    let totalPe = 0, totalEvEbitda = 0, count = 1;
    competitorsData.forEach(company => {
        count++;
        totalPe += company.TrailingPe || 0;
        totalEvEbitda += (company.EntrepriseValue / company.Ebitda) || 0;
        console.log(company.TrailingPe)
    });
    let moyenne = totalPe / count;
    const marges = [];
    console.log("Moyenne: ", moyenne); 
    competitorsData.forEach(company => {
        let margePe = (company.TrailingPe - moyenne) / moyenne * 100
        let margeEbitda = (company.Ebitda - moyenne) / moyenne * 100
        let margePEG = (company.Ebitda - moyenne) / moyenne * 100
        let margeRevenuGrowth = (company.Ebitda - moyenne) / moyenne * 100
        let margeDebtToEquity = (company.margeDebtToEquity - moyenne) / moyenne * 100
        let margeRoi = (company.Roi - moyenne) / moyenne * 100
        let margeFcYield = (company.Roi - moyenne) / moyenne * 100
        let margePS = (company.PsValie - moyenne) / moyenne * 100

        marges.push({actualSymbol: { 
            "Symbol": company.Symbol,
            "PE": margePe, 
            "EBITDA": margeEbitda, 
            "PEG": margePEG,
            "RevenuGrowth": margeRevenuGrowth,
            "DebtToEquity": margeDebtToEquity,
            "ROI": margeRoi,
            "FcYield": margeFcYield,
            "PS": margePS
        }})
    });
    console.log("marges: ", marges)

    const peComparaison = comparePE(competitorsData);
    const evEbitdaComparaison = compareEV_EBITDA(competitorsData);
    const pegComparaison = comparePEG(competitorsData);
    const revenueGrowthComparaison = compareRevenueGrowth(competitorsData);
    const debtToEquityComparaison = compareDebtToEquity(competitorsData);
    const roiComparaison = compareROI(competitorsData);
    const fcYieldComparaison = compareFCFYield(competitorsData);
    const psComparaison = comparePS(competitorsData);

    // Trouver l'entreprise la plus sous-évaluée
    const mostUndervaluedPe = Object.keys(peComparaison).reduce((a, b) => peComparaison[a] > peComparaison[b] ? a : b, '');
    const mostUndervaluedEvEbitda = Object.keys(evEbitdaComparaison).reduce((a, b) => evEbitdaComparaison[a] > evEbitdaComparaison[b] ? a : b, '');
    const mostUndervaluedPeg = Object.keys(pegComparaison).reduce((a, b) => pegComparaison[a] > pegComparaison[b] ? a : b, '');
    const mostUndervaluedRevenueGrowth = Object.keys(revenueGrowthComparaison).reduce((a, b) => revenueGrowthComparaison[a] > revenueGrowthComparaison[b] ? a : b, '');
    const mostUndervaluedDebtToEquity = Object.keys(debtToEquityComparaison).reduce((a, b) => debtToEquityComparaison[a] > debtToEquityComparaison[b] ? a : b, '');
    const mostUndervaluedRoi = Object.keys(roiComparaison).reduce((a, b) => roiComparaison[a] > roiComparaison[b] ? a : b, '');
    const mostUndervaluedFcYield = Object.keys(fcYieldComparaison).reduce((a, b) => fcYieldComparaison[a] > fcYieldComparaison[b] ? a : b, '');
    const mostUndervaluedPs = Object.keys(psComparaison).reduce((a, b) => psComparaison[a] > psComparaison[b] ? a : b, '');

    const highScores = {
        'SOPERatio': mostUndervaluedPe,
        'SOEvEbitdaRatio': mostUndervaluedEvEbitda,
        'SOPegRatio': mostUndervaluedPeg,
        'SOCroissanceRevenusRatio': mostUndervaluedRevenueGrowth,
        'SOEndettementRatio': mostUndervaluedDebtToEquity,
        'SORoiRatio': mostUndervaluedRoi,
        'SOFluxTresorerieLibreRatio': mostUndervaluedFcYield,
        'SOValorisationCAeRatio': mostUndervaluedPs,
    };

    console.log("\nHighScore : ", highScores);

}

module.exports = compareWithCompetitors_console;