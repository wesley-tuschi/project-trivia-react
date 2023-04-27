import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import { act, screen, waitFor, within } from "@testing-library/react"

import Game from "../pages/Game"
import userEvent from "@testing-library/user-event"
import App from "../App"

const questions = [
  {
    category: "Entertainment: Video Games",
    type: "boolean",
    difficulty: "easy",
    question: "The main playable character of the 2015 RPG &quot;Undertale&quot; is a monster.",
    correct_answer: "False",
    incorrect_answers: [
      "True"
    ]
  },
  {
    category: "Entertainment: Japanese Anime & Manga",
    type: "boolean",
    difficulty: "easy",
    question: "In Chobits, Hideki found Chii in his apartment.",
    correct_answer: "False",
    incorrect_answers: [
      "True"
    ]
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "hard",
    question: "How many notes are there on a standard grand piano?",
    correct_answer: "88",
    incorrect_answers: [
      "98",
      "108",
      "78"
    ]
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "The Canadian $1 coin is colloquially known as a what?",
    correct_answer: "Loonie",
    incorrect_answers: [
      "Boolie",
      "Foolie",
      "Moodie"
    ]
  },
  {
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "medium",
    question: "On the cover of &#039;Abbey Road,&#039; which of the Beatles is not wearing shoes?",
    correct_answer: "Paul McCartney",
    incorrect_answers: [
      "Ringo Starr",
      "John Lennon",
      "George Harrison"
    ]
  }
]



describe('Testa página "Game.js"',  () => {
  it("deve ser possível clicar na resposta certa",  async () => {
    global.fetch = jest.fn()

    global.fetch.mockImplementationOnce(async () => ({
      json: async () => ({
        results: questions
      })
    }))
    

    renderWithRouterAndRedux(<Game />)

    const correctAnswerButtonElement = await waitFor(() => screen.getByTestId("correct-answer"))

    act(() => userEvent.click(correctAnswerButtonElement))

    const nextButtonElement = await waitFor(() => screen.getByTestId("btn-next"))

    expect(nextButtonElement).toBeInTheDocument()
  })

  it("deve ser possível clicar na resposta certa e clicar no botão de próxima pergunta e a próxima pergunta é renderizada",  async () => {

    
    global.fetch = jest.fn()

    global.fetch.mockImplementationOnce(async () => ({
      json: async () => ({
        results: questions
      })
    }))
    

    renderWithRouterAndRedux(<Game />)

    const correctAnswerButtonElement = await waitFor(() => screen.getByTestId("correct-answer"))

    act(() => userEvent.click(correctAnswerButtonElement))

    const nextButtonElement = await waitFor(() => screen.getByTestId("btn-next"))

    act(() => userEvent.click(nextButtonElement))

    const answerTextElement = screen.getByTestId("question-text")

    expect(answerTextElement).toBeInTheDocument(questions[1].question)
  })

  it("deve ser aparecer o botão de próxima pergunta depois de 30 segundos",  async () => {
    
    global.fetch = jest.fn()

    global.fetch.mockImplementationOnce( () => ({
      json: async () => ({
        results: questions
      })
    }))
    

    renderWithRouterAndRedux(<Game />)
    

    await new Promise(r => setTimeout(r, 32000))
    const nextButtonElement = screen.getByTestId("btn-next")

    act(() => userEvent.click(nextButtonElement))
    
    const answerTextElement = screen.getByTestId("question-text")

    expect(answerTextElement).toBeInTheDocument(questions[1].question)
  
  }, 35000)

  it("deve redirecionar para feedback depois de todas as perguntas",  async () => {
    
    global.fetch = jest.fn()

    global.fetch.mockImplementationOnce(async () => ({
      json: async () => ({
        results: questions
      })
    }))
    

    const { history } = renderWithRouterAndRedux(<App />, {
      player: {
        name: 'Nome de teste',
        assertions: 0,
        score: 0,
        gravatarEmail: ''
    }
  }, "/game")

    await Promise.all(questions.map(async (question) => {
      await waitFor(() => screen.getByText(question.question))

      const correctAnswerButtonElement = await waitFor(() => screen.getByTestId("correct-answer"))
      console.log(correctAnswerButtonElement.disabled)
      act(() => userEvent.click(correctAnswerButtonElement))

      const nextButtonElement = await waitFor(() => screen.getByTestId("btn-next"))


      act(() => userEvent.click(nextButtonElement))
    }))
    
    console.log("v")
    

    await waitFor(() => expect(history.location.pathname).toBe("/feedback"))
  
  })

  it("deve redirecionar para login se requisção retornar erro",  async () => {
    
    global.fetch = jest.fn()

    global.fetch.mockImplementationOnce(async () => ({
      json: async () => ({
        response_code: 3
      })
    }))
    

    const { history } = renderWithRouterAndRedux(<App />, {
          player: {
            name: 'Nome de teste',
            assertions: 0,
            score: 0,
            gravatarEmail: ''
        }
      }, "/game")

    

    await waitFor(() => expect(history.location.pathname).toBe("/"))
  
  })

  it("deve ter a pontuação de acordo com o nível de dificuldade",  async () => {
    global.fetch = jest.fn()

    global.fetch.mockImplementationOnce(async () => ({
      json: async () => ({
        results: questions
      })
    }))
    

    renderWithRouterAndRedux(<App />, {
      player: {
        name: 'Nome de teste',
        assertions: 0,
        score: 0,
        gravatarEmail: ''
    },
    config: {
      categoryIdSelected: 0,
      dificultySelected: 'hard',
    }
  }, "/game")

    const correctAnswerButtonElement = await waitFor(() => screen.getByTestId("correct-answer"))

    act(() => userEvent.click(correctAnswerButtonElement))

    const view = screen.getByText(/score:/i);within(view).getByText(/100/i);
  })

  it("deve ter a pontuação de acordo com o nível de dificuldade",  async () => {
    global.fetch = jest.fn()

    global.fetch.mockImplementationOnce(async () => ({
      json: async () => ({
        results: questions
      })
    }))
    

    renderWithRouterAndRedux(<App />, {
      player: {
        name: 'Nome de teste',
        assertions: 0,
        score: 0,
        gravatarEmail: ''
    },
    config: {
      categoryIdSelected: 0,
      dificultySelected: 'easy',
    }
  }, "/game")

    const correctAnswerButtonElement = await waitFor(() => screen.getByTestId("correct-answer"))

    act(() => userEvent.click(correctAnswerButtonElement))

    const view = screen.getByText(/score:/i);within(view).getByText(/40/i);
  })

  it("deve ter a pontuação de acordo com o nível de dificuldade",  async () => {
    global.fetch = jest.fn()

    global.fetch.mockImplementationOnce(async () => ({
      json: async () => ({
        results: questions
      })
    }))
    

    renderWithRouterAndRedux(<App />, {
      player: {
        name: 'Nome de teste',
        assertions: 0,
        score: 0,
        gravatarEmail: ''
    },
    config: {
      categoryIdSelected: 0,
      dificultySelected: 'medium',
    }
  }, "/game")

    const correctAnswerButtonElement = await waitFor(() => screen.getByTestId("correct-answer"))

    act(() => userEvent.click(correctAnswerButtonElement))

    const view = screen.getByText(/score:/i);within(view).getByText(/70/i);
  })

})
