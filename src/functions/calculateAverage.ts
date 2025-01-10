/**
 * Fonction pour calculer la moyenne d'une propriété donnée des données des entreprises.
 * @param {Array} companiesData - Données des entreprises.
 * @param {string} key - La propriété pour laquelle la moyenne doit être calculée (ex: 'DebtToEquity').
 * @returns {number} La moyenne des valeurs valides pour cette propriété.
 */
function calculateAverage(companiesData: Array<any>, key:string): number {
    // Filtrer les entreprises qui ont une valeur valide pour la propriété donnée (non nulle et numérique)
    const validCompanies = companiesData.filter(company => company[key] != null && !isNaN(company[key]));

    // Si aucune entreprise n'a de valeur valide, retourner NaN
    if (validCompanies.length === 0) {
        console.log(`Aucune entreprise avec une valeur valide pour ${key}.`);
        return NaN;
    }

    // Calculer la somme des valeurs valides
    const total:number = validCompanies.reduce((sum, company) => sum + company[key], 0);

    // Retourner la moyenne
    return total / validCompanies.length;
}

module.exports = calculateAverage;