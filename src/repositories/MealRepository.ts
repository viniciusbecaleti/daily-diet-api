import { knex } from '../database'

interface Meal {
  name: string
  description: string
  diet: 'yes' | 'no'
  userId: string
}

class MealRepository {
  async findAll(sessionId: string) {
    const meals = await knex('meals')
      .select('id', 'name', 'description', 'diet')
      .where({
        userId: sessionId,
      })

    return meals
  }

  async findById(mealId: string, sessionId: string) {
    const meal = await knex('meals')
      .select('id', 'name', 'description', 'diet')
      .where({
        id: mealId,
        userId: sessionId,
      })
      .first()

    return meal
  }

  async create(newMeal: Meal) {
    await knex('meals').insert(newMeal)
  }

  async delete(mealId: string, sessionId: string) {
    await knex('meals').where({ id: mealId, userId: sessionId }).delete()
  }
}

export default new MealRepository()
