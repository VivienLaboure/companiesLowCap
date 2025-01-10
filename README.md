# companiesLowCap
companiesLowCap est un outil permettant de comparer trois entreprises sur la base de leurs ratios financiers P/E (Price-to-Earnings) et EV/EBITDA (Enterprise Value to Earnings Before Interest, Taxes, Depreciation, and Amortization). Il affiche également le pourcentage de sous-évaluation ou de surévaluation de chaque entreprise par rapport à ses concurrents, afin de déterminer l'entreprise potentiellement la plus sous-évaluée.

# Installation
Clonez le dépôt :

``` 
git clone https://github.com/votre-utilisateur/companiesLowCap.git
cd companiesLowCap
npm install
```

# Utilisation
Le programme compare des concurrents sur la base des ratios financiers suivants :

P/E (Price-to-Earnings Ratio) : mesure la valorisation de l'entreprise par rapport à ses bénéfices.
EV/EBITDA (Enterprise Value to EBITDA) : compare la valeur de l'entreprise à ses flux de trésorerie avant les intérêts, taxes, dépréciations et amortissements.

# Exemple d'exécution
Voici un exemple de sortie après avoir comparé Apple (AAPL), Microsoft (MSFT), et Google (GOOGL) :

```
--- Comparaison des entreprises ---

Pourcentage de sous-évaluation sur le P/E ratio : {
  MSFT: -13.180980886390941,
  GOOGL: 24.0298801668634,
  AAPL: -10.848899280472466
}
Pourcentage de sous-évaluation sur le EV/EBITDA ratio : {
  MSFT: -6.557730301083671,
  GOOGL: 23.61392202912217,
  AAPL: -17.056191728038467
}
Pourcentage de sous-évaluation sur le PEG ratio : {
  MSFT: -4.368932038834945,
  GOOGL: 49.51456310679612,
  AAPL: -45.145631067961176
}
Pourcentage de sous-évaluation sur le ratio de la croissance de revenus  : {
  MSFT: -35.31157270029672,
  GOOGL: -21.068249258160236,
  AAPL: 56.37982195845698
}
Pourcentage de sous-évaluation sur le ratio d'endettement : {
  MSFT: 44.73764012574675,
  GOOGL: 85.5214345641824,
  AAPL: -130.25907468992912
}
Pourcentage de sous-évaluation sur le ratio de retour sur investissement : {
  MSFT: -7.859723335196887,
  GOOGL: 27.98469823629534,
  AAPL: -20.124974901098465
}

L'entreprise la plus sous-évaluée sur le P/E ratio est : GOOGL
L'entreprise la plus sous-évaluée sur le EV/EBITDA ratio est : GOOGL
L'entreprise la plus sous-évaluée sur le PEG ratio est : GOOGL
L'entreprise la plus sous-évaluée sur la croissance de revenus est : AAPL
L'entreprise la plus sous-évaluée sur le ratio d'endettement est : GOOGL
L'entreprise la plus sous-évaluée sur le ratio de retour sur investissement est : GOOGL
```

# Interprétation
P/E ratio : GOOGL est la plus sous-évaluée avec un pourcentage de 19.05 % au-dessus de la moyenne des concurrents, alors que AAPL et MSFT sont sous la moyenne, respectivement de 15.96 % et 19.05 %.
EV/EBITDA ratio : GOOGL est également la plus sous-évaluée sur ce ratio avec un pourcentage de 16.55 % au-dessus de la moyenne. AAPL et MSFT affichent des pourcentages de sous-évaluation plus élevés, avec 27.51 % et 16.55 % respectivement.
Fonctionnalités
Comparaison de multiples entreprises sur leurs ratios financiers clés.
Détection des entreprises sous-évaluées basées sur des calculs financiers et des données de marché en temps réel.
Visualisation des flux de trésorerie et des ratios de dette/équité pour évaluer la santé financière de chaque entreprise.
Contribution
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request si vous avez des suggestions d'amélioration ou si vous trouvez des bugs.