import { calculateAverage } from "../calculateAverage";

/**
 * Compare la valorisation de l'entreprise à son chiffre d'affaires.
 * @param {Array} companiesData - Données des entreprises.
 * @returns {number} La moyenne des valeurs valides pour cette propriété.
 */
export function comparePS(competitorsData: Array<any>): Record<string, number> {
    let sousEvaluationPSRatio: Record<string, number> = {};
    const avgPSRatio = calculateAverage(competitorsData, 'PriceToSales');
    
    competitorsData.forEach(company => {
        const psRatioDiff = ((avgPSRatio - company.PriceToSales) / avgPSRatio) * 100;
        sousEvaluationPSRatio[company.Symbol] = psRatioDiff;
    });

    return sousEvaluationPSRatio;
}