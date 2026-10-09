export default {
  "x-science": {
    "label": "Biomedizinischer Forschungsagent",
    "headline": "Von der Forschungsfrage\nzu prüfbaren Ergebnissen.",
    "summary": "Verbinden Sie Literatur, wissenschaftliche Dateien und werkzeuggestützte Analysen in einem Projekt. Verfolgen Sie die Arbeit, prüfen Sie Ausgabedateien und bewahren Sie die Belege für die nächste Frage.",
    "audience": "Biomedizinische Forschende, Fachleute für wissenschaftliches Rechnen und F&E-Teams",
    "environment": "Ubuntu / WSL; Modellanbieter und wissenschaftliche Umgebungen konfigurieren",
    "boundary": "Verfügbare Abläufe hängen von konfigurierten Modellen, Konnektoren, Umgebungen und Berechtigungen ab. Datenziele ergeben sich aus der Konfiguration; wissenschaftliche Schlussfolgerungen werden von Forschenden geprüft.",
    "features": [
      "Publikationen, Diskussionen und Dateien mit der Forschungsfrage verbinden",
      "Unterstützte Strukturen, Sequenzen und Tabellen im Projektkontext prüfen",
      "Passende Experten, Skills, Konnektoren und konfigurierte wissenschaftliche Umgebungen wählen",
      "Werkzeugmeldungen verfolgen und Ausgabedateien prüfen"
    ],
    "steps": [
      "Forschungsfrage festlegen",
      "Eingaben und Werkzeuge wählen",
      "Entstandene Dateien prüfen"
    ]
  },
  "x-pharma": {
    "label": "Pharma-Informationen und Evidenz",
    "headline": "Informationen verbinden.\nBelege zurückverfolgen.",
    "summary": "Verknüpfen Sie Wirkstoff-, Forschungs-, Patent- und Transaktionseinträge und behalten Sie Quellen sowie Datenversionen im Blick. Forschende und Agenten können Pharma-Informationen in einer Workbench suchen, vergleichen und prüfen.",
    "audience": "Teams für Wirkstoffentwicklung, Pharma-Informationen und Daten",
    "environment": "Linux x86-64 / WSL2; Docker und Datendienste",
    "boundary": "Eine Entwicklungsversion. Datenlizenzen, Unternehmensidentität, LLM / OCR und Produktionsreife werden pro Installation geprüft. Apache-2.0 gewährt keinen Zugriff auf Daten Dritter.",
    "features": [
      "Zusammengehörige Wirkstoff-, Forschungs-, Patent- und Transaktionseinträge vergleichen",
      "Quellenpositionen und Datenversionen hinter Fakten prüfen",
      "Forschungsdaten durch autorisierte Aufnahme und Prüfung aufbauen",
      "Dieselben Fachdienste und Berechtigungen in der Workbench oder über MCP nutzen"
    ],
    "steps": [
      "Autorisierte Quellen verbinden",
      "Fakten und Belege ordnen",
      "Mit Workbench oder MCP untersuchen"
    ]
  },
  "x-dde": {
    "label": "Visuelle Wirkstoffforschung",
    "headline": "Das Molekül sehen.\nDie nächste Aufgabe verbinden.",
    "summary": "Bereiten Sie Molekülstrukturen und Kandidatendaten für kleine Moleküle, Biologika, Screening und DEL vor. Vergleichen Sie Kandidaten in verknüpften Tabellen und 2D-/3D-Ergebnissen und nutzen Sie gewähltes Material in der nächsten Aufgabe.",
    "audience": "Forschende in medizinischer Chemie, Biologika und wissenschaftlichem Rechnen",
    "environment": "Windows / Linux / WSL; separate Installation wissenschaftlicher Engines",
    "boundary": "Die Ausführung hängt von Engine, Modellen, Eingaben und Hardware ab. Modellkonfidenz, Geometrie, Docking-Scores und experimentell gemessene Aktivität haben unterschiedliche Bedeutungen.",
    "features": [
      "Eingaben schrittweise vorbereiten und Methoden ausdrücklich wählen",
      "Kandidaten über verknüpfte Molekültabellen und 2D-/3D-Ergebnisse prüfen",
      "Gewählte Strukturen, Moleküle oder Sequenzen in die nächste Aufgabe übernehmen",
      "Ergebnisse auf Originaldateien, abgeleitete Versionen und Eingaben zurückführen"
    ],
    "steps": [
      "Strukturen und Eingabedateien vorbereiten",
      "Gewählte Forschungsaufgabe ausführen",
      "Kandidaten vergleichen und den nächsten Schritt wählen"
    ]
  },
  "x-synth": {
    "label": "Retrosynthese und Syntheseforschung",
    "headline": "Wege vergleichen.\nVon der Struktur aus planen.",
    "summary": "Zeichnen Sie eine Molekülstruktur, erkunden Sie ASKCOS-Vorschläge und prüfen Sie Reaktionen zusammen mit Belegen zu Ausgangsstoffen. Halten Sie Alternativen und Forschungsaufzeichnungen für die chemische Bewertung zusammen.",
    "audience": "Forschende in medizinischer, synthetischer und Prozesschemie",
    "environment": "Linux / WSL; konfigurierte ASKCOS-Modelle und Bestandsdaten",
    "boundary": "ASKCOS ist die aktuell integrierte Engine zur Routengenerierung. Modellscores, Katalogbelege zur Beschaffung und experimentelle Machbarkeit werden getrennt bewertet; Routen müssen chemisch und experimentell geprüft werden.",
    "features": [
      "Eine Molekülstruktur zeichnen oder importieren und Suchstrategien vergleichen",
      "Reaktionen, Ausgangsstoffe und Bedingungsreferenzen gemeinsam prüfen",
      "Strukturbezogene Beschaffungsbelege mit Bestandsaufnahmen abgleichen",
      "Wegkopien bearbeiten und Diagramme, Materialien und Aufzeichnungen exportieren"
    ],
    "steps": [
      "Molekülstruktur bestätigen",
      "Wege suchen und vergleichen",
      "Ausgangsstoffe und Reaktionsschritte prüfen"
    ]
  },
  "x-patentsar": {
    "label": "Patentchemie und Aktivitätsextraktion",
    "headline": "Von Patentseiten\nzu strukturierten SAR-Daten.",
    "summary": "Extrahieren Sie Strukturen, Kennungen und Aktivitätswerte aus unterstützten WIPO-Patent-PDFs in prüfbare Struktur–Aktivitäts-Tabellen. Prüfen Sie Originalseiten, korrigieren Sie Einträge und exportieren Sie Material für weitere Forschung.",
    "audience": "Medizinische Chemiker, Patentanalysten und SAR-Forschende",
    "environment": "Linux / WSL2; DECIMER und RDKit",
    "boundary": "WIPO-Patent-PDFs werden unterstützt. Klären Sie vor der Nutzung exportierter Tabellen Qualitätshinweise, unsichere Strukturen, widersprüchliche Aktivitätswerte und unklare Quellseiten. Prüfen Sie vorhergesagte Eigenschaften separat als Forschungsschätzungen.",
    "features": [
      "Strukturen, Kennungen und originale Aktivitätswerte in einer Tabelle zusammenführen",
      "Struktur–Aktivitäts-Zuordnungen anhand der Quellenposition prüfen",
      "Strukturen und Einträge unter Erhalt von Belegen und Versionen korrigieren",
      "Excel, SDF, Strukturausschnitte und QA-Berichte exportieren"
    ],
    "steps": [
      "Unterstütztes Patent-PDF hochladen",
      "Extraktion mit der Quelle abgleichen",
      "Struktur–Aktivitäts-Ergebnisse exportieren"
    ]
  }
};
