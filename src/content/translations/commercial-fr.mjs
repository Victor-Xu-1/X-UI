export default {
  useCasesLabel: 'La recherche en pratique',
  useCasesTitle: 'Partez du problème à résoudre.',
  problemLabel: 'Votre point de départ',
  benefitLabel: 'Ce que vous obtenez',
  nextStepLabel: 'Une première étape',
  viewGuide: 'Lire le guide du parcours',
  selectUseCase: 'Choisir un cas de recherche',
  imageLabel: 'Illustration biomédicale conceptuelle générée par IA',
  imageSourceLabel: 'Contexte de l’image',
  sourceLabel: 'Lire la documentation source',
  motionPause: 'Suspendre les animations',
  motionResume: 'Reprendre les animations',
  products: {
    'x-science': [
      { problem: 'Une question sur une cible est dispersée entre articles, notes et discussions.', benefit: 'Gardez la question, les références et le travail à poursuivre dans un même projet.', nextStep: 'Créez un projet pour une cible ou une publication et ajoutez les documents utiles.' },
      { problem: 'Il faut comprendre un fichier scientifique avant de choisir une analyse.', benefit: 'Examinez les structures, séquences et tableaux pris en charge dans le contexte de la discussion.', nextStep: 'Ouvrez un fichier pris en charge, puis choisissez les outils adaptés à la question.' },
      { problem: 'Une réponse doit être accompagnée de fichiers et de traces d’exécution consultables.', benefit: 'Suivez les retours des outils et examinez les fichiers produits avant de poursuivre.', nextStep: 'Configurez l’environnement nécessaire et lancez une tâche limitée et précise.' }
    ],
    'x-pharma': [
      { problem: 'Les informations sur les cibles, médicaments et essais sont réparties entre plusieurs sources.', benefit: 'Étudiez les entités liées et comparez les informations pharmaceutiques dans l’espace de recherche.', nextStep: 'Choisissez une cible ou un médicament et connectez les sources autorisées.' },
      { problem: 'Une information utile est difficile à relier au document d’origine.', benefit: 'Conservez les emplacements sources et les versions des données avec les fiches documentées.', nextStep: 'Ouvrez une fiche et examinez les preuves qui étayent les données.' },
      { problem: 'Les utilisateurs et les agents ont besoin d’un accès cohérent aux données pharmaceutiques.', benefit: 'L’espace de recherche et MCP utilisent les mêmes services métier et règles d’accès.', nextStep: 'Configurez les données autorisées et connectez un client MCP à ces services.' }
    ],
    'x-dde': [
      { problem: 'Un tableau de candidats ne révèle pas le contexte moléculaire d’un score.', benefit: 'Reliez les candidats à leurs structures 2D et résultats 3D pour les examiner directement.', nextStep: 'Partez d’une structure cible et examinez un candidat dans l’espace de travail.' },
      { problem: 'Une tâche de recherche commence par trop de paramètres inconnus.', benefit: 'Préparez les entrées étape par étape, choisissez une méthode et examinez ses sorties réelles.', nextStep: 'Choisissez une tâche et vérifiez le moteur scientifique ainsi que les données nécessaires.' },
      { problem: 'Le lien avec les documents d’origine se perd au passage entre les tâches.', benefit: 'Gardez les fichiers originaux, les versions dérivées et la provenance des tâches reliés.', nextStep: 'Choisissez la version d’un résultat à utiliser pour la prochaine tâche.' }
    ],
    'x-synth': [
      { problem: 'Une molécule cible nécessite plusieurs voies de synthèse à examiner.', benefit: 'Explorez les suggestions de rétrosynthèse ASKCOS à partir de la structure cible.', nextStep: 'Dessinez ou importez la cible et choisissez une stratégie de recherche.' },
      { problem: 'Une voie proposée dépend de matières premières dont l’approvisionnement reste incertain.', benefit: 'Comparez les structures aux instantanés de stock et examinez les informations d’approvisionnement.', nextStep: 'Vérifiez les matières premières d’une voie dans un catalogue configuré.' },
      { problem: 'Les voies alternatives doivent être discutées et documentées ensemble.', benefit: 'Modifiez des copies de voies et exportez schémas, matières et notes de recherche.', nextStep: 'Examinez les étapes d’une copie de voie, puis exportez-la pour une évaluation chimique.' }
    ],
    'x-patentsar': [
      { problem: 'Les structures et tableaux d’activité sont séparés dans un brevet PDF.', benefit: 'Rassemblez les structures, identifiants et valeurs extraits dans un tableau structure–activité.', nextStep: 'Importez un brevet WIPO PDF pris en charge et examinez l’extraction.' },
      { problem: 'Une attribution ou une valeur doit être vérifiée sur la page d’origine.', benefit: 'Retrouvez la source et corrigez les fiches en conservant preuves et versions.', nextStep: 'Comparez une fiche incertaine avec sa source et enregistrez explicitement la correction.' },
      { problem: 'La chimie d’un brevet doit devenir réutilisable pour la recherche SAR.', benefit: 'Utilisez les sorties d’extraction Excel et SDF avec les images des structures et un rapport QA pour vos recherches.', nextStep: 'Examinez les constats QA et les sources avant d’utiliser les données exportées.' }
    ]
  }
};
