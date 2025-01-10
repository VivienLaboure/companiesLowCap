const calculateAverage = require("../calculateAverage");

/**
 * Compare le retour sur investissement.
 * @param {Array} companiesData - Données des entreprises.
 * @returns {number} La moyenne des valeurs valides pour cette propriété.
 */
function compareROI(competitorsData) {
    let sousEvaluationROI = {};
    const avgROI = calculateAverage(competitorsData, 'Roi');

    competitorsData.forEach(company => {
        const roiDiff = ((avgROI - company.Roi) / avgROI) * 100;
        sousEvaluationROI[company.Symbol] = roiDiff;
    });

    return sousEvaluationROI;
}

module.exports = compareROI;