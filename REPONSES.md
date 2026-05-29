# REPONSES.md — Exercice React-Admin CRUD

---

## Question 1.1 — Que représente le `dataProvider` dans React-Admin ? Quel est son rôle ?

Le `dataProvider` est la couche d'abstraction qui fait le lien entre React-Admin et l'API REST backend. Il traduit les actions de l'interface (afficher une liste, créer, modifier, supprimer un enregistrement) en requêtes HTTP concrètes vers le serveur.

React-Admin ne connaît pas la structure de l'API : c'est le `dataProvider` qui normalise les échanges. Par exemple, `jsonServerProvider` sait comment formuler les requêtes pour une API JSON Server (paramètres de pagination, de tri, de filtrage, etc.).

Sans `dataProvider`, React-Admin ne peut pas communiquer avec le backend.

---

## Question 1.2 — Quelle requête HTTP est envoyée au chargement de la liste ?

En ouvrant l'onglet **Network** du navigateur, on observe une requête `GET` vers :

```
GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=5
```

React-Admin demande la première page d'employés, triée par `id` de façon croissante, avec les paramètres de pagination `_start` et `_end` propres à JSON Server.

---

## Question 2.1 — Que fait la prop `rowClick="edit"` sur le `Datagrid` ?

La prop `rowClick="edit"` rend chaque ligne du tableau cliquable. Quand l'utilisateur clique sur une ligne, il est automatiquement redirigé vers la page de **modification** de cet enregistrement (route `/:id/edit`).

D'autres valeurs possibles : `"show"` (redirection vers la fiche détail), `"expand"`, ou une fonction personnalisée.

---

## Question 2.2 — Passez `perPage` à 2. Que se passe-t-il dans l'interface ?

Seuls **2 employés** sont affichés par page. La pagination en bas de la liste s'active automatiquement et permet de naviguer entre les pages. React-Admin envoie une nouvelle requête avec `_start=0&_end=2` pour la première page, puis `_start=2&_end=4` pour la deuxième, etc.

---

## Question 3.1 — Que se passe-t-il si vous soumettez le formulaire sans remplir le prénom ?

La soumission est **bloquée** et un message d'erreur s'affiche sous le champ vide : *« Required »* (ou *« Obligatoire »* selon la locale). Le formulaire ne fait aucune requête HTTP tant que tous les champs obligatoires ne sont pas remplis. La validation est gérée côté client par React-Admin via le validateur `required()`.

---

## Question 3.2 — Essayez de saisir un salaire de 500 euros. Que se passe-t-il ?

Un message d'erreur s'affiche sous le champ salaire : *« Le salaire minimum est 1 500 € »*. La soumission est bloquée. C'est la validation `minValue(1500)` qui intercepte la valeur et empêche l'envoi du formulaire au serveur.

---

## Question 4.1 — Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ?

En observant l'onglet **Network**, on voit une requête :

```
PUT http://localhost:3002/employees/:id
```

React-Admin utilise la méthode **`PUT`** pour remplacer intégralement l'enregistrement. Certains dataProviders peuvent utiliser `PATCH` pour une mise à jour partielle, mais `ra-data-json-server` utilise `PUT` par défaut.

---

## Question 4.2 — À quel moment `useRecordContext()` est-il disponible ? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?

`useRecordContext()` est disponible uniquement à l'intérieur d'un composant enfant d'un contexte React-Admin fournissant un enregistrement (comme `<Edit>`, `<Show>`, `<Datagrid>`, etc.).

Si l'enregistrement n'est **pas encore chargé** (chargement en cours), `useRecordContext()` retourne `undefined`. C'est pourquoi il faut toujours tester la valeur retournée avant de l'utiliser, comme dans le composant `EmployeeTitle` :

```tsx
const record = useRecordContext();
if (!record) return <span>Modifier un employé</span>;
```

---

## Question 5.1 — Quelle différence y a-t-il entre `SimpleShowLayout` et `TabbedShowLayout` ?

| | `SimpleShowLayout` | `TabbedShowLayout` |
|---|---|---|
| **Présentation** | Affiche tous les champs les uns en dessous des autres dans une seule vue linéaire | Organise les champs en **onglets** (`<Tab>`) |
| **Usage** | Adapté pour des enregistrements avec peu de champs | Adapté pour des enregistrements complexes avec beaucoup de champs à regrouper thématiquement |
| **Navigation** | Aucune — tout est visible d'un coup | L'utilisateur clique sur les onglets pour voir les différentes sections |

Exemple d'utilisation de `TabbedShowLayout` :

```tsx
<TabbedShowLayout>
  <Tab label="Informations générales">
    <TextField source="firstname" />
    <TextField source="email" />
  </Tab>
  <Tab label="RH">
    <TextField source="department" />
    <NumberField source="salary" />
  </Tab>
</TabbedShowLayout>
```