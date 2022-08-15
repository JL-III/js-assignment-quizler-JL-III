import fs from 'fs'
import ListPrompt from 'inquirer/lib/prompts/list'
import { min } from 'underscore'

// ([] , number) -> []
export const chooseRandom = (array, numItems) => {
  if (array.length === 0 || array.length === 1) {
    return array
  }
  let returnArray = [...array].sort(() => 0.5 - Math.random())
    return returnArray.slice(0, numItems)
}

//({numQuestions: number, numChoices: number}) -> [{}]
export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {})  => {
  let arrayOfPrompts = []
  for (let i = 1; i <= numQuestions; i++) {
    let promptQuestion = {
      type: 'input',
      name: `question-${(i)}`,
      message: `Enter question ${(i)}`
    }
    arrayOfPrompts.push(promptQuestion)
    for (let j = 1; j <= numChoices; j++) {
      let promptChoices = {
          type: 'input',
          name: `question-${(i)}-choice-${(j)}`,
          message: `Enter answer choice ${(j)} for question ${(i)}` 
      }
      arrayOfPrompts.push(promptChoices)
    }
  }
  return arrayOfPrompts
}

//{} -> [{}]
export const createQuestions = (objectThing = {}) => {

  let arrayOfQuestionObjects = []

  let listOfQuestions = Object.keys(objectThing).filter(property => property.match(new RegExp(/question-\d$/)))
  for (let question of listOfQuestions) {
    let questionObject = {
      type: 'list',
      name: question,
      message: objectThing[question],
      choices: []
    }
    let listOfChoices = Object.keys(objectThing).filter(property => property.match(new RegExp(`${question}-choice-\\d`)))
    for (let choice of listOfChoices) {
      questionObject.choices = [
        ...questionObject.choices,
        objectThing[choice]
      ]
    }
    arrayOfQuestionObjects.push(questionObject)
  }
  return arrayOfQuestionObjects
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
