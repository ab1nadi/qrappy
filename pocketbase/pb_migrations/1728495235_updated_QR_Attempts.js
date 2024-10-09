/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4os8dqmhjbvy48s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d8rxb88x",
    "name": "location",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4os8dqmhjbvy48s")

  // remove
  collection.schema.removeField("d8rxb88x")

  return dao.saveCollection(collection)
})
