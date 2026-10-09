export default {
  useCasesLabel: 'Forschung in der Praxis',
  useCasesTitle: 'Beginnen Sie mit Ihrer konkreten Aufgabe.',
  problemLabel: 'Ihr Ausgangspunkt',
  benefitLabel: 'Ihr Nutzen',
  nextStepLabel: 'Ein erster Schritt',
  viewGuide: 'Workflow-Leitfaden lesen',
  selectUseCase: 'Anwendungsfall wählen',
  imageLabel: 'KI-generierte biomedizinische Illustration',
  imageSourceLabel: 'Bildkontext',
  sourceLabel: 'Quelldokumentation lesen',
  motionPause: 'Bewegung pausieren',
  motionResume: 'Bewegung fortsetzen',
  products: {
    'x-science': [
      { problem: 'Die Materialien zu einer Forschungsfrage verteilen sich auf Publikationen, Notizen und Gespräche.', benefit: 'Halten Sie die Frage, Quellen und nächste Arbeiten in einem Projekt zusammen.', nextStep: 'Erstellen Sie ein Projekt zu einer Forschungsfrage oder Publikation und ergänzen Sie relevante Materialien.' },
      { problem: 'Eine wissenschaftliche Datei muss vor der Methodenwahl verstanden werden.', benefit: 'Prüfen Sie unterstützte Strukturen, Sequenzen und Tabellen im Kontext der Forschungsdiskussion.', nextStep: 'Öffnen Sie eine unterstützte Eingabedatei und wählen Sie passende Werkzeuge.' },
      { problem: 'Eine Antwort braucht überprüfbare Dateien und Ausführungsnachweise.', benefit: 'Verfolgen Sie Werkzeugmeldungen und prüfen Sie die entstandenen Dateien vor der nächsten Untersuchung.', nextStep: 'Konfigurieren Sie die erforderliche Umgebung und beginnen Sie mit einer kleinen, klaren Aufgabe.' }
    ],
    'x-pharma': [
      { problem: 'Wirkstoff-, Forschungs- und Patentinformationen sind auf mehrere Quellen verteilt.', benefit: 'Untersuchen Sie zusammengehörige Einträge und vergleichen Sie Pharma-Informationen in der Workbench.', nextStep: 'Wählen Sie einen Wirkstoff oder eine Patentserie und verbinden Sie zugelassene Quellen.' },
      { problem: 'Eine relevante Aussage lässt sich schwer zum Originaleintrag zurückverfolgen.', benefit: 'Quellenpositionen und Datenversionen bleiben mit den verwalteten Datensätzen verbunden.', nextStep: 'Öffnen Sie ein Profil und prüfen Sie die Belege hinter den Einträgen.' },
      { problem: 'Menschen und Agenten benötigen einen einheitlichen Zugang zu Pharma-Daten.', benefit: 'Workbench und MCP nutzen dieselben Fachdienste und Berechtigungsregeln.', nextStep: 'Konfigurieren Sie autorisierte Daten und verbinden Sie einen MCP-Client mit diesen Diensten.' }
    ],
    'x-dde': [
      { problem: 'Eine Kandidatentabelle zeigt den molekularen Kontext eines Scores nicht.', benefit: 'Verknüpfen Sie Kandidaten mit ihren 2D-Strukturen und 3D-Ergebnissen zur direkten Prüfung.', nextStep: 'Beginnen Sie mit einer Molekülstrukturdatei und untersuchen Sie einen Kandidaten im Arbeitsbereich.' },
      { problem: 'Eine Forschungsaufgabe beginnt mit zu vielen unbekannten Einstellungen.', benefit: 'Bereiten Sie Eingaben schrittweise vor, wählen Sie eine Methode und prüfen Sie deren tatsächliche Ausgaben.', nextStep: 'Wählen Sie eine Aufgabe und bestätigen Sie die nötige wissenschaftliche Engine und Eingaben.' },
      { problem: 'Beim Übergang zwischen Aufgaben geht der Bezug zu Originalmaterialien verloren.', benefit: 'Originaldateien, abgeleitete Versionen und Aufgabenherkunft bleiben verbunden.', nextStep: 'Wählen Sie die passende Ergebnisversion als Material für die nächste Forschungsaufgabe.' }
    ],
    'x-synth': [
      { problem: 'Für ein Molekül werden prüfbare Synthesewege gesucht.', benefit: 'Erkunden Sie ASKCOS-Retrosynthesevorschläge ausgehend von der Molekülstruktur.', nextStep: 'Zeichnen oder importieren Sie eine Molekülstruktur und wählen Sie eine Suchstrategie.' },
      { problem: 'Ein Synthesevorschlag hängt von Ausgangsstoffen mit unklarer Beschaffung ab.', benefit: 'Vergleichen Sie Strukturen mit Bestandsaufnahmen und prüfen Sie Beschaffungsbelege.', nextStep: 'Prüfen Sie die Ausgangsstoffe eines Weges anhand des konfigurierten Katalogs.' },
      { problem: 'Alternative Wege sollen gemeinsam diskutiert und dokumentiert werden.', benefit: 'Bearbeiten Sie Wegkopien und exportieren Sie Wegdiagramme, Materialien und Forschungsaufzeichnungen.', nextStep: 'Prüfen Sie die Schritte einer Wegkopie und exportieren Sie diese zur chemischen Bewertung.' }
    ],
    'x-patentsar': [
      { problem: 'Strukturen und Aktivitätstabellen stehen an unterschiedlichen Stellen im Patent-PDF.', benefit: 'Führen Sie extrahierte Strukturen, Kennungen und Messwerte in einer Struktur–Aktivitäts-Tabelle zusammen.', nextStep: 'Laden Sie ein unterstütztes WIPO-Patent-PDF hoch und prüfen Sie die Extraktion.' },
      { problem: 'Eine Zuordnung oder ein Wert muss mit der Originalseite abgeglichen werden.', benefit: 'Verfolgen Sie Quellenpositionen und korrigieren Sie Einträge unter Erhalt von Belegen und Versionen.', nextStep: 'Vergleichen Sie einen unsicheren Eintrag mit der Quelle und speichern Sie eine ausdrückliche Korrektur.' },
      { problem: 'Patentchemie soll als Material für weitere SAR-Forschung nutzbar werden.', benefit: 'Nutzen Sie Excel- und SDF-Extraktionsdateien mit Strukturausschnitten und QA-Bericht als Forschungsmaterial.', nextStep: 'Prüfen Sie QA-Hinweise und Quellenbelege, bevor Sie die exportierten Einträge nutzen.' }
    ]
  }
};
