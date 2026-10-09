export default {
  "x-science": {
    "label": "Agent de recherche biomédicale",
    "headline": "D’une question de recherche\nà un travail vérifiable.",
    "summary": "Réunissez littérature, fichiers scientifiques et analyses assistées par des outils dans un projet. Suivez le travail, examinez les fichiers produits et conservez les preuves pour la prochaine question.",
    "audience": "Chercheurs biomédicaux, spécialistes du calcul scientifique et équipes de R&D",
    "environment": "Ubuntu / WSL ; fournisseurs de modèles et environnements scientifiques à configurer",
    "boundary": "Les parcours disponibles dépendent des modèles, connecteurs, environnements et permissions configurés. La destination des données dépend du déploiement ; les chercheurs doivent vérifier les conclusions scientifiques.",
    "features": [
      "Relier articles, discussions et fichiers à la question de recherche",
      "Examiner les structures, séquences et tableaux pris en charge dans leur contexte",
      "Choisir experts, Skills, connecteurs et environnements configurés adaptés à la tâche",
      "Suivre les retours des outils et ouvrir les fichiers produits pour les examiner"
    ],
    "steps": [
      "Définir la question de recherche",
      "Choisir les données et les outils",
      "Examiner les fichiers produits"
    ]
  },
  "x-pharma": {
    "label": "Information pharmaceutique et preuves",
    "headline": "Comprendre la cible.\nRetrouver les preuves.",
    "summary": "Étudiez médicaments, cibles, essais, brevets et transactions à travers des fiches reliées et des données sourcées. Donnez aux chercheurs et agents accès à l’information pharmaceutique avec ses preuves.",
    "audience": "Équipes de développement de médicaments, d’information pharmaceutique et de données",
    "environment": "Linux x86-64 / WSL2 ; Docker et services de données",
    "boundary": "Version de développement. Les licences de données, l’identité d’entreprise, les LLM / OCR et la préparation à la production sont évalués pour chaque déploiement. Apache-2.0 n’accorde pas l’accès aux données tierces.",
    "features": [
      "Comparer les médicaments, cibles, essais, brevets et transactions liés",
      "Examiner les emplacements sources et versions des données derrière un fait",
      "Constituer des données de recherche par une ingestion autorisée et une revue",
      "Utiliser les mêmes services métier et droits dans l’espace de recherche ou par MCP"
    ],
    "steps": [
      "Connecter les sources autorisées",
      "Organiser les faits et les preuves",
      "Étudier avec l’espace de recherche ou MCP"
    ]
  },
  "x-dde": {
    "label": "Découverte de médicaments visuelle",
    "headline": "Voir la molécule.\nRelier la prochaine tâche.",
    "summary": "Préparez cibles, structures et candidats pour les petites molécules, biomédicaments, criblages et DEL. Comparez les candidats dans des tableaux reliés aux résultats 2D / 3D, puis réutilisez les données choisies dans la tâche suivante.",
    "audience": "Chimistes médicinaux, chercheurs en biomédicaments et spécialistes du calcul scientifique",
    "environment": "Windows / Linux / WSL ; installation séparée des moteurs scientifiques",
    "boundary": "L’exécution dépend du moteur, des modèles, des entrées et du matériel sélectionnés. La confiance du modèle, la géométrie, les scores de docking et l’activité mesurée sont des indicateurs distincts.",
    "caption": "Interface réelle X-DDE v0.4.49 : structures et poches de l’exemple public BRD4–JQ1.",
    "features": [
      "Préparer les entrées par étapes et choisir explicitement la méthode",
      "Examiner un candidat avec les tableaux moléculaires et les résultats 2D / 3D reliés",
      "Réutiliser des structures, molécules ou séquences dans la tâche suivante",
      "Relier les sorties aux fichiers originaux, versions dérivées et entrées des tâches"
    ],
    "steps": [
      "Préparer la cible et les entrées",
      "Exécuter la tâche de recherche choisie",
      "Comparer les candidats et choisir la suite"
    ]
  },
  "x-synth": {
    "label": "Rétrosynthèse et recherche en synthèse",
    "headline": "Comparer les voies.\nPlanifier à partir de la structure.",
    "summary": "Dessinez une cible, explorez les suggestions ASKCOS et examinez les réactions avec les informations sur les matières premières. Réunissez les voies alternatives et les notes pour une évaluation chimique.",
    "audience": "Chercheurs en chimie médicinale, en synthèse et en chimie des procédés",
    "environment": "Linux / WSL ; modèles ASKCOS et données de stock configurés",
    "boundary": "ASKCOS est le moteur de génération de voies actuellement intégré. Les scores des modèles, les preuves de catalogue et la faisabilité expérimentale sont évalués séparément. Les voies nécessitent une vérification chimique et expérimentale.",
    "features": [
      "Dessiner ou importer une cible et comparer les stratégies de recherche",
      "Examiner ensemble réactions, matières premières et références de conditions",
      "Vérifier les informations d’approvisionnement par structure contre les instantanés de stock",
      "Modifier des copies de voies et exporter schémas, matières et notes"
    ],
    "steps": [
      "Confirmer la structure cible",
      "Chercher et comparer les voies",
      "Examiner les matières et étapes de réaction"
    ]
  },
  "x-patentsar": {
    "label": "Extraction de chimie et d’activité des brevets",
    "headline": "Des pages de brevet\naux données SAR structurées.",
    "summary": "Extrayez structures, identifiants et valeurs d’activité des brevets WIPO PDF pris en charge en tableaux structure–activité vérifiables. Examinez les pages originales, corrigez les fiches et exportez les données pour poursuivre la recherche.",
    "audience": "Chimistes médicinaux, analystes de brevets et chercheurs en SAR",
    "environment": "Linux / WSL2 ; DECIMER et RDKit",
    "boundary": "L’adaptateur de production cible les brevets PDF de l’OMPI. La validation formelle exige la réussite du QA central ; les sources incertaines, contradictoires ou de faible qualité doivent être examinées. Les propriétés prédites servent aux recherches ultérieures.",
    "features": [
      "Réunir structures, identifiants et valeurs d’activité originales dans un tableau",
      "Vérifier les associations structure–activité aux emplacements sources",
      "Corriger structures et fiches en conservant preuves et versions",
      "Exporter Excel, SDF, images des structures et rapports QA"
    ],
    "steps": [
      "Importer un brevet PDF pris en charge",
      "Vérifier l’extraction avec la source",
      "Exporter les résultats structure–activité"
    ]
  }
};
