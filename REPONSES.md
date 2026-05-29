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