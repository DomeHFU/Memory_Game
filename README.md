# Memory Spiel – Interaktive Webanwendung

## Projektbeschreibung

Dieses Projekt ist eine interaktive Webanwendung eines klassischen Memory-Spiels. Ziel ist es, zwei gleiche Kartenpaare aufzudecken, bis alle Kartenpaare gefunden wurden. Das Spiel richtet sich an Einzelspieler:innen und beinhaltet eine Reihe zusätzlicher Features, die den Spielspaß erhöhen und zur Motivation beitragen.

## Features

 **Timer** 
  Zeigt die abgelaufene Spielzeit an (oben rechts oder links). Optional kann ein Zeitlimit festgelegt werden.

- **Highscore-Liste** 
  Nach Spielende kann man sich mit seinem Namen in eine Bestenliste eintragen. Dabei werden zwei Statistiken geführt:
  - Anzahl der Siege (priorisiert)
  - Höchste erreichte Punktzahl

- **Datenbankanbindung**  
  Speicherung von:
  - Spielernamen
  - Punktzahl
  - Anzahl der Siege

- **Kartendesign**  
  Rückseiten der Karten erhalten ein einheitliches, ansprechendes Design.

- **Misch-Algorithmus**  
  Zu Spielbeginn werden die Karten zufällig durch einen einfachen Algorithmus gemischt.

- **Visuelles Spielbrett**  
  Ein klar strukturiertes Spielfeld mit angenehmem Hintergrunddesign sorgt für eine benutzerfreundliche Darstellung.

## Spielende

Am Ende des Spiels – entweder durch das Finden aller Kartenpaare oder durch Ablaufen des Zeitlimits – werden dem Spieler folgende Informationen angezeigt:
- Erreichte Punktzahl
- Dauer des Spiels

## Umsetzung

Das Projekt wird mit aktuellen Webtechnologien umgesetzt (z. B. HTML, CSS, JavaScript). Datenbankfunktionen werden über ein serverseitiges Backend (z. B. Node.js + Express oder PHP) realisiert, eventuell mit einer MySQL- oder MongoDB-Datenbank im Hintergrund.

## Ziel

Ziel ist es, ein funktionales, visuell ansprechendes und speicherfähiges Memory-Spiel zu entwickeln, das vollständig im Browser spielbar ist.

## Autor

Dominik Markovic
