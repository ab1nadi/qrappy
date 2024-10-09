/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4os8dqmhjbvy48s",
    "created": "2024-10-07 03:52:22.704Z",
    "updated": "2024-10-07 03:52:22.704Z",
    "name": "QR_Attempts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ovywbnfn",
        "name": "UUID",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qs8j4xha",
        "name": "count",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4os8dqmhjbvy48s");

  return dao.deleteCollection(collection);
})
