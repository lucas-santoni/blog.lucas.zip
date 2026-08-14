---
kind: film
title: "Grave"
slug: "grave"
date: 2026-08-13
creator: "Julia Ducournau"
year: 2016
rating: 5
status: finished
cover: "assets/journal/grave.jpg"
link: "https://fr.wikipedia.org/wiki/Grave_(film,_2016)"
# Photogrammes tirés du Blu-ray 1080p, extraits avec mpv puis convertis en
# JPEG à leur taille native (1920x804).
#
# L'ordre n'est PAS chronologique et ne doit pas le devenir : il alterne les
# températures de couleur et les échelles de plan, pour que la série se
# parcoure à l'œil sans raconter le film. Réordonner par timecode y remettrait
# du récit, ce que la sélection cherche précisément à éviter.
#
# `time` garde la milliseconde alors que le nom de fichier est arrondi à la
# seconde : c'est ce qui permet de re-extraire exactement la même image. Deux
# plans tombent dans la même seconde à 1:10:48, de part et d'autre d'un
# raccord — d'où les millisecondes dans leurs noms de fichier.
#
# `wide: true` donne toute la largeur au plan et coupe la série de paires.
# Six ici, espacées : la respiration ne se lit que contre des tuiles qui n'en
# sont pas, donc deux marquées côte à côte annuleraient l'effet.
#
# Deux contraintes d'arithmétique en découlent, invisibles à la lecture du
# fichier. Une pleine largeur force un saut de rangée, donc elle remet le
# compte des paires à zéro : il faut un nombre PAIR de plans normaux entre
# deux `wide` (et avant le premier), sinon le dernier de la série se retrouve
# seul sur sa rangée avec un vide à côté. Les séries font ici 2, 6, 4, 4, 4
# et 2. Et comme ces séries sont toutes paires, leur somme l'est aussi : le
# nombre de plans NON marqués doit donc être pair, ce qui impose un nombre de
# `wide` de même parité que le total. À 28 plans, il en faut un nombre pair —
# 5 seraient arithmétiquement impossibles à répartir sans orpheline.
stills:
  - src: "./grave/58-32.jpg"
    time: "00:58:32.342"
    alt: >-
      Salle de dissection déserte, un chien mort sur une table centrale entre
      deux tables vides, murs jaunes et fenêtres en pavés de verre bleus.
  - src: "./grave/47-38.jpg"
    time: "00:47:38.647"
    alt: >-
      Une jeune femme se retourne dans une chambre baignée de lumière ambrée,
      l'arrière-plan dissous en flou.
  - src: "./grave/02-56.jpg"
    time: "00:02:56.468"
    wide: true
    alt: >-
      Une route de campagne bordée de peupliers sous un ciel bleu-violet, une
      voiture arrêtée au loin sur le bas-côté.
  - src: "./grave/17-48.jpg"
    time: "00:17:48.651"
    alt: >-
      Visage d'une jeune femme entièrement recouvert de sang, le regard levé
      hors champ, d'autres étudiants derrière elle.
  - src: "./grave/1-06-14.jpg"
    time: "01:06:14.679"
    alt: >-
      Une personne sous la douche, le corps et les cheveux couverts de peinture
      verte et bleue, devant un carrelage bleu clair et un rideau à damier.
  - src: "./grave/1-15-28.jpg"
    time: "01:15:28.983"
    alt: >-
      Une jeune femme allongée sur le dos en travers d'un plan de travail, la
      tête renversée dans le vide, devant un mur de carrelage blanc.
  - src: "./grave/36-52.jpg"
    time: "00:36:52.836"
    alt: >-
      Une jeune femme de dos, penchée dans un réfrigérateur ouvert dont la
      lumière verte est la seule source de la pièce.
  - src: "./grave/03-04.jpg"
    time: "00:03:04.601"
    alt: >-
      Visage d'une jeune femme vu à travers la vitre d'une station-service,
      brouillé par les reflets orange des rayonnages.
  - src: "./grave/57-56.jpg"
    time: "00:57:56.139"
    alt: >-
      Portrait en extérieur d'une jeune femme en blouse blanche, du sang séché
      sous le nez, devant un bâtiment de béton sous un ciel bleu.
  - src: "./grave/09-20.jpg"
    time: "00:09:20.518"
    wide: true
    alt: >-
      Un sous-sol presque noir où des corps à quatre pattes avancent sous deux
      néons.
  - src: "./grave/1-27-19.jpg"
    time: "01:27:19.025"
    alt: >-
      Portrait d'une jeune femme, du sang de la bouche jusqu'au col de son haut
      clair ; une main floue barre le bord gauche du cadre.
  - src: "./grave/47-26.jpg"
    time: "00:47:26.761"
    alt: >-
      Une jeune femme assise à même le sol d'une cuisine, du sang autour de la
      bouche et sur les mains.
  - src: "./grave/53-31.jpg"
    time: "00:53:31.125"
    alt: >-
      Une femme ouvre la portière d'une voiture jaune éclaboussée de sang, au
      bord d'un pré vert sous un ciel gris.
  - src: "./grave/59-32.jpg"
    time: "00:59:32.652"
    alt: >-
      Une jeune femme face à un miroir, son profil et son reflet se répondant
      de part et d'autre du cadre couvert de photos.
  - src: "./grave/1-02-26.jpg"
    time: "01:02:26.326"
    wide: true
    alt: >-
      Gros plan en lumière bleue nocturne : un visage renversé contre un corps
      nu, les traits presque effacés par la pénombre.
  - src: "./grave/04-25.jpg"
    time: "00:04:25.390"
    alt: >-
      Vue depuis la banquette arrière d'une voiture : le rétroviseur découpe
      les yeux du conducteur, des pieds nus posés sur le tableau de bord.
  - src: "./grave/1-10-48-035.jpg"
    time: "01:10:48.035"
    alt: >-
      Gros plan sur un lit : une jeune femme mord l'épaule d'un homme endormi,
      du sang à la bouche, dans une lumière ambrée.
  - src: "./grave/1-08-57.jpg"
    time: "01:08:57.008"
    alt: >-
      Portrait à mi-corps d'une jeune femme aux épaules nues dans une pénombre
      verdâtre, une seule lumière rasante sur le visage.
  - src: "./grave/15-16.jpg"
    time: "00:15:16.124"
    alt: >-
      Une épaule et une nuque prises dans un rai de lumière chaude, le reste de
      la chambre dans l'ombre.
  - src: "./grave/1-04-14.jpg"
    time: "01:04:14.851"
    wide: true
    alt: >-
      Un couloir entièrement rouge, portes fermées de part et d'autre, une
      silhouette de dos avançant vers l'obscurité au centre exact du cadre.
  - src: "./grave/27-51.jpg"
    time: "00:27:51.420"
    alt: >-
      Une femme en blouse blanche, cigarette à la main, assise devant une
      fenêtre d'atelier surexposée.
  - src: "./grave/1-26-32.jpg"
    time: "01:26:32.896"
    alt: >-
      Au premier plan, des jambes nues éclaboussées de sang ; au fond, un jeune
      homme assis contre un réfrigérateur, une béquille jaune à la main.
  - src: "./grave/47-58.jpg"
    time: "00:47:58.918"
    alt: >-
      Portrait d'une jeune femme dans un amphithéâtre, la chevelure détourée
      par une lumière verte de néon.
  - src: "./grave/1-18-29.jpg"
    time: "01:18:29.580"
    alt: >-
      Une jeune femme aux cheveux mouillés, penchée sur un sol carrelé sombre,
      dans une lumière cyan désaturée ; le plan est cadré plus étroit que le
      reste du film, d'où les bandes sombres sur les côtés.
  - src: "./grave/1-10-48-369.jpg"
    time: "01:10:48.369"
    wide: true
    alt: >-
      Plan large d'une chambre d'internat de nuit : une silhouette fume à la
      fenêtre, une autre dort sur le lit, une affiche de boxe au mur.
  - src: "./grave/1-29-49.jpg"
    time: "01:29:49.801"
    alt: >-
      Une jeune femme sourit derrière une vitre en faisant un doigt d'honneur
      des deux mains ; au premier plan, de dos, une femme à l'écharpe rouge.
  - src: "./grave/58-34.jpg"
    time: "00:58:34.136"
    alt: >-
      Plan large d'une chambre d'internat : une jeune femme de dos en robe
      bleue devant une étagère, lit défait et lampe allumée.
  - src: "./grave/17-37.jpg"
    time: "00:17:37.348"
    wide: true
    alt: >-
      Photo de promotion d'une école vétérinaire : une cinquantaine
      d'étudiants en blouses maculées de rouge, sous une banderole.
---
