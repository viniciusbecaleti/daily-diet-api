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
}

export default new MealRepository()
