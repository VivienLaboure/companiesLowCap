const calculateAverage = require("../calculateAverage");

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