const {v4: uuid} = require("uuid");
const {pool} = require("../utils/db");


class TodoRepository {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.createdAt = obj.createdAt;

    this._validate();
  }

  _validate() {
    if (this.title.trim().length < 5) {
      throw new Error('Todo title should be at least 5 characters.');
    }

    if (this.title.length > 150) {
      throw new Error('Todo title should has less than 150 characters.');
    }
  }


  static async insert(record) {
    record._validate()

    record.id = record.id ?? uuid();


    await pool.execute('INSERT INTO `todos`(`id`, `title`) VALUES (:id, :title)', {
      id: uuid(),
      title: record.title,
    })

    return record.id;
  }

  static async delete(record) {

    if (!record.id) {
      throw new Error('Todo has no ID.');
    }

    await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
      id: record.id,
    })
  }

  static async find(id) {
    const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {
      id: id,
    });
    return  results.length === 1 ? new TodoRecord(results[0]) : null;
  }

  static async findAll() {
    const [allResults] = await pool.execute('SELECT * FROM `todos` ORDER BY `createdAt` DESC');
    return allResults.map(result => new TodoRepository(result));
  }

  static async update(record) {

    if (!record.id) {
      throw new Error('Todo has no ID.');
    }

    record._validate();

    await pool.execute('UPDATE `todos` SET `title` = :title WHERE `id` = :id', {
      title: record.title,
      id: record.id,
    });
  }

}

module.exports = {
  TodoRepository,
}