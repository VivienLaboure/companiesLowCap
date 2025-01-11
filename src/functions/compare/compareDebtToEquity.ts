import { calculateAverage } from "../calculateAverage";
/**
 * Compare les bénéfices avant intérêts, impôts, dépréciation et amortissement.
 * @param {Array} companiesData - Données des entreprises.
 * @returns {number} La moyenne des valeurs valides pour cette propriété.
 */
export function compareDebtToEquity(competitorsData: any[]) {
    let sousEvaluationDebtToEquity:Array<any> = [];
    const avgDebtToEquity = calculateAverage(competitorsData, 'DebtToEquity');

    competitorsData.forEach(company => {
        const debtToEquityDiff = ((avgDebtToEquity - company.DebtToEquity) / avgDebtToEquity) * 100;
        sousEvaluationDebtToEquity[company.Symbol] = debtToEquityDiff;
    });

    return sousEvaluationDebtToEquity;
}