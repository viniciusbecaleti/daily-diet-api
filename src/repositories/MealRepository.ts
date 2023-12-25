import { knex } from '../database'

interface Meal {
  name: string
  description: string
  diet: 'yes' | 'no'
  userId: string
}

class MealRepository {
  async create(newMeal: Meal) {
    await knex('meals').insert(newMeal)
  }

  async delete(mealId: string, sessionId: string) {
    await knex('meals').where({ id: mealId, userId: sessionId }).delete()
  }
}

export default new MealRepository()
