# REPONSES.md

## Question 1.1 — Que représente le `dataProvider` dans React-Admin ? Quel est son rôle ?

Le `dataProvider` est l'objet qui fait la liaison entre React-Admin et l'API. Il traduit les actions de l'interface (afficher la liste, créer un employé, le modifier, le supprimer) en requêtes HTTP vers le serveur.

Concrètement, quand on utilise `jsonServerProvider("http://localhost:3002")`, on lui dit comment parler à une API JSON Server. Sans lui, React-Admin ne sait pas où ni comment récupérer les données.


## Question 1.2 — Quelle requête HTTP est envoyée au chargement de la liste ?

Dans l'onglet Network du navigateur, on voit :

```
GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=5
```

C'est une requête GET avec les paramètres de tri et de pagination propres à JSON Server.


## Question 2.1 — Que fait la prop `rowClick="edit"` sur le Datagrid ?

Quand on clique sur une ligne du tableau, on est redirigé vers la page de modification de cet employé. Sans cette prop, les lignes ne sont pas cliquables.

## Question 2.2 — Passez `perPage` à 2. Que se passe-t-il dans l'interface ?

Seulement 2 employés s'affichent par page. La pagination s'active en bas du tableau et React-Admin envoie une nouvelle requête avec `_start=0&_end=2` pour la première page, `_start=2&_end=4` pour la deuxième, etc.


## Question 3.1 — Que se passe-t-il si vous soumettez le formulaire sans remplir le prénom ?

Un message d'erreur apparaît sous le champ : *"Required"*. Le formulaire ne s'envoie pas tant que le champ n'est pas rempli. La validation se fait côté client grâce au validateur `required()`.


## Question 3.2 — Essayez de saisir un salaire de 500 euros. Que se passe-t-il ?

Un message d'erreur s'affiche sous le champ salaire : *"Le salaire minimum est 1 500 €"*. La soumission est bloquée par le validateur `minValue(1500)`.


## Question 4.1 — Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ?

Dans l'onglet Network, on voit une requête :

```
PUT http://localhost:3002/employees/1
```

React-Admin utilise `PUT` pour remplacer l'enregistrement entier.


## Question 4.2 — À quel moment `useRecordContext()` est-il disponible ? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?

`useRecordContext()` est disponible uniquement à l'intérieur d'un composant enfant d'un contexte React-Admin qui fournit un enregistrement, comme `<Edit>` ou `<Show>`.

Si les données ne sont pas encore chargées, il retourne `undefined`. Il faut donc toujours vérifier avant d'utiliser le résultat :

```tsx
const record = useRecordContext();
if (!record) return <span>Chargement...</span>;
```


## Question 5.1 — Quelle différence y a-t-il entre `SimpleShowLayout` et `TabbedShowLayout` ?

`SimpleShowLayout` affiche tous les champs les uns en dessous des autres sur une seule page. C'est adapté quand il n'y a pas beaucoup de champs.

`TabbedShowLayout` organise les champs en onglets. C'est utile quand il y a beaucoup d'informations à afficher et qu'on veut les regrouper par thème pour que ce soit plus lisible.


---

## Question 6.1 — ReferenceField génère quel appel HTTP pour résoudre le manager ?

`ReferenceField` effectue un appel `GET` vers la ressource référencée pour chaque enregistrement affiché. Avec `ra-data-json-server`, React-Admin optimise cela en regroupant les identifiants uniques en une seule requête :

```
GET http://localhost:3002/employees?id=1&id=2&id=3&...
```

React-Admin utilise le mécanisme de **batching** interne : plutôt que N requêtes individuelles, il accumule tous les `supervisorId` visibles sur la page et envoie une seule requête avec tous les ids concernés.

## Question 6.2 — Que se passe-t-il visuellement si managerId ne correspond à aucun employé ?

`ReferenceField` affiche une cellule vide à la place du nom du manager. Il n'y a pas de message d'erreur visible pour l'utilisateur. Dans la console du navigateur, React-Admin peut afficher un avertissement indiquant que la référence n'a pas été trouvée. C'est pourquoi il est important de maintenir la cohérence des données (ne pas supprimer un employé qui est encore manager d'un stagiaire).


---

## Question 7.1 — Quelle méthode HTTP est émise lors de la soumission de InternCreate ? Vers quel endpoint ?

```
POST http://localhost:3002/interns
```

React-Admin utilise `POST` pour la création d'un nouvel enregistrement. Le corps de la requête contient l'objet JSON avec tous les champs du formulaire.

## Question 7.2 — Quel hook utilisez-vous pour la validation conditionnelle de remuneration, et pourquoi ?

On utilise `useWatch` de **react-hook-form** (intégré à React-Admin) :

```tsx
const isRemunerate = useWatch({ name: "isRemunerate" });
```

Ce hook s'abonne à la valeur courante d'un champ du formulaire et re-rend le composant à chaque changement de cette valeur. C'est la solution recommandée par la documentation React-Admin pour lire la valeur d'un autre champ dans un composant de formulaire.

`useFormContext` aurait aussi fonctionné, mais `useWatch` est plus précis car il ne déclenche un re-rendu que lorsque le champ spécifié change, et non à chaque modification du formulaire.

## Question 8.1 — Quelle est la différence entre `useGetOne` et `ReferenceField` ? Quand préférer l'un ou l'autre ?

`ReferenceField` est un **composant déclaratif** conçu pour être utilisé directement dans un contexte de liste ou de Show. Il gère automatiquement le batching des requêtes (regroupement des ids), l'affichage du champ lié, et s'intègre naturellement dans le système de layout de React-Admin. C'est le choix par défaut quand on veut simplement afficher un champ d'un enregistrement lié.

`useGetOne` est un **hook impératif** qui donne un contrôle total : on peut récupérer les données n'importe où dans un composant, accéder aux trois états (`isPending`, `error`, `data`), conditionner l'appel avec `enabled`, et afficher ce qu'on veut avec la donnée chargée. C'est indispensable quand on construit un composant custom autonome (comme `ManagerCard`) qui doit afficher plusieurs champs du manager, gérer explicitement les états d'erreur et de chargement, ou lancer la requête conditionnellement.

**Règle** : `ReferenceField` pour afficher 1-2 champs d'une relation dans une liste ou un Show standard ; `useGetOne` pour tout composant custom nécessitant un contrôle fin.


## Question 8.2 — Que se passe-t-il si `useGetOne` reçoit `id: undefined` sans l'option `enabled` ? Comment ce paramètre résout-il le problème ?

Sans `enabled`, React-Admin envoie immédiatement une requête `GET /employees/undefined` dès que le composant est monté, avant même que `useRecordContext()` ait retourné les données du stagiaire. Cela génère une requête invalide, une erreur 404 ou une entrée incohérente dans le cache.

L'option `{ enabled: !!intern?.supervisorId }` suspend l'exécution du hook tant que l'identifiant n'est pas disponible. La requête n'est déclenchée que lorsque `supervisorId` est une valeur truthy, ce qui garantit un appel HTTP valide et évite les erreurs inutiles.


## Question 9.1 — Différence entre `useGetList` et `ReferenceManyField` ? Dans quel cas `useGetList` est-il indispensable ?

`ReferenceManyField` est un composant déclaratif qui fournit un contexte de liste pour afficher des enregistrements liés directement dans le JSX (avec `<Datagrid>`, `<SimpleList>`, etc.). Il est pratique mais contraint : il impose sa structure d'affichage et fonctionne uniquement dans des contextes React-Admin standards.

`useGetList` est un hook qui retourne directement `data`, `total`, `isPending` et `error`, permettant de construire n'importe quelle UI custom autour des données. Il est **indispensable** quand :
- On veut afficher les données dans un composant MUI custom (List, Card…) sans passer par un Datagrid React-Admin ;
- On a besoin du `total` seul sans afficher les enregistrements (comme dans `DepartmentStats`) ;
- On conditionne la requête avec `enabled` ;
- On intègre les données dans une logique applicative (calculs, transformations) avant l'affichage.


## Question 9.2 — Comment optimiser la requête de `DepartmentStats` pour ne récupérer que le total sans charger tous les employés ?

On utilise `pagination: { page: 1, perPage: 1 }`. JSON Server (et la plupart des APIs REST) renvoient dans les headers (ou dans la réponse) le nombre total d'enregistrements correspondant au filtre, indépendamment du nombre de résultats retournés. React-Admin expose ce total via `useGetList` dans le champ `total`.

Ainsi, même si l'API ne renvoie qu'un seul enregistrement dans le corps de la réponse, `total` reflète le compte complet des employés actifs du département. On économise la bande passante et la mémoire : au lieu de charger 50 objets employé pour juste compter, on charge 1 objet et on lit le compteur.

## Question 10.1 — Quelle méthode HTTP useUpdate utilise-t-il par défaut ? Comment forcer PATCH au lieu de PUT ?

Par défaut, `useUpdate` émet une requête **PUT** (remplacement complet de l'enregistrement).

Pour forcer **PATCH** (mise à jour partielle), il faut passer le paramètre `meta: { method: 'PATCH' }` dans les options, ou configurer le dataProvider pour utiliser PATCH sur certaines ressources. Avec `ra-data-json-server`, on peut aussi utiliser `mutationMode: 'optimistic'` combiné à une surcharge du dataProvider.

```tsx
const [update] = useUpdate(
    "employees",
    { id, data: { active: false }, previousData: record },
    { meta: { method: "PATCH" } }
);
```

## Question 10.2 — Pourquoi previousData est-il nécessaire ? Que se passe-t-il si on l'omet ?

`previousData` est nécessaire pour permettre à React-Admin de calculer le **diff** entre l'ancien et le nouvel état de l'enregistrement (utile notamment en mode optimiste pour pouvoir annuler la mutation en cas d'erreur).

Sans `previousData`, React-Admin ne peut pas effectuer de rollback propre si la requête échoue. De plus, certains dataProviders (dont `ra-data-json-server`) lèvent une erreur ou produisent un comportement inattendu si `previousData` est absent, car ils en ont besoin pour construire le corps de la requête PUT.


## Question 11.1 — Quelle différence entre utiliser useCreate dans un composant custom et utiliser le composant <Create> de React-Admin ?

`<Create>` est un composant de haut niveau qui gère une page entière avec routing, redirection après soumission, formulaire React-Admin, notification de succès/erreur, et gestion du contexte d'enregistrement.

`useCreate` est un hook bas niveau qui expose simplement la fonction `create(resource, { data })` et un état `{ isPending, error }`. Il s'utilise dans n'importe quel composant custom (une modale, un bouton inline, un formulaire MUI) sans changer de page ni nécessiter le contexte React-Admin.

En résumé : `<Create>` = page dédiée + UX complète ; `useCreate` = brique primitive réutilisable partout.

## Question 11.2 — Comment gérez-vous le rechargement de la liste après une création réussie via useCreate ?

On utilise le hook `useRefresh()` fourni par React-Admin. Il retourne une fonction `refresh()` qui invalide le cache de la liste courante et force React-Admin à refaire la requête `getList`.

```tsx
const refresh = useRefresh();

create("interns", { data }, {
    onSuccess: () => {
        refresh();      // recharge la liste
        setOpen(false); // ferme la modale
    },
});
```

## Question 12.1 — Les 4 appels useGetList se font-ils en parallèle ou en séquence ? Justifiez.

Ils se font en **parallèle**. Chaque `useGetList` est un hook React indépendant qui déclenche sa propre requête HTTP dès le montage du composant. React rend le composant une seule fois, tous les hooks s'exécutent dans le même cycle de rendu, et les 4 requêtes `fetch` sont émises simultanément sans attendre les unes les autres.

C'est un avantage important du système de hooks : contrairement à une chaîne de `await`, les 4 appels s'effectuent en parallèle, ce qui minimise le temps de chargement total du dashboard.

## Question 12.2 — Pourquoi perPage: 1 est-il préférable à perPage: 100 ici ?

On n'a besoin que du **total** (`total`), pas des données elles-mêmes. Avec `perPage: 1`, le serveur ne renvoie qu'un seul enregistrement dans le corps de la réponse, mais inclut quand même le header `X-Total-Count` (ou équivalent) dont React-Admin extrait le total.

Utiliser `perPage: 100` chargerait inutilement jusqu'à 100 objets complets en mémoire, consommant de la bande passante et de la RAM pour des données immédiatement jetées. `perPage: 1` est donc l'optimisation minimale recommandée pour ne récupérer qu'un compteur.