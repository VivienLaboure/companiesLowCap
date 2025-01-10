/**
 * Fonction pour comparer les ratios financiers des concurrents.
 * @param {string[]} competitors - Liste des symboles boursiers des concurrents.
 */
async function compareWithCompetitors_console(competitors) {
    let competitorsData:Array<any> = [];
    for (const competitor of competitors) {
        const competitorData = await getFinancialData(competitor);
        if (competitorData.DividendRate != 'N/A') {
            competitorsData.push(competitorData);
        } else {
            console.log("Dividendes inconnues pour ", competitor);
        }
    }

    
    // Calcul des moyennes des concurrents
    let totalPe = 0, totalEbitda = 0, totalPegRatio = 0, totalRevenueGrowth = 0, totalDebtToEquity = 0, totalRoi = 0, totalFcYield = 0, totalPs = 0, count = 1;
    competitorsData.forEach(company => {
        count++;
        totalPe += company.TrailingPe || 0;
        totalEbitda += company.Ebitda || 0;
        totalPegRatio += company.PegRatio || 0;
        totalRevenueGrowth += company.RevenueGrowth || 0;
        totalDebtToEquity += company.DebtToEquity || 0;
        totalRoi += company.Roi || 0;
        totalFcYield += company.FCFYield || 0;
        totalPs += company.PriceToSales || 0;
    });
    let moyennePE = totalPe / count;
    let moyenneEbitda = totalEbitda / count;
    let moyennePegRatio = totalPegRatio / count;
    let moyenneRevenueGrowth = totalRevenueGrowth / count;
    let moyenneDebtToEquity = totalDebtToEquity / count;
    let moyenneRoi = totalRoi / count;
    let moyenneFcYield = totalFcYield / count;
    let moyennePs = totalPs / count;
    const marges:Array<object> = [];
    competitorsData.forEach(company => {
        let margePe = (company.TrailingPe - moyennePE) / moyennePE * 100;
        let margeEbitda = (company.Ebitda - moyenneEbitda) / moyenneEbitda * 100;
        let margePEG = (company.PegRatio - moyennePegRatio) / moyennePegRatio * 100;
        let margeRevenueGrowth = (company.RevenueGrowth - moyenneRevenueGrowth) / moyenneRevenueGrowth * 100;
        let margeDebtToEquity = (company.DebtToEquity - moyenneDebtToEquity) / moyenneDebtToEquity * 100;
        let margeRoi = (company.Roi - moyenneRoi) / moyenneRoi * 100;
        let margeFcYield = (company.FCFYield - moyenneFcYield) / moyenneFcYield * 100;
        let margePS = (company.PriceToSales - moyennePs) / moyennePs * 100;

        marges.push({ 
            "Symbol": company.Symbol,
            "Marge PE": `${Math.round(margePe)}%`, 
            "Marge EBITDA": `${Math.round(margeEbitda)}%`, 
            "Marge PEG": `${Math.round(margePEG)}%`,
            "Marge RevenueGrowth": `${Math.round(margeRevenueGrowth)}%`,
            "Marge DebtToEquity": `${Math.round(margeDebtToEquity)}%`,
            "Marge ROI": `${Math.round(margeRoi)}%`,
            "Marge FcYield": `${Math.round(margeFcYield)}%`,
            "Marge PS": `${Math.round(margePS)}%`
        });
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