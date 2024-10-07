companiesLowCap
companiesLowCap est un outil permettant de comparer trois entreprises sur la base de leurs ratios financiers P/E (Price-to-Earnings) et EV/EBITDA (Enterprise Value to Earnings Before Interest, Taxes, Depreciation, and Amortization). Il affiche également le pourcentage de sous-évaluation ou de surévaluation de chaque entreprise par rapport à ses concurrents, afin de déterminer l'entreprise potentiellement la plus sous-évaluée.

Installation
Clonez le dépôt :

bash
Copier le code
git clone https://github.com/votre-utilisateur/companiesLowCap.git
cd companiesLowCap
Installez les dépendances :

bash
Copier le code
npm install
Assurez-vous d'avoir accès à l'API Yahoo Finance :

bash
Copier le code
npm install yahoo-finance2
Utilisation
Le programme compare une entreprise principale à deux concurrents sur la base des ratios financiers suivants :

P/E (Price-to-Earnings Ratio) : mesure la valorisation de l'entreprise par rapport à ses bénéfices.
EV/EBITDA (Enterprise Value to EBITDA) : compare la valeur de l'entreprise à ses flux de trésorerie avant les intérêts, taxes, dépréciations et amortissements.
Exemple d'exécution
Voici un exemple de sortie après avoir comparé Apple (AAPL), Microsoft (MSFT), et Google (GOOGL) :

```
--- Comparaison des entreprises ---

Données de l'entreprise principale (AAPL): {
  Symbol: 'AAPL',
  TrailingPe: 34.20213,
  PegRatio: 3.06,
  DividendRate: 1,
  DividendYield: 0.0044,
  Ebitda: 131781001216,
  RevenueGrowth: 0.049,
  TargetMeanPrice: 240.58,
  DebtToEquity: 151.862,
  AnalyseCashFlow: 86400,
  CashFlow: [
    [ 1, 2023-09-30T00:00:00.000Z, 96995000000 ],
    [ 1, 2022-09-24T00:00:00.000Z, 99803000000 ],
    [ 1, 2021-09-25T00:00:00.000Z, 94680000000 ],
    [ 1, 2020-09-26T00:00:00.000Z, 57411000000 ]
  ],
  EntrepriseValue: 3461185794048
}

Moyenne P/E des concurrents: 29.49  
Moyenne EV/EBITDA des concurrents: 20.60

Pourcentage de sous-évaluation sur le P/E ratio :
```json
{
  AAPL: -15.96,
  MSFT: -19.05,
  GOOGL: 19.05
}
Pourcentage de sous-évaluation sur le EV/EBITDA ratio :

json
Copier le code
{
  AAPL: -27.51,
  MSFT: -16.55,
  GOOGL: 16.55
}
L'entreprise la plus sous-évaluée sur le P/E ratio est : GOOGL
L'entreprise la plus sous-évaluée sur le EV/EBITDA ratio est : GOOGL
```

#Interprétation
P/E ratio : GOOGL est la plus sous-évaluée avec un pourcentage de 19.05 % au-dessus de la moyenne des concurrents, alors que AAPL et MSFT sont sous la moyenne, respectivement de 15.96 % et 19.05 %.
EV/EBITDA ratio : GOOGL est également la plus sous-évaluée sur ce ratio avec un pourcentage de 16.55 % au-dessus de la moyenne. AAPL et MSFT affichent des pourcentages de sous-évaluation plus élevés, avec 27.51 % et 16.55 % respectivement.
Fonctionnalités
Comparaison de multiples entreprises sur leurs ratios financiers clés.
Détection des entreprises sous-évaluées basées sur des calculs financiers et des données de marché en temps réel.
Visualisation des flux de trésorerie et des ratios de dette/équité pour évaluer la santé financière de chaque entreprise.
Contribution
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request si vous avez des suggestions d'amélioration ou si vous trouvez des bugs.